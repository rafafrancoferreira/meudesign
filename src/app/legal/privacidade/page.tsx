import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Política de Privacidade | MeuDesign',
  description:
    'Como o MeuDesign recolhe, utiliza e protege os teus dados pessoais, em conformidade com o RGPD.',
  openGraph: {
    title: 'Política de Privacidade | MeuDesign',
    type: 'website',
  },
};

const DATA_COLLECTED = [
  {
    category: 'Dados de identificação',
    items: ['Nome completo', 'Endereço de email', 'Número de telefone (opcional)'],
  },
  {
    category: 'Dados de entrega',
    items: ['Morada completa', 'Código postal', 'Cidade e país'],
  },
  {
    category: 'Dados de utilização',
    items: [
      'Prompts de design submetidos',
      'Designs gerados e selecionados',
      'Produtos visualizados e adicionados ao carrinho',
    ],
  },
];

const LEGAL_BASES = [
  {
    purpose: 'Processamento e gestão de encomendas',
    basis: 'Execução de contrato',
    article: 'Art.º 6.º, n.º 1, al. b)',
  },
  {
    purpose: 'Envio de confirmações e atualizações por email',
    basis: 'Execução de contrato',
    article: 'Art.º 6.º, n.º 1, al. b)',
  },
  {
    purpose: 'Resposta a pedidos de contacto e suporte',
    basis: 'Interesse legítimo',
    article: 'Art.º 6.º, n.º 1, al. f)',
  },
  {
    purpose: 'Melhoria da plataforma (dados anonimizados)',
    basis: 'Interesse legítimo',
    article: 'Art.º 6.º, n.º 1, al. f)',
  },
];

const RIGHTS = [
  { right: 'Acesso', description: 'Solicitar uma cópia dos dados pessoais que conservamos sobre ti.' },
  { right: 'Retificação', description: 'Corrigir dados inexatos ou incompletos.' },
  { right: 'Apagamento', description: "Solicitar a eliminação dos teus dados ('direito a ser esquecido'), quando aplicável." },
  { right: 'Limitação', description: 'Restringir o tratamento dos teus dados em determinadas circunstâncias.' },
  { right: 'Portabilidade', description: 'Receber os teus dados num formato estruturado e legível por máquina.' },
  { right: 'Oposição', description: 'Opor-te ao tratamento baseado em interesse legítimo.' },
];

