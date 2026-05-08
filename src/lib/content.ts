// ── Team ──────────────────────────────────────────────────────────────────

export const teamMembers = [
  {
    name: 'Rafael Ferreira',
    role: 'Desenvolvimento & Produto',
    initials: 'RF',
    bio: 'Responsável pela arquitetura técnica e desenvolvimento da plataforma. Apaixonado por produto digital, UX e por resolver problemas de forma elegante.',
  },
  {
    name: 'Martim Garcez',
    role: 'Design & Identidade Visual',
    initials: 'MG',
    bio: 'Define a identidade visual do MeuDesign e garante consistência estética em todos os pontos de contacto — da homepage ao packaging.',
  },
  {
    name: 'Guilherme Almeida',
    role: 'Negócio & Operações',
    initials: 'GA',
    bio: 'Lidera a estratégia de negócio, as parcerias com produtores e o plano de divulgação. Mantém o projeto ancorado na realidade do mercado.',
  },
];

// ── Contact info ──────────────────────────────────────────────────────────

export const contactInfo = {
  email: 'info@meudesign.pt',
  instagram: { label: '@meudesign.pt', url: 'https://instagram.com/meudesign.pt' },
  tiktok: { label: '@meudesign', url: 'https://tiktok.com/@meudesign' },
  address: {
    institution: 'IPAG — Instituto Português de Administração e Gestão',
    street: 'Rua Tomás Ribeiro, 50',
    postalCode: '1050-225 Lisboa',
    country: 'Portugal',
  },
};

// ── About ─────────────────────────────────────────────────────────────────

