'use client';

import { useState, useRef, useCallback, useEffect, useId } from 'react';
import Image from 'next/image';
import { Maximize2, AlignCenter } from 'lucide-react';
import { MOCKUP_PRINT_ZONES } from '@/lib/mockup-zones';

export interface DesignTransform {
  cx: number; // center-x %
  cy: number; // center-y %
  w: number;  // width %
  h: number;  // height %
}

type ResizeCorner = 'nw' | 'ne' | 'sw' | 'se';
type DragMode = 'move' | ResizeCorner;

interface DragState {
  mode: DragMode;
  startMousePct: { x: number; y: number };
  startTx: DesignTransform;
}

export function defaultDesignTransform(slug: string): DesignTransform {
  const z = MOCKUP_PRINT_ZONES[slug] ?? MOCKUP_PRINT_ZONES['t-shirt'];
  const left = parseFloat(z.left);
  const top  = parseFloat(z.top);
  const w    = parseFloat(z.width);
  const h    = parseFloat(z.height);
  return { cx: left + w / 2, cy: top + h / 2, w, h };
}

interface DesignCanvasProps {
  mockupSrc: string;
  designSrc: string;
  productSlug: string;
  /** True for dark (black) mockups → screen blend; false for light mockups → patch look with shadow */
  isDarkMockup?: boolean;
  /** 'light' removes white/grey bg (default); 'dark' removes black bg; controlled externally for generator toggle */
  designBg?: 'light' | 'dark';
  showControls?: boolean;
  className?: string;
}

