'use client';

import { createContext, useContext, useState, type ReactNode } from 'react';

export type Lang = 'pt' | 'en';

const PT = {
  nav: {
    criar: 'Criar',
    loja: 'Loja',
    sobre: 'Sobre',
    contactos: 'Contactos',
    iniciarSessao: 'Iniciar Sessão',
    cartLabel: (qty: number) => `Carrinho — ${qty} ${qty === 1 ? 'item' : 'itens'}`,
  },
  auth: {
    title: 'Iniciar Sessão',
    email: 'Email',
    password: 'Password',
    enter: 'Entrar',
    createAccount: 'Criar conta',
    forgotPassword: 'Esqueci a password',
    continueGoogle: 'Continuar com Google',
    continueApple: 'Continuar com Apple',
    or: 'ou',
    demoToast: 'Versão de demonstração — o sistema de contas será implementado em breve.',
  },
  generator: {
    subtitle: 'Criador de designs',
    title: 'O teu design,',
    titleAccent: 'em segundos.',
    label01: '01. Descreve o teu design',
    label02: '02. Escolhe o estilo',
    label03: '03. Seleciona o produto',
    placeholder: 'ex: um leão geométrico estilo art déco, tons dourados e azul-marinho',
    beSpecific: 'Sê específico para melhores resultados',
    alreadyInPrompt: 'Já escrevi no prompt',
    other: 'Outro',
    otherPlaceholder: 'ex: cyberpunk, aguarela, pixel art...',
    generate: 'Gerar design',
    generating: 'A gerar...',
    sessionHistory: 'Histórico da sessão',
    preview: 'Pré-visualização',
    describeDesign: 'Descreve o teu design',
    andPress: 'e carrega em',
    addToCart: 'Adicionar ao carrinho',
    regenerate: 'Regenerar',
    download: 'Download',
    retry: 'Tentar novamente',
    errorTitle: 'Algo correu mal',
    production: 'Produção',
    sizes: 'Tamanhos',
    loadingMessages: [
      'A interpretar o teu prompt...',
      'A gerar o conceito visual...',
      'A aplicar o estilo selecionado...',
      'A finalizar o design...',
    ],
    styles: {
      abstrato: 'Abstrato',
      minimalista: 'Minimalista',
      retro: 'Retro',
      futurista: 'Futurista',
      geometrico: 'Geométrico',
      organico: 'Orgânico',
      tipografico: 'Tipográfico',
      ilustrado: 'Ilustrado',
    },
  },
  home: {
    // hero
    heroTagline: 'IA generativa · produtos únicos',
    heroSubtitle: 'Design inteligente, feito por si.',
    heroCta1: 'Criar agora',
    heroCta2: 'Ver produtos',
    heroAiBadge: 'IA gerou ✓',
    heroPromptLabel: 'Prompt',
    heroSamplePrompt: 'mandala geométrica tons violeta e dourado',
    // how it works
    process: 'O processo',
    howItWorksTitle: 'Três passos.',
    howItWorksAccent: 'Design pronto.',
    steps: [
      {
        title: 'Descreves',
        description:
          'Escreves a tua ideia — pode ser simples como "gato astronauta retro" ou elaborada com cores, estilo e referências específicas.',
      },
      {
        title: 'A IA gera',
        description:
          'Em segundos, o modelo de IA interpreta o teu prompt e cria um design único, pronto a aplicar no produto que escolheres.',
      },
      {
        title: 'Receves em casa',
        description:
          'Aprovado o design, tratamos da produção e do envio. Em poucos dias úteis, o produto chega à tua porta.',
      },
    ],
    // live demo
    liveTagline: 'Experimenta agora',
    liveTitle: 'Vê a IA em ação.',
    liveSubtitle: 'Escreve uma ideia e carrega em gerar. Uma geração gratuita, sem conta.',
    livePlaceholder: 'Descreve o teu design...',
    liveGenerating: 'A gerar',
    liveGenerate: 'Gerar',
    liveCanvasIdle: 'O teu design aparece aqui',
    liveScrambledText: 'A interpretar o teu prompt...',
    livePostGenText: 'Gostaste? No criador podes regenerar, escolher estilos e adicionar ao carrinho.',
    livePostGenCta: 'Ir para o criador',
    examplePrompts: [
      'lobo geométrico em tons de azul e prata',
      'sol retro estilo anos 70, tons terra',
      'astronauta flutuando entre plantas tropicais',
      'dragão minimalista traço único, preto e lima',
    ],
    // featured products
    catalog: 'O catálogo',
    featured: 'Produtos em',
    featuredAccent: 'destaque',
    viewAll: 'Ver todos os produtos',
    customize: 'Personalizar',
    // community gallery
    galleryTagline: 'Feitos pela comunidade',
    galleryTitle: 'Designs reais,',
    galleryTitleAccent: 'prompts reais.',
    galleryFootnote: 'Designs gerados pela nossa IA · os prompts são dos utilizadores',
    // blog teaser
    blogTagline: 'Do blogue',
    blogTitle: 'Aprende mais',
    blogTitleAccent: 'sobre design.',
    blogViewAll: 'Ver todos os artigos',
    blogRead: 'Ler',
    blogDateLocale: 'pt-PT',
    // final cta
    ctaTagline: 'Começa agora · gratuito · sem conta',
    ctaGhost: 'Pronto para criar?',
    ctaTitle1: 'Pronto',
    ctaTitle2: 'para ',
    ctaTitle2Accent: 'criar?',
    ctaDescription:
      'Descreve a tua ideia, a IA cria o design e tu recebes o produto em casa. Sem habilidades artísticas necessárias.',
    ctaBtn1: 'Criar o meu design',
    ctaBtn2: 'Explorar a loja',
    marqueeItems: [
      'T-shirts', 'Hoodies', 'Posters', 'Canecas', 'Capas',
      'Autocolantes', 'Tote Bags', 'Quadros', 'IA Generativa', 'Design Único',
    ],
  },
  footer: {
    tagline: 'Design inteligente, feito por si.',
    columns: [
      {
        title: 'Categorias',
        links: [
          { label: 'Vestuário', href: '/loja?categoria=vestuario' },
          { label: 'Decoração', href: '/loja?categoria=decoracao' },
          { label: 'Acessórios', href: '/loja?categoria=acessorios' },
        ],
      },
      {
        title: 'Coleções',
        links: [
          { label: 'T-shirt personalizada', href: '/produto/t-shirt' },
          { label: 'Hoodie personalizada', href: '/produto/hoodie' },
          { label: 'Poster personalizado', href: '/produto/poster' },
          { label: 'Ver tudo', href: '/loja' },
        ],
      },
      {
        title: 'Sobre Nós',
        links: [
          { label: 'A nossa história', href: '/sobre' },
          { label: 'Como funciona', href: '/#como-funciona' },
          { label: 'Galeria', href: '/#galeria' },
        ],
      },
      {
        title: 'Contratos',
        links: [
          { label: 'Entregas e Devoluções', href: '/legal/entregas-devolucoes' },
          { label: 'Política de Privacidade', href: '/legal/privacidade' },
        ],
      },
      {
        title: 'Ajuda',
        links: [
          { label: 'Contactos', href: '/contactos' },
          { label: 'FAQ', href: '/contactos#faq' },
        ],
      },
      {
        title: 'Minha Conta',
        links: [
          { label: 'Carrinho', href: '/carrinho' },
          { label: 'Finalizar compra', href: '/checkout' },
        ],
      },
    ],
    copyright: '© 2026 MeuDesign — Projeto académico · ISAG, Licenciatura em Gestão de Empresas.',
    privacy: 'Privacidade',
    deliveries: 'Entregas',
  },
} as const;

