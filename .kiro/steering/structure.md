---
inclusion: always
---

# Estrutura do Projeto — Finance App

```
finance-app/
├── app/                              # App Router do Next.js
│   ├── (home)/                       # Rota raiz — dashboard principal
│   │   ├── _components/              # Componentes exclusivos do dashboard
│   │   │   ├── expenses-per-category.tsx   # Breakdown de despesas por categoria
│   │   │   ├── last-transactions.tsx       # Lista das últimas transações
│   │   │   ├── percentage-item.tsx         # Item de percentagem com barra
│   │   │   ├── summary-card.tsx            # Card individual de resumo (saldo, receitas, etc.)
│   │   │   ├── summary-cards.tsx           # Grid de summary cards
│   │   │   ├── time-select.tsx             # Selector de mês para filtro
│   │   │   ├── transactions-pie-chart.tsx  # Gráfico de pizza (Recharts)
│   │   └── page.tsx                  # Página do dashboard
│   │
│   ├── login/
│   │   └── page.tsx                  # Página de autenticação (Clerk)
│   │
│   ├── subscription/
│   │   ├── _actions/
│   │   │   └── create-stripe-checkout/   # Server Action para criar Checkout Session
│   │   ├── _components/
│   │   │   └── acquire-plan-button.tsx   # Botão de upgrade com loading state
│   │   └── page.tsx                  # Página de planos
│   │
│   ├── transactions/
│   │   ├── _columns/
│   │   │   └── index.tsx             # Definição das colunas TanStack Table
│   │   ├── _components/
│   │   │   ├── edit-transaction-button.tsx  # Botão de edição com dialog
│   │   │   └── type-badge.tsx               # Badge colorido por tipo de transação
│   │   └── page.tsx                  # Página de gestão de transações
│   │
│   ├── api/
│   │   └── webhooks/
│   │       └── stripe/               # Webhook handler do Stripe
│   │           └── route.ts
│   │
│   ├── _actions/                     # Server Actions globais
│   │   └── upsert-transaction/
│   │       ├── index.ts              # Action de criar/editar transação
│   │       └── schema.ts             # Schema Zod para validação
│   │
│   ├── _components/                  # Componentes globais reutilizáveis
│   │   ├── ui/                       # Componentes shadcn/ui gerados
│   │   │   ├── alert-dialog.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── button.tsx
│   │   │   ├── calendar.tsx
│   │   │   ├── card.tsx
│   │   │   ├── chart.tsx
│   │   │   ├── data-table.tsx
│   │   │   ├── date-picker.tsx
│   │   │   ├── dialog.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── popover.tsx
│   │   │   ├── progress.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   └── table.tsx
│   │   ├── add-transaction-button.tsx    # Botão flutuante para nova transação
│   │   ├── footer.tsx                    # Rodapé global
│   │   ├── money-input.tsx               # Input formatado para valores monetários
│   │   ├── navbar.tsx                    # Barra de navegação global
│   │   └── upsert-transaction-dialog.tsx # Dialog de criar/editar transação
│   │
│   ├── _constants/
│   │   └── transactions.ts           # Labels e mapas de constantes (tipos, categorias, métodos)
│   │
│   ├── _data/                        # Funções de busca de dados (server-side)
│   │   ├── can-user-add-transaction/ # Verifica limite do plano free
│   │   ├── get-current-month-transactions/  # Transações do mês corrente
│   │   └── get-dashboard/
│   │       ├── index.ts              # Agregações para o dashboard
│   │       └── types.ts              # Tipos de retorno das queries
│   │
│   ├── _lib/
│   │   ├── prisma.ts                 # Instância singleton do Prisma Client
│   │   └── utils.ts                  # cn() e utilitários gerais
│   │
│   ├── _utils/
│   │   └── currency.ts               # Formatação de valores monetários (BRL)
│   │
│   ├── globals.css                   # Variáveis CSS do tema dark + @tailwind directives
│   ├── layout.tsx                    # Layout raiz — ClerkProvider, Mulish, dark mode
│   └── favicon.ico
│
├── prisma/
│   ├── schema.prisma                 # Schema: Transaction + enums
│   └── migrations/                   # Histórico de migrações
│
├── public/                           # Ficheiros estáticos (imagens, screenshots)
│
├── .kiro/
│   └── steering/                     # Regras de steering para o agente
│       ├── general.md
│       ├── product.md
│       ├── tech.md
│       └── structure.md
│
├── .env                              # Variáveis de ambiente (não commitar)
├── .eslintrc.json                    # ESLint — next/core-web-vitals + next/typescript
├── .lintstagedrc.json                # lint-staged — ESLint em staged files
├── .prettierrc                       # Prettier + prettier-plugin-tailwindcss
├── components.json                   # Configuração shadcn/ui
├── docker-compose.yml                # PostgreSQL local para desenvolvimento
├── middleware.ts                     # clerkMiddleware() — proteção de rotas
├── next.config.mjs                   # Configuração Next.js
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tailwind.config.ts                # Tema dark, tokens semânticos, plugins animate + typography
└── tsconfig.json                     # paths: @/* → ./*
```

## Convenções

- **Nomenclatura**: `kebab-case` para pastas e ficheiros
- **Componentes**: PascalCase — ex: `SummaryCard.tsx`, `UpsertTransactionDialog.tsx`
- **Imports**: usar alias `@/` configurado no `tsconfig.json` (aponta para a raiz do projeto)
- **shadcn/ui**: componentes gerados ficam em `app/_components/ui/` — não editar manualmente; regenerar via CLI
- **Colocação**: componentes usados apenas numa rota ficam em `_components/` dentro dessa rota; componentes globais em `app/_components/`
- **Server Actions**: sempre em pasta própria com `index.ts` (action) + `schema.ts` (Zod) separados
- **Queries de dados**: sempre em `_data/` com pasta própria por query — nunca misturar com actions
- **Prisma**: usar a instância singleton de `@/app/_lib/prisma` — nunca instanciar `new PrismaClient()` fora dela
- **Sem novas rotas públicas**: qualquer nova rota deve ser protegida via `clerkMiddleware()` salvo exceção explícita

## Adicionando Funcionalidades

Para adicionar um novo tipo de entidade ou funcionalidade:

1. Atualizar `prisma/schema.prisma` e rodar `npx prisma db push`
2. Criar a query em `app/_data/<nome-da-query>/`
3. Criar a action em `app/_actions/<nome-da-action>/` com `index.ts` + `schema.ts`
4. Criar os componentes em `app/_components/` ou dentro da rota correspondente
5. Registar novos enums/labels em `app/_constants/transactions.ts` (ou ficheiro equivalente)
