import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Clock, Package, Truck, RefreshCw, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Entregas e Devoluções | MeuDesign',
  description:
    'Informação sobre prazos de produção, custos de envio e política de trocas e devoluções do MeuDesign.',
  openGraph: {
    title: 'Entregas e Devoluções | MeuDesign',
    type: 'website',
  },
};

const PRODUCTION_TIMES = [
  { product: 'T-shirts e hoodies', time: '3–5 dias úteis' },
  { product: 'Posters', time: '2–4 dias úteis' },
  { product: 'Canecas', time: '3–5 dias úteis' },
  { product: 'Capas de telemóvel', time: '3–5 dias úteis' },
  { product: 'Autocolantes', time: '2–3 dias úteis' },
  { product: 'Tote bags', time: '3–5 dias úteis' },
  { product: 'Quadros decorativos', time: '4–6 dias úteis' },
];

export default function EntregasDevolucoesPage() {
  return (
    <main className="px-4 py-16 min-h-[80vh]">
      <div className="max-w-3xl mx-auto">
        {/* Breadcrumb */}
        <Link
          href="/"
          className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3 h-3" />
          Início
        </Link>

        {/* Header */}
        <div className="mb-14 border-b border-border pb-10">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">Legal</p>
          <h1
            className="font-display font-black uppercase leading-none text-foreground"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            Entregas &
            <br />
            Devoluções
          </h1>
        </div>

        {/* Demo banner */}
        <div className="flex items-center gap-3 bg-surface border border-border rounded-xl px-5 py-3.5 mb-12">
          <AlertTriangle className="w-4 h-4 text-accent shrink-0" />
          <p className="text-sm font-mono text-muted-foreground">
            O MeuDesign está em modo de demonstração académica. Nenhuma encomenda é efetivamente
            processada ou cobrada.
          </p>
        </div>

        <div className="space-y-12">
          {/* ── Produção ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                Tempos de produção
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Cada produto é produzido individualmente, a pedido, após confirmação da encomenda. A
              produção começa no próximo dia útil após o pagamento ser processado. Os tempos abaixo
              são estimados em dias úteis (segunda a sexta, excluindo feriados nacionais).
            </p>
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              {PRODUCTION_TIMES.map((row, i) => (
                <div
                  key={row.product}
                  className={`flex items-center justify-between px-5 py-3.5 text-sm font-mono ${
                    i < PRODUCTION_TIMES.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-muted-foreground">{row.product}</span>
                  <span className="text-accent font-bold">{row.time}</span>
                </div>
              ))}
            </div>
          </section>

          {/* ── Envio ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Truck className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                Envio e entrega
              </h2>
            </div>

            <div className="space-y-4">
              <div className="bg-surface border border-border rounded-xl p-5 space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">
                      Transportadora
                    </p>
                    <p className="text-sm font-mono text-foreground">CTT — Correios de Portugal</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">
                      Prazo de entrega
                    </p>
                    <p className="text-sm font-mono text-foreground">2–4 dias úteis após expedição</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-1">
                      Custo de envio
                    </p>
                    <p className="text-sm font-mono text-foreground">
                      <span className="text-accent font-bold">3,99 €</span>
                      <span className="text-muted-foreground ml-2 text-[11px]">
                        · Grátis acima de 30,00 €
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                <p>
                  Todas as encomendas incluem número de rastreio enviado por email no momento da
                  expedição, permitindo acompanhar o estado da entrega em tempo real no site dos CTT.
                </p>
                <p>
                  De momento, enviamos apenas para <strong className="text-foreground">Portugal continental e ilhas</strong> (Madeira e Açores). Envios para as ilhas podem ter prazos ligeiramente superiores aos indicados.
                </p>
              </div>
            </div>
          </section>

          {/* ── Prazo total estimado ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <Package className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                Prazo total estimado
              </h2>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-5">
              O prazo total de entrega é a soma do tempo de produção com o tempo de envio. Para a
              maioria dos produtos, o prazo total situa-se entre{' '}
              <span className="text-foreground font-bold">5 e 9 dias úteis</span> desde a
              confirmação da encomenda.
            </p>
            <div className="bg-surface border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 text-sm font-mono">
                <span className="text-muted-foreground">Produção</span>
                <span className="text-muted/40">+</span>
                <span className="text-muted-foreground">Envio CTT</span>
                <span className="text-muted/40">=</span>
                <span className="text-accent font-bold">5–9 dias úteis</span>
              </div>
            </div>
          </section>

          {/* ── Trocas e devoluções ── */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <RefreshCw className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                Trocas e devoluções
              </h2>
            </div>

            <div className="space-y-5 text-sm text-muted-foreground leading-relaxed">
              <div className="bg-surface border border-border rounded-xl p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-foreground mb-3">
                  Regra geral — sem trocas em produtos personalizados
                </p>
                <p>
                  Dado o caráter personalizado de todos os produtos, não aceitamos devoluções ou
                  trocas por arrependimento. Esta exceção ao direito de livre resolução é prevista
                  pelo artigo 17.º, n.º 1, alínea b) do Decreto-Lei n.º 24/2014, que exclui bens
                  confeccionados de acordo com as especificações do consumidor.
                </p>
              </div>

              <div className="bg-surface border border-accent/20 rounded-xl p-5">
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent mb-3">
                  Exceção — defeito de fabrico ou erro de impressão
                </p>
                <p className="mb-3">
                  Se o produto chegar com defeito de fabrico, erro de impressão que não corresponde
                  ao design aprovado, ou dano ocorrido durante o transporte, tens direito a
                  substituição gratuita ou reembolso integral.
                </p>
                <ul className="space-y-2 list-none">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">—</span>
                    <span>Reporta o problema no prazo de <strong className="text-foreground">14 dias</strong> após a receção.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">—</span>
                    <span>Envia fotografias do produto e da embalagem para <strong className="text-foreground">info@meudesign.pt</strong>.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">—</span>
                    <span>Procedemos à substituição ou reembolso no prazo de 5 dias úteis após análise.</span>
                  </li>
                </ul>
              </div>

              <p className="text-[12px]">
                O produto não deve ter sido lavado, usado de forma evidente ou danificado após
                receção para ser elegível a substituição por defeito.
              </p>
            </div>
          </section>

          {/* ── Contacto ── */}
          <section className="border-t border-border pt-10">
            <p className="text-sm text-muted-foreground leading-relaxed">
              Para qualquer questão sobre a tua encomenda, envia-nos um email para{' '}
              <a
                href="mailto:info@meudesign.pt"
                className="text-accent hover:underline underline-offset-4"
              >
                info@meudesign.pt
              </a>{' '}
              ou usa o nosso{' '}
              <Link
                href="/contactos"
                className="text-accent hover:underline underline-offset-4"
              >
                formulário de contacto
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
