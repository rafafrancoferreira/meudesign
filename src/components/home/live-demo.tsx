'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Loader2 } from 'lucide-react';
import { ScrambledText } from '@/components/effects/scrambled-text';

type DemoState = 'idle' | 'loading' | 'success';

const EXAMPLE_PROMPTS = [
  'lobo geométrico em tons de azul e prata',
  'sol retro estilo anos 70, tons terra',
  'astronauta flutuando entre plantas tropicais',
  'dragão minimalista traço único, preto e lima',
];

function asciiBar(p: number, w = 10) {
  const f = Math.round((p / 100) * w);
  return `[${'█'.repeat(f)}${'░'.repeat(w - f)}] ${Math.round(p)}%`;
}

export function LiveDemo() {
  const [prompt, setPrompt] = useState('');
  const [state, setState] = useState<DemoState>('idle');
  const [result, setResult] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [used, setUsed] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleExampleClick = (p: string) => setPrompt(p);

  const generate = async () => {
    if (!prompt.trim() || state === 'loading') return;

    setState('loading');
    setProgress(0);

    intervalRef.current = setInterval(() => {
      setProgress((p) => (p >= 88 ? p : p + Math.random() * 14));
    }, 300);

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, style: 'abstrato' }),
      });
      const data = await res.json();

      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(100);
      setTimeout(() => {
        setResult(data.imageUrl);
        setState('success');
        setUsed(true);
      }, 350);
    } catch {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setState('idle');
    }
  };

  return (
    <section className="px-4 py-24 border-t border-border bg-surface/40">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3">
            Experimenta agora
          </p>
          <h2
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.02em' }}
          >
            Vê a IA em ação.
          </h2>
          <p className="text-muted-foreground text-sm mt-3 font-sans max-w-sm mx-auto">
            Escreve uma ideia e carrega em gerar. Uma geração gratuita, sem conta.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Example prompts */}
          {!used && (
            <div className="flex flex-wrap gap-2 justify-center mb-4">
              {EXAMPLE_PROMPTS.map((p) => (
                <button
                  key={p}
                  onClick={() => handleExampleClick(p)}
                  className="text-xs font-mono text-muted border border-border rounded-full px-3 py-1.5 hover:border-accent hover:text-accent transition-colors"
                >
                  {p}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="flex gap-3 mb-6">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && generate()}
              placeholder="Descreve o teu design..."
              disabled={state === 'loading' || used}
              className="flex-1 bg-surface border border-border rounded-lg px-4 py-3.5 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-border-strong transition-colors font-sans disabled:opacity-50"
            />
            <button
              onClick={generate}
              disabled={!prompt.trim() || state === 'loading' || used}
              className="flex items-center gap-2 bg-accent text-accent-foreground font-mono font-semibold uppercase tracking-wider px-5 py-3.5 rounded-lg text-sm hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {state === 'loading' ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              {state === 'loading' ? 'A gerar' : 'Gerar'}
            </button>
          </div>

          {/* Canvas */}
          <div className="relative bg-surface border border-border rounded-2xl overflow-hidden h-72 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {state === 'idle' && !result && (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center"
                >
                  <div className="w-10 h-10 rounded-full border border-border flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-4 h-4 text-muted" />
                  </div>
                  <p className="text-sm text-muted font-mono">O teu design aparece aqui</p>
                </motion.div>
              )}

              {state === 'loading' && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center space-y-4 px-8 w-full"
                >
                  {/* Scanlines */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage:
                        'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.012) 3px, rgba(255,255,255,0.012) 4px)',
                    }}
                  />
                  <p className="font-mono text-xs uppercase tracking-widest">
                    <ScrambledText text="A interpretar o teu prompt..." isActive className="text-accent" />
                  </p>
                  <p className="font-mono text-sm text-foreground/50">{asciiBar(progress)}</p>
                </motion.div>
              )}

              {state === 'success' && result && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full h-full relative"
                >
                  <Image src={result} alt="Design gerado" fill className="object-contain p-8" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Post-generation CTA */}
          {used && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-center"
            >
              <p className="text-sm text-muted-foreground font-sans">
                Gostaste? No criador podes regenerar, escolher estilos e adicionar ao carrinho.
              </p>
              <Link
                href="/criar"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-mono font-semibold uppercase tracking-wider px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity text-xs whitespace-nowrap"
              >
                Ir para o criador
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
