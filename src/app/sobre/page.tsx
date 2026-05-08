import type { Metadata } from 'next';
import { aboutText, teamMembers, blogPosts } from '@/lib/content';
import Link from 'next/link';
import { ArrowRight, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre | MeuDesign',
  description:
    'Conhece a equipa por trás do MeuDesign — três estudantes do IPAG com uma missão: democratizar o design com inteligência artificial.',
  openGraph: {
    title: 'Sobre o MeuDesign',
    description: 'A história, a missão e a equipa do MeuDesign.',
    type: 'website',
  },
};

export default function SobrePage() {
  return (
    <main className="px-4 py-16">
      <div className="max-w-5xl mx-auto">
        {/* ── Hero ── */}
        <div className="mb-20 border-b border-border pb-16">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-4">
            A nossa história
          </p>
          <h1
            className="font-display font-black uppercase leading-none text-foreground mb-8"
            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', letterSpacing: '-0.025em' }}
          >
            Design
            <br />
            <span className="text-muted/30">para todos.</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl font-mono">
            &ldquo;{aboutText[0]}&rdquo;
          </p>
        </div>

        {/* ── Story ── */}
        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          <div className="space-y-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted">
              Como surgiu
            </p>
            <div className="space-y-5">
              {aboutText.slice(1).map((paragraph, i) => (
                <p key={i} className="text-sm text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Mission card */}
          <div className="flex flex-col justify-center">
            <div className="bg-surface border border-border rounded-2xl p-8 relative overflow-hidden">
              {/* Accent line */}
              <div className="absolute top-0 left-0 right-0 h-px bg-accent/30" />

              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-4">
                Missão
              </p>
              <p className="text-xl font-display font-black uppercase leading-tight text-foreground mb-6" style={{ letterSpacing: '-0.02em' }}>
                Democratizar o design com IA.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Queremos que qualquer pessoa — seja para oferecer, para usar ou simplesmente para se
                expressar — consiga criar algo de que se orgulhe, sem barreiras técnicas nem
                orçamentos impossíveis.
              </p>

              <div className="mt-6 pt-6 border-t border-border flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-muted/50" />
                <p className="text-[11px] font-mono text-muted/60">
                  Projeto académico — IPAG, LGE, 2026
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Team ── */}
        <div className="mb-20">
          <div className="mb-10 border-b border-border pb-6">
            <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-2">
              Equipa
            </p>
            <h2
              className="font-display font-black uppercase text-foreground"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', letterSpacing: '-0.02em' }}
            >
              Os três por trás do projeto
            </h2>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="bg-surface border border-border rounded-2xl p-6 group hover:border-border-strong transition-colors"
              >
                {/* Avatar */}
                <div className="w-14 h-14 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                  <span className="text-lg font-mono font-bold text-accent">{member.initials}</span>
                </div>

                <p className="text-base font-display font-black uppercase text-foreground mb-1" style={{ letterSpacing: '-0.01em' }}>
                  {member.name}
                </p>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-4">
                  {member.role}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Academic context ── */}
        <div className="mb-20">
          <div className="bg-surface border border-border rounded-2xl p-8">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-muted/10 border border-border flex items-center justify-center shrink-0 mt-0.5">
                <GraduationCap className="w-4 h-4 text-muted/60" />
              </div>
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-3">
                  Contexto académico
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                  Somos honestos quanto ao contexto: o MeuDesign é um projeto académico desenvolvido
                  no IPAG para a UC <em>Plataformas Digitais e E-Commerce</em>. O site é funcional,
                  os produtos são reais e o processo de compra está implementado — mas em modo de
                  demonstração.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Nenhuma encomenda é efetivamente processada nem cobrada. Os dados de contacto
                  inseridos nos formulários não são enviados para qualquer servidor externo.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Blog teaser ── */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-muted mb-1">
                Do nosso blogue
              </p>
              <h2
                className="font-display font-black uppercase text-foreground"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', letterSpacing: '-0.02em' }}
              >
                Últimos artigos
              </h2>
            </div>
            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-wide text-muted hover:text-accent transition-colors flex items-center gap-1"
            >
              Ver todos <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {blogPosts.map((post) => (
              <div
                key={post.slug}
                className="bg-surface border border-border rounded-xl p-5 hover:border-border-strong transition-colors group"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-accent bg-accent/10 px-2 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[9px] font-mono text-muted">{post.readTime}</span>
                </div>
                <h3 className="text-sm font-mono uppercase tracking-wide text-foreground leading-snug mb-2 group-hover:text-accent transition-colors">
                  {post.title}
                </h3>
                <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
