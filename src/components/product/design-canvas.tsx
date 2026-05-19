'use client';

import { useState, useRef, useCallback, useEffect, useId } from 'react';
import Image from 'next/image';
import { Maximize2, AlignCenter, Lock, Unlock, LayoutGrid } from 'lucide-react';
import { MOCKUP_PRINT_ZONES } from '@/lib/mockup-zones';

export interface DesignTransform {
  cx: number;
  cy: number;
  w: number;
  h: number;
}

type ResizeCorner = 'nw' | 'ne' | 'sw' | 'se';
type ResizeEdge = 'n' | 's' | 'e' | 'w';
type DragMode = 'move' | ResizeCorner | ResizeEdge;

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
  isDarkMockup?: boolean;
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
  const [lockRatio, setLockRatio] = useState(true);
  const [scaleX, setScaleX] = useState(1.0);
  const [scaleY, setScaleY] = useState(1.0);
  const [tileMode, setTileMode] = useState(false);
  const [tileGrid, setTileGrid] = useState(2);
  const [tileGap, setTileGap] = useState(0);
  const [tileOffset, setTileOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef   = useRef<DragState | null>(null);

  const showHandles = (isHovered || isDragging) && !tileMode;
  const uid = useId().replace(/:/g, '');

  // Reset all when product changes
  useEffect(() => {
    setSizeScale(1.0);
    setScaleX(1.0);
    setScaleY(1.0);
    setTileMode(false);
    setTileOffset({ x: 0, y: 0 });
    setDesignTx(defaultDesignTransform(productSlug));
  }, [productSlug]);

  // Locked mode: uniform scale slider
  useEffect(() => {
    if (!lockRatio) return;
    const base = defaultDesignTransform(productSlug);
    setDesignTx({ cx: base.cx, cy: base.cy, w: base.w * sizeScale, h: base.h * sizeScale });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sizeScale, lockRatio]);


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
      if (tileMode) return;
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
        const m = dragRef.current.mode;

        if (m === 'move') {
          setDesignTx({
            ...base,
            cx: Math.max(base.w / 2, Math.min(100 - base.w / 2, base.cx + dx)),
            cy: Math.max(base.h / 2, Math.min(100 - base.h / 2, base.cy + dy)),
          });
        } else if (m === 'nw' || m === 'ne' || m === 'sw' || m === 'se') {
          // Corner: proportional resize (symmetric from center)
          const aspect = base.w / base.h;
          let newW = (m === 'ne' || m === 'se') ? base.w + dx * 2 : base.w - dx * 2;
          newW = Math.max(8, Math.min(95, newW));
          const newH = newW / aspect;
          setDesignTx({ ...base, w: newW, h: newH });
          const def = defaultDesignTransform(productSlug);
          const ns = newW / (def.w || 1);
          setSizeScale(ns);
          setScaleX(ns);
          setScaleY(newH / (def.h || 1));
        } else if (m === 'e' || m === 'w') {
          // Horizontal edge: width only
          let newW = m === 'e' ? base.w + dx * 2 : base.w - dx * 2;
          newW = Math.max(8, Math.min(95, newW));
          setDesignTx({ ...base, w: newW });
          setScaleX(newW / (defaultDesignTransform(productSlug).w || 1));
        } else if (m === 'n' || m === 's') {
          // Vertical edge: height only
          let newH = m === 's' ? base.h + dy * 2 : base.h - dy * 2;
          newH = Math.max(8, Math.min(95, newH));
          setDesignTx({ ...base, h: newH });
          setScaleY(newH / (defaultDesignTransform(productSlug).h || 1));
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
    [designTx, pctFromEvent, productSlug, tileMode],
  );

  const centerDesign = useCallback(() => {
    const base = defaultDesignTransform(productSlug);
    if (lockRatio) {
      setDesignTx({ ...base, w: base.w * sizeScale, h: base.h * sizeScale });
    } else {
      setDesignTx({ ...base, w: base.w * scaleX, h: base.h * scaleY });
    }
  }, [productSlug, sizeScale, lockRatio, scaleX, scaleY]);

  const startTileDrag = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const startOff = { ...tileOffset };

    const onMove = (ev: PointerEvent) => {
      setTileOffset({ x: startOff.x + (ev.clientX - startX), y: startOff.y + (ev.clientY - startY) });
    };
    const onUp = () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  }, [tileOffset]);

  const toggleLock = useCallback(() => {
    if (lockRatio) {
      setScaleX(1.0);
      setScaleY(1.0);
    } else {
      setSizeScale(scaleX);
    }
    setLockRatio(prev => !prev);
  }, [lockRatio, sizeScale, scaleX]);

  const printZone = MOCKUP_PRINT_ZONES[productSlug] ?? MOCKUP_PRINT_ZONES['t-shirt'];
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

  const filterUrl = `url(#${designBg === 'dark' ? `rbbg-${uid}` : `rwbg-${uid}`})`;

  const designOverlay = (
    <>
      {showHandles && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ border: '1.5px dashed rgba(218,254,34,0.5)', borderRadius: designBorderRadius, zIndex: 10 }}
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
      {showHandles && !lockRatio && (
        <>
          <div
            className="absolute w-5 h-2 bg-accent border border-accent-foreground rounded-sm z-20 touch-none left-1/2 top-0 cursor-n-resize"
            style={{ transform: 'translate(-50%,-50%)' }}
            onMouseDown={(e) => startDrag(e, 'n')} onTouchStart={(e) => startDrag(e, 'n')}
          />
          <div
            className="absolute w-5 h-2 bg-accent border border-accent-foreground rounded-sm z-20 touch-none left-1/2 bottom-0 cursor-s-resize"
            style={{ transform: 'translate(-50%,50%)' }}
            onMouseDown={(e) => startDrag(e, 's')} onTouchStart={(e) => startDrag(e, 's')}
          />
          <div
            className="absolute w-2 h-5 bg-accent border border-accent-foreground rounded-sm z-20 touch-none right-0 top-1/2 cursor-e-resize"
            style={{ transform: 'translate(50%,-50%)' }}
            onMouseDown={(e) => startDrag(e, 'e')} onTouchStart={(e) => startDrag(e, 'e')}
          />
          <div
            className="absolute w-2 h-5 bg-accent border border-accent-foreground rounded-sm z-20 touch-none left-0 top-1/2 cursor-w-resize"
            style={{ transform: 'translate(-50%,-50%)' }}
            onMouseDown={(e) => startDrag(e, 'w')} onTouchStart={(e) => startDrag(e, 'w')}
          />
        </>
      )}
    </>
  );

  const renderTileGrid = (zIndex: number) => (
    <div
      className="absolute overflow-hidden cursor-move touch-none"
      style={{
        left: `calc(${printZone.left} + ${tileOffset.x}px)`,
        top: `calc(${printZone.top} + ${tileOffset.y}px)`,
        width: printZone.width,
        height: printZone.height,
        zIndex,
        borderRadius: designBorderRadius,
      }}
      onPointerDown={startTileDrag}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${tileGrid}, 1fr)`,
          gridTemplateRows: `repeat(${tileGrid}, 1fr)`,
          gap: `${tileGap}px`,
          width: '100%',
          height: '100%',
        }}
      >
        {Array.from({ length: tileGrid * tileGrid }).map((_, i) => (
          <div key={i} className="relative overflow-hidden">
            <Image
              src={designSrc}
              alt="Design tile"
              fill
              className="object-contain pointer-events-none"
              style={{ filter: filterUrl }}
              sizes="200px"
              unoptimized={designSrc.startsWith('/')}
              draggable={false}
            />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={className}>
      <div
        ref={canvasRef}
        className="relative border border-border rounded-xl overflow-hidden select-none"
        style={{ background: isDarkMockup ? '#1a1a1a' : '#ffffff', isolation: 'isolate', aspectRatio: printZone.aspectRatio ?? '1' }}
      >
        <svg aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
          <defs>
            <filter id={`rwbg-${uid}`} colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  -1 -1 -1 0 3" result="wr"/>
              <feComposite in="wr" in2="SourceGraphic" operator="in"/>
            </filter>
            <filter id={`rbbg-${uid}`} colorInterpolationFilters="sRGB">
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  200 200 200 0 -1" result="br"/>
              <feComposite in="br" in2="SourceGraphic" operator="in"/>
            </filter>
          </defs>
        </svg>

        {isDarkMockup ? (
          <>
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              <Image src={mockupSrc} alt="Mockup" fill className="object-contain" sizes="500px" unoptimized />
            </div>
            {tileMode ? renderTileGrid(2) : (
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
                <Image src={designSrc} alt="Design" fill style={{ filter: filterUrl, objectFit: 'contain', ...(lockRatio ? {} : { transform: `scaleX(${scaleX}) scaleY(${scaleY})`, transformOrigin: 'center center' }) }} className="pointer-events-none" sizes="400px" unoptimized={designSrc.startsWith('/')} draggable={false} />
                {designOverlay}
              </div>
            )}
          </>
        ) : (
          <>
            {tileMode ? renderTileGrid(1) : (
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
                  style={{ filter: filterUrl, objectFit: 'contain', ...(lockRatio ? {} : { transform: `scaleX(${scaleX}) scaleY(${scaleY})`, transformOrigin: 'center center' }) }}
                  className="pointer-events-none"
                  sizes="400px"
                  unoptimized={designSrc.startsWith('/')}
                  draggable={false}
                />
                {designOverlay}
              </div>
            )}
            <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2, mixBlendMode: 'multiply' }}>
              <Image src={mockupSrc} alt="Mockup" fill className="object-contain" sizes="500px" unoptimized />
            </div>
          </>
        )}
      </div>

      {showControls && (
        <div className="mt-3 space-y-2 px-1">
          {/* Size controls — hidden when tileMode */}
          {!tileMode && (
            lockRatio ? (
              <div className="flex items-center gap-3">
                <Maximize2 className="w-3.5 h-3.5 text-muted shrink-0" />
                <input
                  type="range" min={0.4} max={2.2} step={0.05} value={sizeScale}
                  onChange={(e) => setSizeScale(parseFloat(e.target.value))}
                  className="flex-1 h-1 accent-[#dafe22] cursor-pointer"
                  aria-label="Tamanho do design"
                />
                <button onClick={centerDesign} title="Centrar design"
                  className="shrink-0 p-1.5 rounded border border-border text-muted hover:text-foreground hover:border-border-strong transition-colors">
                  <AlignCenter className="w-3.5 h-3.5" />
                </button>
                <button onClick={toggleLock} title="Escalar eixos independentemente"
                  className="shrink-0 p-1.5 rounded border border-border text-muted hover:text-foreground hover:border-border-strong transition-colors">
                  <Lock className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 w-3.5 text-[11px] font-mono text-muted text-center select-none">↔</span>
                  <input
                    type="range" min={0.4} max={2.5} step={0.05} value={scaleX}
                    onChange={(e) => setScaleX(parseFloat(e.target.value))}
                    className="flex-1 h-1 accent-[#dafe22] cursor-pointer"
                    aria-label="Largura do design"
                  />
                  <button onClick={centerDesign} title="Centrar design"
                    className="shrink-0 p-1.5 rounded border border-border text-muted hover:text-foreground hover:border-border-strong transition-colors">
                    <AlignCenter className="w-3.5 h-3.5" />
                  </button>
                  <button onClick={toggleLock} title="Manter proporções"
                    className="shrink-0 p-1.5 rounded border border-accent/50 text-accent hover:border-accent transition-colors">
                    <Unlock className="w-3.5 h-3.5" />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="shrink-0 w-3.5 text-[11px] font-mono text-muted text-center select-none">↕</span>
                  <input
                    type="range" min={0.4} max={2.5} step={0.05} value={scaleY}
                    onChange={(e) => setScaleY(parseFloat(e.target.value))}
                    className="flex-1 h-1 accent-[#dafe22] cursor-pointer"
                    aria-label="Altura do design"
                  />
                  <div className="shrink-0 p-1.5 invisible" aria-hidden><AlignCenter className="w-3.5 h-3.5" /></div>
                  <div className="shrink-0 p-1.5 invisible" aria-hidden><Unlock className="w-3.5 h-3.5" /></div>
                </div>
              </div>
            )
          )}

          {/* Tile mode row */}
          <div className={`flex flex-wrap items-center gap-2${!tileMode ? ' pt-1.5 border-t border-border' : ''}`}>
            <button
              onClick={() => { setTileMode(prev => !prev); setTileOffset({ x: 0, y: 0 }); }}
              className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider rounded border transition-all shrink-0 ${
                tileMode
                  ? 'bg-accent/10 border-accent/40 text-accent'
                  : 'border-border text-muted hover:border-border-strong hover:text-foreground'
              }`}
            >
              <LayoutGrid className="w-3 h-3" />
              Repetir
            </button>

            {tileMode && (
              <>
                <div className="flex gap-1 shrink-0">
                  {[1, 2, 3, 4].map((n) => (
                    <button
                      key={n}
                      onClick={() => setTileGrid(n)}
                      className={`w-8 h-6 text-[10px] font-mono rounded border transition-all ${
                        tileGrid === n
                          ? 'bg-accent/10 border-accent/40 text-accent'
                          : 'border-border text-muted hover:border-border-strong hover:text-foreground'
                      }`}
                    >
                      {n}×{n}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-1.5 flex-1 min-w-[80px]">
                  <span className="text-[10px] font-mono text-muted shrink-0">Gap</span>
                  <input
                    type="range" min={0} max={20} step={1} value={tileGap}
                    onChange={(e) => setTileGap(parseInt(e.target.value))}
                    className="flex-1 h-1 accent-[#dafe22] cursor-pointer min-w-0"
                    aria-label="Espaçamento entre tiles"
                  />
                  <span className="text-[9px] font-mono text-muted/70 shrink-0 w-6">{tileGap}px</span>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