export function DesignCanvas({
  mockupSrc,
  designSrc,
  productSlug,
  isDarkMockup = false,
  designBg = 'light',
  showControls = true,
  className = '',
}: DesignCanvasProps) {
  const [designTx, setDesignTx] = useState<DesignTransform>(() => defaultDesignTransform(productSlug));
  const [sizeScale, setSizeScale] = useState(1.0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef   = useRef<DragState | null>(null);

  const showHandles = isHovered || isDragging;
  const uid = useId().replace(/:/g, '');

  // Reset transform when product changes
  useEffect(() => {
    setSizeScale(1.0);
    setDesignTx(defaultDesignTransform(productSlug));
  }, [productSlug]);

  // Apply size slider
  useEffect(() => {
    const base = defaultDesignTransform(productSlug);
    setDesignTx({ cx: base.cx, cy: base.cy, w: base.w * sizeScale, h: base.h * sizeScale });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizeScale]);

  const pctFromEvent = useCallback((clientX: number, clientY: number) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const r = canvasRef.current.getBoundingClientRect();
    return {
      x: ((clientX - r.left) / r.width) * 100,
      y: ((clientY - r.top)  / r.height) * 100,
    };
  }, []);

  const startDrag = useCallback(
    (e: React.MouseEvent | React.TouchEvent, mode: DragMode) => {
      e.preventDefault();
      e.stopPropagation();
      const { clientX, clientY } = 'touches' in e
        ? { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY }
        : { clientX: (e as React.MouseEvent).clientX, clientY: (e as React.MouseEvent).clientY };

      setIsDragging(true);

      dragRef.current = {
        mode,
        startMousePct: pctFromEvent(clientX, clientY),
        startTx: { ...designTx },
      };

      const clientXY = (ev: MouseEvent | TouchEvent) =>
        'touches' in ev
          ? { clientX: ev.touches[0].clientX, clientY: ev.touches[0].clientY }
          : { clientX: (ev as MouseEvent).clientX, clientY: (ev as MouseEvent).clientY };

      const onMove = (ev: MouseEvent | TouchEvent) => {
        if (!dragRef.current) return;
        const { clientX: cx, clientY: cy } = clientXY(ev);
        const cur = pctFromEvent(cx, cy);
        const dx = cur.x - dragRef.current.startMousePct.x;
        const dy = cur.y - dragRef.current.startMousePct.y;
        const base = dragRef.current.startTx;
        const aspect = base.w / base.h;

        if (dragRef.current.mode === 'move') {
          setDesignTx({
            ...base,
            cx: Math.max(base.w / 2, Math.min(100 - base.w / 2, base.cx + dx)),
            cy: Math.max(base.h / 2, Math.min(100 - base.h / 2, base.cy + dy)),
          });
        } else {
          let newW = base.w;
          if (dragRef.current.mode === 'ne' || dragRef.current.mode === 'se') newW = base.w + dx * 2;
          if (dragRef.current.mode === 'nw' || dragRef.current.mode === 'sw') newW = base.w - dx * 2;
          newW = Math.max(8, Math.min(95, newW));
          const newH = newW / aspect;
          setDesignTx({ ...base, w: newW, h: newH });
          setSizeScale(newW / (defaultDesignTransform(productSlug).w || 1));
        }
      };

      const onUp = () => {
        setIsDragging(false);
        dragRef.current = null;
        window.removeEventListener('mousemove', onMove);
        window.removeEventListener('touchmove', onMove);
        window.removeEventListener('mouseup', onUp);
        window.removeEventListener('touchend', onUp);
      };

      window.addEventListener('mousemove', onMove);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('mouseup', onUp);
      window.addEventListener('touchend', onUp);
    },
    [designTx, pctFromEvent, productSlug],
  );

  const centerDesign = useCallback(() => {
    const base = defaultDesignTransform(productSlug);
    setDesignTx({ ...base, w: base.w * sizeScale, h: base.h * sizeScale });
  }, [productSlug, sizeScale]);

  const printZone = MOCKUP_PRINT_ZONES[productSlug] ?? MOCKUP_PRINT_ZONES['t-shirt'];
  // Circle for stickers; explicit radius from zone; fallback 12px for patch look on light mockups
  const designBorderRadius = printZone.shape === 'circle' ? '50%' : (printZone.borderRadius ?? '12px');

  const cornerClass: Record<ResizeCorner, string> = {
    nw: 'top-0 left-0 cursor-nw-resize',
    ne: 'top-0 right-0 cursor-ne-resize',
    sw: 'bottom-0 left-0 cursor-sw-resize',
    se: 'bottom-0 right-0 cursor-se-resize',
  };
  const cornerTransform: Record<ResizeCorner, string> = {
    nw: 'translate(-50%,-50%)',
    ne: 'translate(50%,-50%)',
    sw: 'translate(-50%,50%)',
    se: 'translate(50%,50%)',
  };

  /** Dashed selection border + corner handles — visible only on hover or drag */
  const designOverlay = (
    <>
      {showHandles && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            border: '1.5px dashed rgba(218,254,34,0.5)',
            borderRadius: designBorderRadius,
            zIndex: 10,
          }}
        />
      )}
      {showHandles && (['nw','ne','sw','se'] as ResizeCorner[]).map((c) => (
        <div
          key={c}
          className={`absolute w-4 h-4 bg-accent border-2 border-accent-foreground rounded-sm z-20 touch-none ${cornerClass[c]}`}
          style={{ transform: cornerTransform[c] }}
          onMouseDown={(e) => startDrag(e, c)}
          onTouchStart={(e) => startDrag(e, c)}
        />
      ))}
    </>
  );

  return (
    <div className={className}>
      <div
        ref={canvasRef}
        className="relative border border-border rounded-xl overflow-hidden aspect-square select-none"
        style={{ background: isDarkMockup ? '#1a1a1a' : '#ffffff', isolation: 'isolate' }}
      >
      <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
        <defs>
          {/* Remove white/light background: alpha = 3 − R − G − B */}
          <filter id={`rwbg-${uid}`} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3" result="wr"/>
            <feComposite in="wr" in2="SourceGraphic" operator="in"/>
          </filter>
          {/* Remove black/dark background: alpha = R*200+G*200+B*200 − 1; pure black→0, all other colors→1 */}
          <filter id={`rbbg-${uid}`} colorInterpolationFilters="sRGB">
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  200 200 200 0 -1" result="br"/>
            <feComposite in="br" in2="SourceGraphic" operator="in"/>
          </filter>
        </defs>
      </svg>

      {isDarkMockup ? (
          /* ── DARK MOCKUP: mockup below, design on top with white-removal filter ── */
          <>
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              <Image src={mockupSrc} alt="Mockup" fill className="object-contain" sizes="500px" unoptimized />
            </div>
            <div
              className="absolute overflow-hidden cursor-move touch-none"
              style={{
                left: `${designTx.cx - designTx.w / 2}%`,
                top:  `${designTx.cy - designTx.h / 2}%`,
                width:  `${designTx.w}%`,
                height: `${designTx.h}%`,
                borderRadius: designBorderRadius,
                zIndex: 2,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={(e) => startDrag(e, 'move')}
              onTouchStart={(e) => startDrag(e, 'move')}
            >
              <Image src={designSrc} alt="Design" fill style={{ filter: `url(#${designBg === 'dark' ? `rbbg-${uid}` : `rwbg-${uid}`})` }} className="object-contain pointer-events-none" sizes="400px" unoptimized={designSrc.startsWith('/')} draggable={false} />
              {designOverlay}
            </div>
          </>
        ) : (
          /* ── LIGHT MOCKUP: design below (white bg stripped), mockup on top (multiply for fabric texture) ── */
          <>
            <div
              className="absolute cursor-move touch-none overflow-hidden"
              style={{
                left: `${designTx.cx - designTx.w / 2}%`,
                top:  `${designTx.cy - designTx.h / 2}%`,
                width:  `${designTx.w}%`,
                height: `${designTx.h}%`,
                borderRadius: designBorderRadius,
                zIndex: 1,
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onMouseDown={(e) => startDrag(e, 'move')}
              onTouchStart={(e) => startDrag(e, 'move')}
            >
              <Image
                src={designSrc}
                alt="Design"
                fill
                style={{ filter: `url(#${designBg === 'dark' ? `rbbg-${uid}` : `rwbg-${uid}`})` }}
                className="object-contain pointer-events-none"
                sizes="400px"
                unoptimized={designSrc.startsWith('/')}
                draggable={false}
              />
              {designOverlay}
            </div>
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, mixBlendMode: 'multiply' }}>
              <Image src={mockupSrc} alt="Mockup" fill className="object-contain" sizes="500px" unoptimized />
            </div>
          </>
        )}
      </div>

      {showControls && (
        <div className="mt-3 flex items-center gap-3 px-1">
          <Maximize2 className="w-3.5 h-3.5 text-muted shrink-0" />
          <input
            type="range" min={0.4} max={2.2} step={0.05} value={sizeScale}
            onChange={(e) => setSizeScale(parseFloat(e.target.value))}
            className="flex-1 h-1 accent-[#dafe22] cursor-pointer"
            aria-label="Tamanho do design"
          />
          <button onClick={centerDesign} title="Centrar design"
            className="shrink-0 p-1.5 rounded border border-border text-muted hover:text-foreground hover:border-border-strong transition-colors"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
