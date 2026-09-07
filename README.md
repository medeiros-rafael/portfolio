# Portfólio — Rafael da Silva Medeiros

Portfólio pessoal de desenvolvedor full stack. Página única, bilíngue (PT/EN),
com tema claro e escuro, animações disparadas por scroll e um visual de IDE.

**Stack:** React 19 · TypeScript · Vite · Tailwind CSS v4 · Motion · oxlint

## Rodando o projeto

```bash
npm install     # instala as dependências
npm run dev     # servidor de desenvolvimento
npm run build   # checagem de tipos + build de produção em dist/
npm run preview # serve o build local
npm run lint    # oxlint
```

## Arquitetura

O projeto segue uma separação MVC adaptada ao React. Componentes genéricos
(botão, campo de texto, seção) ficam separados dos componentes de tela.

```
src/
├── models/          # Dados e tipos — o conteúdo do site vive aqui
│   ├── common.model.ts      # Language, Theme, Localized<T>
│   ├── profile.model.ts     # dados pessoais e canais de contato
│   ├── project.model.ts     # projetos em destaque
│   ├── stack.model.ts       # tecnologias por camada
│   ├── timeline.model.ts    # experiência, formação e certificações
│   └── service.model.ts     # serviços e processo de trabalho
│
├── controllers/     # Estado e comportamento
│   ├── context/     # ThemeContext, I18nContext
│   ├── providers/   # ThemeProvider, I18nProvider, AppProviders
│   └── hooks/       # useTheme, useI18n, useTypewriter, usePointerParallax…
│
├── views/           # Componentes de tela
│   ├── layout/      # Header, Footer, ScrollProgress
│   └── sections/    # Hero, About, Stack, Projects, Timeline, Services, Contact
│       └── parts/   # blocos usados por uma única seção
│
├── components/      # Componentes reutilizáveis, sem regra de negócio
│   ├── ui/          # Button, TextField, CodeBlock, Typewriter, Section…
│   └── icons/       # renderizador de ícones + dados vetoriais
│
├── i18n/            # Dicionários PT/EN (o PT define o formato)
├── lib/             # utilitários: cn, motion, syntax, storage
└── styles/          # globals.css — tokens de design e utilitários Tailwind
```

### Como mudar o conteúdo

Todo o texto do site está em dois lugares:

- `src/i18n/dictionaries/pt.ts` e `en.ts` — títulos, parágrafos e rótulos.
  O dicionário em português é a fonte da verdade: qualquer chave nova nele
  passa a ser obrigatória no inglês, e o TypeScript acusa se faltar.
- `src/models/*.model.ts` — dados estruturados (projetos, stack, timeline).
  Textos que existem nos dois idiomas usam `{ pt: '…', en: '…' }`.

### Tema

As cores são variáveis CSS em `src/styles/globals.css`: `:root` define o tema
claro e `.dark` sobrescreve o escuro. A troca acontece adicionando a classe
`dark` no `<html>`, e a preferência fica salva em `localStorage`. Um script
inline no `index.html` aplica o tema antes da primeira pintura, evitando o
flash branco.

### Animações

Todas as animações respeitam `prefers-reduced-motion`. O hook
`usePrefersReducedMotion` desliga parallax, typewriter e marquee para quem
pediu menos movimento no sistema operacional.

## Antes de publicar

1. Em `index.html`, troque `https://SEU-DOMINIO.com.br/` pelo domínio final
   nas tags `canonical`, `og:url`, `og:image` e `twitter:image`.
2. Confira se `public/rafael-medeiros-cv.pdf` está com a versão atual do CV.

## Ícones

Os ícones em `src/components/icons/icons.data.ts` são derivados do
[Lucide](https://lucide.dev) (licença ISC). Apenas os usados pelo site foram
incluídos, o que evita uma dependência de dezenas de megabytes.