export default function PrivacidadePage() {
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
            className="font-display font-black uppercase leading-none text-foreground mb-4"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            Política de
            <br />
            Privacidade
          </h1>
          <p className="text-sm font-mono text-muted/60">
            Última atualização: 8 de maio de 2026 · RGPD (UE) 2016/679
          </p>
        </div>

        <div className="space-y-12 text-sm text-muted-foreground leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              O MeuDesign (projeto académico desenvolvido no IPAG) compromete-se a proteger a
              privacidade dos utilizadores da plataforma meudesign.pt. Esta política descreve, de
              forma transparente, como tratamos os dados pessoais em conformidade com o{' '}
              <strong className="text-foreground">
                Regulamento Geral sobre a Proteção de Dados (RGPD — Regulamento (UE) 2016/679)
              </strong>
              .
            </p>
          </section>

          {/* Responsável */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <Shield className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                Responsável pelo tratamento
              </h2>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 space-y-1 font-mono text-xs">
              <p className="text-foreground">MeuDesign (Projeto Académico IPAG)</p>
              <p>IPAG — Instituto Português de Administração e Gestão</p>
              <p>Rua Tomás Ribeiro, 50 · 1050-225 Lisboa · Portugal</p>
              <a href="mailto:info@meudesign.pt" className="text-accent hover:underline underline-offset-4">
                info@meudesign.pt
              </a>
            </div>
            <p className="mt-3 text-[12px]">
              Trata-se de um projeto académico. Não existe entidade comercial registada. Nenhuma
              encomenda é efetivamente processada ou cobrada.
            </p>
          </section>

          {/* Dados recolhidos */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Dados recolhidos
            </h2>
            <div className="space-y-4">
              {DATA_COLLECTED.map((cat) => (
                <div key={cat.category} className="bg-surface border border-border rounded-xl p-5">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted mb-3">
                    {cat.category}
                  </p>
                  <ul className="space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <span className="text-accent mt-0.5 shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <p className="mt-4 text-[12px] bg-surface border border-border rounded-xl px-5 py-3">
              <strong className="text-foreground">Nota:</strong> Não recolhemos dados de pagamento.
              Numa implementação real, o processamento seria delegado a um prestador certificado
              (ex.: Stripe). Em modo de demonstração, nenhum dado financeiro é inserido nem
              armazenado.
            </p>
          </section>

          {/* Finalidades e bases legais */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Finalidades e bases legais
            </h2>
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_auto] text-[10px] font-mono uppercase tracking-[0.15em] text-muted px-5 py-3 border-b border-border">
                <span>Finalidade</span>
                <span>Base legal (RGPD)</span>
              </div>
              {LEGAL_BASES.map((row, i) => (
                <div
                  key={row.purpose}
                  className={`grid grid-cols-[1fr_auto] gap-4 px-5 py-3.5 text-xs font-mono ${
                    i < LEGAL_BASES.length - 1 ? 'border-b border-border' : ''
                  }`}
                >
                  <span className="text-muted-foreground">{row.purpose}</span>
                  <div className="text-right shrink-0">
                    <span className="text-foreground block">{row.basis}</span>
                    <span className="text-muted/60 text-[10px]">{row.article}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Conservação */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Prazo de conservação
            </h2>
            <div className="space-y-3">
              <p>
                Os dados de encomenda são conservados pelo prazo de{' '}
                <strong className="text-foreground">5 anos</strong> para efeitos de obrigações
                fiscais e legais.
              </p>
              <p>
                Dados de contacto não associados a encomendas são eliminados{' '}
                <strong className="text-foreground">12 meses</strong> após o último contacto.
              </p>
              <p>
                Podes solicitar a eliminação antecipada dos teus dados a qualquer momento através do
                email indicado abaixo.
              </p>
            </div>
          </section>

          {/* Direitos */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Os teus direitos
            </h2>
            <p className="mb-5">
              Nos termos do RGPD, tens os seguintes direitos em relação aos teus dados pessoais:
            </p>
            <div className="space-y-3">
              {RIGHTS.map((r) => (
                <div key={r.right} className="bg-surface border border-border rounded-xl px-5 py-4 flex items-start gap-4">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-accent w-24 shrink-0 mt-0.5">
                    {r.right}
                  </span>
                  <span className="text-sm">{r.description}</span>
                </div>
              ))}
            </div>
            <div className="mt-5 space-y-3">
              <p>
                Para exercer qualquer destes direitos, envia um email para{' '}
                <a
                  href="mailto:info@meudesign.pt"
                  className="text-accent hover:underline underline-offset-4"
                >
                  info@meudesign.pt
                </a>{' '}
                com a indicação do direito que pretendes exercer.
              </p>
              <p>
                Tens também o direito de apresentar reclamação à autoridade de controlo nacional:{' '}
                <strong className="text-foreground">Comissão Nacional de Proteção de Dados (CNPD)</strong>{' '}
                — www.cnpd.pt.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Cookies e armazenamento local
            </h2>
            <p>
              O MeuDesign utiliza{' '}
              <strong className="text-foreground">localStorage do browser</strong>{' '}
              exclusivamente para guardar o conteúdo do carrinho de compras entre sessões (chave{' '}
              <code className="text-[11px] bg-surface px-1 py-0.5 rounded border border-border text-muted-foreground">
                meudesign-cart-v1
              </code>
              ). Não utilizamos cookies de rastreio, analytics de terceiros, pixels de redes sociais
              ou qualquer tecnologia de seguimento comportamental nesta fase do projeto.
            </p>
          </section>

          {/* Alterações */}
          <section className="border-t border-border pt-10">
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-4" style={{ letterSpacing: '-0.01em' }}>
              Alterações a esta política
            </h2>
            <p>
              Qualquer alteração relevante a esta política será comunicada através de um aviso
              destacado no site. Recomendamos que reveja esta página periodicamente. Para questões,
              contacta-nos através de{' '}
              <a
                href="mailto:info@meudesign.pt"
                className="text-accent hover:underline underline-offset-4"
              >
                info@meudesign.pt
              </a>{' '}
              ou do nosso{' '}
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
