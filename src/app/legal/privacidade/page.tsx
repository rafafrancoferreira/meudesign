import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | MeuDesign',
  description:
    'How MeuDesign collects, uses and protects your personal data, in compliance with the GDPR.',
  openGraph: {
    title: 'Privacy Policy | MeuDesign',
    type: 'website',
  },
};

const DATA_COLLECTED = [
  {
    category: 'Identification data',
    items: ['Full name', 'Email address', 'Phone number (optional)'],
  },
  {
    category: 'Delivery data',
    items: ['Full address', 'Postal code', 'City and country'],
  },
  {
    category: 'Usage data',
    items: [
      'Design prompts submitted',
      'Designs generated and selected',
      'Products viewed and added to cart',
    ],
  },
];

const LEGAL_BASES = [
  {
    purpose: 'Processing and managing orders',
    basis: 'Performance of a contract',
    article: 'Art. 6(1)(b)',
  },
  {
    purpose: 'Sending order confirmations and updates by email',
    basis: 'Performance of a contract',
    article: 'Art. 6(1)(b)',
  },
  {
    purpose: 'Responding to contact and support requests',
    basis: 'Legitimate interest',
    article: 'Art. 6(1)(f)',
  },
  {
    purpose: 'Platform improvement (anonymised data)',
    basis: 'Legitimate interest',
    article: 'Art. 6(1)(f)',
  },
];

const RIGHTS = [
  { right: 'Access', description: 'Request a copy of the personal data we hold about you.' },
  { right: 'Rectification', description: 'Correct inaccurate or incomplete data.' },
  { right: 'Erasure', description: "Request the deletion of your data ('right to be forgotten'), where applicable." },
  { right: 'Restriction', description: 'Restrict the processing of your data in certain circumstances.' },
  { right: 'Portability', description: 'Receive your data in a structured, machine-readable format.' },
  { right: 'Objection', description: 'Object to processing based on legitimate interest.' },
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
          Home
        </Link>

        {/* Header */}
        <div className="mb-14 border-b border-border pb-10">
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-accent mb-3">Legal</p>
          <h1
            className="font-display font-black uppercase leading-none text-foreground mb-4"
            style={{ fontSize: 'clamp(2rem, 6vw, 4rem)', letterSpacing: '-0.025em' }}
          >
            Privacy
            <br />
            Policy
          </h1>
          <p className="text-sm font-mono text-muted/60">
            Last updated: 8 May 2026 · GDPR (EU) 2016/679
          </p>
        </div>

        <div className="space-y-12 text-sm text-muted-foreground leading-relaxed">
          {/* Intro */}
          <section>
            <p>
              MeuDesign (an academic project developed at ISAG) is committed to protecting the
              privacy of its platform users. This policy transparently describes how we process
              personal data in compliance with the{' '}
              <strong className="text-foreground">
                General Data Protection Regulation (GDPR — Regulation (EU) 2016/679)
              </strong>
              .
            </p>
          </section>

          {/* Data Controller */}
          <section>
            <div className="flex items-center gap-3 mb-5">
              <Shield className="w-5 h-5 text-accent shrink-0" />
              <h2 className="text-lg font-display font-black uppercase text-foreground" style={{ letterSpacing: '-0.01em' }}>
                Data Controller
              </h2>
            </div>
            <div className="bg-surface border border-border rounded-xl p-5 space-y-1 font-mono text-xs">
              <p className="text-foreground">MeuDesign (ISAG Academic Project)</p>
              <p>ISAG — Instituto Superior de Administração e Gestão</p>
              <p>Rua Tomás Ribeiro, 50 · 1050-225 Lisbon · Portugal</p>
              <a href="mailto:info@meudesign.pt" className="text-accent hover:underline underline-offset-4">
                info@meudesign.pt
              </a>
            </div>
            <p className="mt-3 text-[12px]">
              This is an academic project. No commercial entity is registered. No order is
              actually processed or charged.
            </p>
          </section>

          {/* Data collected */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Data collected
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
              <strong className="text-foreground">Note:</strong> We do not collect payment data.
              In a real implementation, processing would be delegated to a certified provider
              (e.g. Stripe). In demonstration mode, no financial data is entered or stored.
            </p>
          </section>

          {/* Purposes and legal bases */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Purposes and legal bases
            </h2>
            <div className="bg-surface border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-[1fr_auto] text-[10px] font-mono uppercase tracking-[0.15em] text-muted px-5 py-3 border-b border-border">
                <span>Purpose</span>
                <span>Legal basis (GDPR)</span>
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

          {/* Retention */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Retention period
            </h2>
            <div className="space-y-3">
              <p>
                Order data is retained for{' '}
                <strong className="text-foreground">5 years</strong> for tax and legal compliance
                purposes.
              </p>
              <p>
                Contact data not associated with orders is deleted{' '}
                <strong className="text-foreground">12 months</strong> after the last interaction.
              </p>
              <p>
                You may request early deletion of your data at any time by contacting us at the
                email address below.
              </p>
            </div>
          </section>

          {/* Rights */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Your rights
            </h2>
            <p className="mb-5">
              Under the GDPR, you have the following rights regarding your personal data:
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
                To exercise any of these rights, send an email to{' '}
                <a
                  href="mailto:info@meudesign.pt"
                  className="text-accent hover:underline underline-offset-4"
                >
                  info@meudesign.pt
                </a>{' '}
                specifying which right you wish to exercise.
              </p>
              <p>
                You also have the right to lodge a complaint with the national supervisory
                authority:{' '}
                <strong className="text-foreground">Comissão Nacional de Proteção de Dados (CNPD)</strong>{' '}
                — www.cnpd.pt.
              </p>
            </div>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-5" style={{ letterSpacing: '-0.01em' }}>
              Cookies and local storage
            </h2>
            <p>
              MeuDesign uses the browser&apos;s{' '}
              <strong className="text-foreground">localStorage</strong>{' '}
              exclusively to persist the shopping cart between sessions (key{' '}
              <code className="text-[11px] bg-surface px-1 py-0.5 rounded border border-border text-muted-foreground">
                meudesign-cart-v1
              </code>
              ). We do not use tracking cookies, third-party analytics, social media pixels or any
              behavioural tracking technology at this stage of the project.
            </p>
          </section>

          {/* Changes */}
          <section className="border-t border-border pt-10">
            <h2 className="text-lg font-display font-black uppercase text-foreground mb-4" style={{ letterSpacing: '-0.01em' }}>
              Changes to this policy
            </h2>
            <p>
              Any significant changes to this policy will be communicated via a prominent notice
              on the site. We recommend reviewing this page periodically. For any questions,
              contact us at{' '}
              <a
                href="mailto:info@meudesign.pt"
                className="text-accent hover:underline underline-offset-4"
              >
                info@meudesign.pt
              </a>{' '}
              or via our{' '}
              <Link
                href="/contactos"
                className="text-accent hover:underline underline-offset-4"
              >
                contact form
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