export const aboutText = [
  'O MeuDesign nasceu de uma pergunta simples: e se qualquer pessoa pudesse ter um design único, sem saber desenhar? Somos três estudantes do IPAG — Rafael, Martim e Guilherme — e desenvolvemos esta plataforma no âmbito da UC Plataformas Digitais e E-Commerce.',
  'O problema é real: criar algo visualmente apelativo costuma exigir anos de prática ou centenas de euros num designer. A nossa solução é uma IA generativa que transforma uma descrição em texto num design pronto a imprimir, aplicado em segundos num produto à tua escolha.',
  'A missão é clara: democratizar o design. Queremos que qualquer pessoa — seja para oferecer, para usar ou simplesmente para se expressar — consiga criar algo de que se orgulhe, sem barreiras técnicas nem orçamentos impossíveis.',
];

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'como-escrever-um-bom-prompt',
    title: 'Como escrever um bom prompt para o teu design',
    excerpt:
      'A qualidade do teu design começa no texto que escreves. Descobre as técnicas para descrever a tua ideia de forma clara e obteres resultados que te surpreendem — desde a escolha das palavras certas até à especificação de paletas de cor.',
    date: '2026-04-28',
    readTime: '5 min',
    category: 'Guia',
  },
  {
    slug: '5-estilos-visuais-para-t-shirt',
    title: '5 estilos visuais que funcionam sempre numa t-shirt',
    excerpt:
      'Do minimalismo ao retro, há estilos que simplesmente resultam em produtos impressos. Exploramos os cinco que mais se destacam, com exemplos reais gerados pela nossa IA e dicas para os reproduzires.',
    date: '2026-05-02',
    readTime: '4 min',
    category: 'Inspiração',
  },
  {
    slug: 'por-tras-da-ia',
    title: 'Por trás da IA: como o MeuDesign cria os teus designs',
    excerpt:
      'Uma visão técnica — mas acessível — do modelo de inteligência artificial que transforma palavras em imagens únicas. Que dados usou para aprender? O que é um diffusion model? Respondemos sem jargão.',
    date: '2026-05-06',
    readTime: '7 min',
    category: 'Tecnologia',
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const faq: FaqItem[] = [
  {
    question: 'Quanto tempo demora a receber a minha encomenda?',
    answer:
      'O tempo de produção varia entre 2 e 6 dias úteis consoante o produto. A isso soma-se o envio via CTT (2–4 dias úteis). No total, contas entre 4 e 10 dias úteis desde a encomenda.',
  },
  {
    question: 'Posso trocar ou devolver um produto personalizado?',
    answer:
      'Produtos personalizados não são elegíveis para troca ou devolução por mudança de opinião, uma vez que são produzidos especificamente para ti. Exceção: defeito de fabrico comprovado, caso em que substituímos sem custo.',
  },
  {
    question: 'A qualidade do design gerado é suficiente para impressão?',
    answer:
      'Sim. Os designs são gerados em alta resolução (mínimo 2048×2048 px), adequados para impressão em qualquer produto do catálogo. No modo IA real, usamos o modelo Flux Schnell, otimizado para arte digital print-ready.',
  },
  {
    question: 'O design gerado é meu? Tenho direitos sobre ele?',
    answer:
      'Ao gerares um design no MeuDesign, podes usá-lo livremente para fins pessoais e no produto que encomendas. Não nos reservamos direitos de exclusividade sobre o resultado, mas também não garantimos que outros utilizadores não gerem imagens semelhantes.',
  },
  {
    question: 'Em que materiais são feitos os produtos?',
    answer:
      'As t-shirts e hoodies são 100% algodão orgânico (380 g/m² para hoodies). Os posters são impressos em papel de gramagem premium. As canecas são cerâmica com impressão sublimação. Os detalhes completos estão em cada página de produto.',
  },
  {
    question: 'Que tamanhos estão disponíveis?',
    answer:
      'T-shirts e hoodies: XS a XXL. Posters: A3, A2 e A1. Quadros: 30×30, 40×40, 50×50 e 60×60 cm. Para capas de telemóvel, cobrimos os modelos iPhone 13 a 16 e Samsung Galaxy S22 a S24.',
  },
];

export const shippingPolicy = `
## Tempos de produção

Cada produto é produzido individualmente após a tua encomenda. Os tempos estimados são:

- **T-shirts e Hoodies** — 3–5 dias úteis
- **Posters** — 2–4 dias úteis
- **Canecas** — 3–5 dias úteis
- **Capas de telemóvel** — 3–5 dias úteis
- **Autocolantes** — 2–3 dias úteis
- **Tote bags** — 3–5 dias úteis
- **Quadros decorativos** — 4–6 dias úteis

## Envio

Todas as encomendas são enviadas via CTT com número de rastreio. O prazo de entrega após expedição é de 2 a 4 dias úteis para Portugal continental. Para ilhas e envios internacionais, o prazo é acordado caso a caso.

**Custo de envio:** 3,99 € · Gratuito em encomendas acima de 30 €.

## Política de trocas e devoluções

Dado o caráter personalizado dos produtos, não aceitamos trocas ou devoluções por mudança de opinião ou erro na descrição do prompt. Exceções:

1. **Defeito de fabrico** — contacta-nos até 14 dias após a receção com foto do defeito. Substituímos sem custo adicional.
2. **Erro de envio** (produto errado) — contacta-nos imediatamente. Corrigimos a encomenda sem custo.

Para iniciar qualquer processo, envia email para meudesign@ipag.pt com o número de encomenda e fotos do produto.
`;

export const privacyPolicy = `
## Responsável pelo tratamento

MeuDesign (projeto académico) — IPAG, Lisboa
Contacto: meudesign@ipag.pt

## Dados recolhidos e finalidade

Recolhemos apenas os dados estritamente necessários:

| Dado | Finalidade | Base legal |
|---|---|---|
| Nome e email | Processamento de encomenda | Execução de contrato |
| Morada de entrega | Expedição do produto | Execução de contrato |
| Prompt de design | Geração do design e personalização | Execução de contrato |
| Dados de pagamento | Processamento do pagamento (via gateway seguro) | Execução de contrato |

Não vendemos, alugamos nem partilhamos os teus dados com terceiros para fins comerciais.

## Cookies

Utilizamos apenas cookies técnicos essenciais (sessão, carrinho de compras). Não utilizamos cookies de rastreio ou publicidade.

## Os teus direitos (RGPD)

Tens direito a aceder, corrigir, eliminar, portar e opor-te ao tratamento dos teus dados pessoais. Para exerceres qualquer direito, envia email para meudesign@ipag.pt. Responderemos em até 30 dias.

## Retenção de dados

Os dados de encomenda são conservados por 5 anos (obrigação fiscal). Os prompts de design são eliminados 90 dias após a geração, salvo se o produto estiver em produção ativa.

## Alterações à política

Qualquer alteração relevante a esta política será comunicada por email com 30 dias de antecedência.

*Última atualização: maio de 2026*
`;