const EN = {
  nav: {
    criar: 'Create',
    loja: 'Shop',
    sobre: 'About',
    contactos: 'Contact',
    iniciarSessao: 'Sign In',
    cartLabel: (qty: number) => `Cart — ${qty} ${qty === 1 ? 'item' : 'items'}`,
  },
  auth: {
    title: 'Sign In',
    email: 'Email',
    password: 'Password',
    enter: 'Sign In',
    createAccount: 'Create account',
    forgotPassword: 'Forgot password',
    continueGoogle: 'Continue with Google',
    continueApple: 'Continue with Apple',
    or: 'or',
    demoToast: 'Demo version — the accounts system will be implemented soon.',
  },
  generator: {
    subtitle: 'Design creator',
    title: 'Your design,',
    titleAccent: 'in seconds.',
    label01: '01. Describe your design',
    label02: '02. Choose a style',
    label03: '03. Select a product',
    placeholder: 'e.g. a geometric lion in art déco style, golden and navy tones',
    beSpecific: 'Be specific for better results',
    alreadyInPrompt: 'Already in prompt',
    other: 'Other',
    otherPlaceholder: 'e.g. cyberpunk, watercolour, pixel art...',
    generate: 'Generate design',
    generating: 'Generating...',
    sessionHistory: 'Session history',
    preview: 'Preview',
    describeDesign: 'Describe your design',
    andPress: 'and press',
    addToCart: 'Add to cart',
    regenerate: 'Regenerate',
    download: 'Download',
    retry: 'Try again',
    errorTitle: 'Something went wrong',
    production: 'Production',
    sizes: 'Sizes',
    loadingMessages: [
      'Interpreting your prompt...',
      'Generating the visual concept...',
      'Applying the selected style...',
      'Finalising the design...',
    ],
    styles: {
      abstrato: 'Abstract',
      minimalista: 'Minimalist',
      retro: 'Retro',
      futurista: 'Futuristic',
      geometrico: 'Geometric',
      organico: 'Organic',
      tipografico: 'Typographic',
      ilustrado: 'Illustrated',
    },
  },
  home: {
    // hero
    heroTagline: 'Generative AI · unique products',
    heroSubtitle: 'Smart design, made by you.',
    heroCta1: 'Create now',
    heroCta2: 'See products',
    heroAiBadge: 'AI generated ✓',
    heroPromptLabel: 'Prompt',
    heroSamplePrompt: 'geometric mandala in violet and gold tones',
    // how it works
    process: 'The process',
    howItWorksTitle: 'Three steps.',
    howItWorksAccent: 'Design ready.',
    steps: [
      {
        title: 'Describe',
        description:
          'Write your idea — it can be as simple as "retro astronaut cat" or detailed with colours, style and specific references.',
      },
      {
        title: 'AI generates',
        description:
          'In seconds, the AI model interprets your prompt and creates a unique design, ready to apply on the product of your choice.',
      },
      {
        title: 'Delivered home',
        description:
          'Once you approve the design, we handle production and shipping. In a few business days, it arrives at your door.',
      },
    ],
    // live demo
    liveTagline: 'Try now',
    liveTitle: 'See AI in action.',
    liveSubtitle: 'Write an idea and press generate. One free generation, no account needed.',
    livePlaceholder: 'Describe your design...',
    liveGenerating: 'Generating',
    liveGenerate: 'Generate',
    liveCanvasIdle: 'Your design appears here',
    liveScrambledText: 'Interpreting your prompt...',
    livePostGenText: 'Like it? In the creator you can regenerate, choose styles and add to cart.',
    livePostGenCta: 'Go to creator',
    examplePrompts: [
      'geometric wolf in blue and silver tones',
      'retro sun style 70s, earthy tones',
      'astronaut floating among tropical plants',
      'minimalist dragon single stroke, black and lime',
    ],
    // featured products
    catalog: 'The catalogue',
    featured: 'Featured',
    featuredAccent: 'products',
    viewAll: 'See all products',
    customize: 'Customize',
    // community gallery
    galleryTagline: 'Made by the community',
    galleryTitle: 'Real designs,',
    galleryTitleAccent: 'real prompts.',
    galleryFootnote: 'Designs generated by our AI · prompts are from users',
    // blog teaser
    blogTagline: 'From the blog',
    blogTitle: 'Learn more',
    blogTitleAccent: 'about design.',
    blogViewAll: 'View all articles',
    blogRead: 'Read',
    blogDateLocale: 'en-GB',
    // final cta
    ctaTagline: 'Start now · free · no account',
    ctaGhost: 'Ready to create?',
    ctaTitle1: 'Ready',
    ctaTitle2: 'to ',
    ctaTitle2Accent: 'create?',
    ctaDescription:
      'Describe your idea, the AI creates the design and you receive the product at home. No artistic skills needed.',
    ctaBtn1: 'Create my design',
    ctaBtn2: 'Explore the shop',
    marqueeItems: [
      'T-shirts', 'Hoodies', 'Posters', 'Mugs', 'Phone Cases',
      'Stickers', 'Tote Bags', 'Wall Art', 'Generative AI', 'Unique Design',
    ],
  },
  footer: {
    tagline: 'Intelligent design, made by you.',
    columns: [
      {
        title: 'Categories',
        links: [
          { label: 'Clothing', href: '/loja?categoria=vestuario' },
          { label: 'Decoration', href: '/loja?categoria=decoracao' },
          { label: 'Accessories', href: '/loja?categoria=acessorios' },
        ],
      },
      {
        title: 'Collections',
        links: [
          { label: 'Custom T-shirt', href: '/produto/t-shirt' },
          { label: 'Custom Hoodie', href: '/produto/hoodie' },
          { label: 'Custom Poster', href: '/produto/poster' },
          { label: 'View all', href: '/loja' },
        ],
      },
      {
        title: 'About Us',
        links: [
          { label: 'Our story', href: '/sobre' },
          { label: 'How it works', href: '/#como-funciona' },
          { label: 'Gallery', href: '/#galeria' },
        ],
      },
      {
        title: 'Legal',
        links: [
          { label: 'Shipping & Returns', href: '/legal/entregas-devolucoes' },
          { label: 'Privacy Policy', href: '/legal/privacidade' },
        ],
      },
      {
        title: 'Help',
        links: [
          { label: 'Contact', href: '/contactos' },
          { label: 'FAQ', href: '/contactos#faq' },
        ],
      },
      {
        title: 'My Account',
        links: [
          { label: 'Cart', href: '/carrinho' },
          { label: 'Checkout', href: '/checkout' },
        ],
      },
    ],
    copyright: '© 2026 MeuDesign — Academic project · ISAG, Business Management Degree.',
    privacy: 'Privacy',
    deliveries: 'Shipping',
  },
} as const;

export type Translations = typeof PT;

const translations = { pt: PT, en: EN } as const;

interface LanguageContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'pt',
  setLang: () => {},
  t: PT,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('pt');
  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] as Translations }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
