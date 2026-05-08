'use client';

import { motion } from 'motion/react';
import { PenLine, Wand2, Package } from 'lucide-react';

const steps = [
  {
    number: '01',
    icon: PenLine,
    title: 'Descreves',
    description:
      'Escreves a tua ideia em português — pode ser simples como "gato astronauta retro" ou elaborada com cores, estilo e referências específicas.',
  },
  {
    number: '02',
    icon: Wand2,
    title: 'A IA gera',
    description:
      'Em segundos, o modelo de IA interpreta o teu prompt e cria um design único, pronto a aplicar no produto que escolheres.',
  },
  {
    number: '03',
    icon: Package,
    title: 'Receves em casa',
    description:
      'Aprovado o design, tratamos da produção e do envio. Em poucos dias úteis, o produto chega à tua porta.',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export function HowItWorks() {
  return (
    <section className="px-4 py-24 border-t border-border">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-muted mb-3">
            O processo
          </p>
          <h2
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2.2rem, 6vw, 4.5rem)', letterSpacing: '-0.02em' }}
          >
            Três passos.
            <br />
            <span className="text-accent">Design pronto.</span>
          </h2>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid md:grid-cols-3 gap-px bg-border"
        >
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.number}
                variants={item}
                className="bg-background p-8 xl:p-12 group"
              >
                {/* Number + icon row */}
                <div className="flex items-start justify-between mb-8">
                  <span
                    className="font-display font-black text-foreground/10 leading-none select-none"
                    style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', letterSpacing: '-0.03em' }}
                  >
                    {step.number}
                  </span>
                  <div className="w-10 h-10 border border-border rounded-lg flex items-center justify-center group-hover:border-accent group-hover:bg-accent/5 transition-colors">
                    <Icon className="w-5 h-5 text-muted group-hover:text-accent transition-colors" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-display font-black uppercase text-foreground text-2xl xl:text-3xl mb-4 leading-none">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                {/* Bottom accent line */}
                <div className="mt-8 h-px bg-border group-hover:bg-accent/40 transition-colors" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
