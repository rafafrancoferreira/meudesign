import Link from "next/link";

const COLUMNS = [
  {
    title: "Categorias",
    links: [
      { label: "Vestuário", href: "/loja?categoria=vestuario" },
      { label: "Decoração", href: "/loja?categoria=decoracao" },
      { label: "Acessórios", href: "/loja?categoria=acessorios" },
    ],
  },
  {
    title: "Coleções",
    links: [
      { label: "T-shirt personalizada", href: "/produto/t-shirt" },
      { label: "Hoodie personalizada", href: "/produto/hoodie" },
      { label: "Poster personalizado", href: "/produto/poster" },
      { label: "Ver tudo", href: "/loja" },
    ],
  },
  {
    title: "Sobre Nós",
    links: [
      { label: "A nossa história", href: "/sobre" },
      { label: "Como funciona", href: "/#como-funciona" },
      { label: "Galeria", href: "/#galeria" },
    ],
  },
  {
    title: "Contratos",
    links: [
      { label: "Entregas e Devoluções", href: "/legal/entregas-devolucoes" },
      { label: "Política de Privacidade", href: "/legal/privacidade" },
    ],
  },
  {
    title: "Ajuda",
    links: [
      { label: "Contactos", href: "/contactos" },
      { label: "FAQ", href: "/contactos#faq" },
    ],
  },
  {
    title: "Minha Conta",
    links: [
      { label: "Carrinho", href: "/carrinho" },
      { label: "Finalizar compra", href: "/checkout" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-surface">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-8">

        {/* Grid principal */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-7">

          {/* Marca */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <Link
              href="/"
              className="font-display text-2xl font-black uppercase tracking-tight transition-colors hover:text-accent"
            >
              MEUDESIGN
            </Link>
            <p className="mt-3 max-w-[200px] text-sm text-muted-foreground">
              Design inteligente, feito por si.
            </p>
          </div>

          {/* Colunas */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-foreground">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Rodapé inferior */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-xs text-muted">
            © 2026 MeuDesign — Projeto académico · ISAG, Licenciatura em Gestão de Empresas.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/legal/privacidade"
              className="text-xs text-muted transition-colors hover:text-muted-foreground"
            >
              Privacidade
            </Link>
            <Link
              href="/legal/entregas-devolucoes"
              className="text-xs text-muted transition-colors hover:text-muted-foreground"
            >
              Entregas
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
