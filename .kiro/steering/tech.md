---
inclusion: always
---

# Stack Tecnológica — Finance App

Stack completa full-stack com Next.js App Router, banco de dados relacional, autenticação e pagamentos.

## Frontend

- **Next.js 16.2** (App Router) + **TypeScript 5** — framework React com SSR e Server Actions
- **React 19.2** — biblioteca de UI
- **Tailwind CSS 3.4** — utilitários de estilo com tema dark via CSS variables
- `next/font` com **Mulish** — fonte carregada via Google Fonts otimizado (subset `latin-ext`)
- **shadcn/ui** + **Radix UI** — componentes UI acessíveis (gerados em `app/_components/ui/`)
- **Lucide React 1.x** — ícones SVG consistentes com o ecossistema shadcn/ui
- **Recharts 3.9** — gráficos interativos (pizza chart, barras)
- **TanStack Table 8.21** — tabela de dados com ordenação e paginação
- **class-variance-authority** + **clsx** + **tailwind-merge 3.x** — composição de classes Tailwind
- **tailwindcss-animate** — animações via Tailwind
- **date-fns 4.4** — manipulação e formatação de datas

## Backend / Dados

- **PostgreSQL** — banco de dados relacional
  - Produção: **Neon DB** (serverless PostgreSQL cloud)
  - Desenvolvimento local: **Docker** via `docker-compose.yml`
- **Prisma 6.19** — ORM com tipagem gerada automaticamente; schema em `prisma/schema.prisma`
- **Server Actions** (Next.js) — mutações de dados sem API REST separada
- **API Routes** — apenas para webhooks externos (Stripe)

## Autenticação

- **Clerk (`@clerk/nextjs` v7)** — autenticação completa, gestão de utilizadores e sessões
- **`clerkMiddleware()`** em `middleware.ts` — protege todas as rotas por padrão
- `userId` do Clerk é a foreign key de todas as entidades do utilizador no banco
- `clerkClient()` é **async** — sempre usar `const clerk = await clerkClient()` antes de `.users.*`

## Pagamentos

- **Stripe** — processamento de pagamentos e gestão de subscrições premium
- **`stripe` SDK v22** (server-side) + **`@stripe/stripe-js` v9** (client-side)
- API version activa: **`2026-06-24.dahlia`** — usar esta string em todas as instâncias `new Stripe()`
- Webhook em `/api/webhooks/stripe` para eventos de checkout e subscrição
- **`redirectToCheckout` removido** no `@stripe/stripe-js` v9 — usar `window.location.href = session.url`

## Formulários e Validação

- **React Hook Form 7.81** — gestão de estado de formulários performática
- **`@hookform/resolvers`** — integração React Hook Form ↔ Zod
- **Zod 4.4** — validação de schemas no cliente e servidor
- **`react-number-format` 5.4 / `react-day-picker` 10.x** — inputs especializados (monetário, data)
- `initialFocus` **removido** no react-day-picker v10 — usar `autoFocus`

## Gerenciador de Pacotes

- **pnpm 10.12** — padrão do projeto; `pnpm-lock.yaml` versionado; `"packageManager": "pnpm@10.12.4"` no `package.json`
- Não usar `npm` ou `yarn` neste projeto

## Comandos

| Comando                     | Ação                                       |
| --------------------------- | ------------------------------------------ |
| `pnpm dev`                  | Servidor de desenvolvimento Next.js        |
| `pnpm build`                | Build de produção                          |
| `pnpm start`                | Serve o build de produção                  |
| `pnpm lint`                 | ESLint com regras Next.js                  |
| `pnpm exec prisma db push`  | Aplica alterações do schema ao banco       |
| `pnpm exec prisma generate` | Regenera o Prisma Client                   |
| `pnpm exec prisma studio`   | Interface visual do banco (localhost:5555) |
| `pnpm exec tsc --noEmit`    | Verifica erros de TypeScript               |

## Qualidade de Código

- **ESLint** — `next/core-web-vitals` + `next/typescript`
- **Prettier** — formatação automática com `prettier-plugin-tailwindcss` (ordena classes)
- **Husky** — hooks de git (`pre-commit`, `commit-msg`)
- **lint-staged** — ESLint apenas em ficheiros staged
- **git-commit-msg-linter** — enforça Conventional Commits

## Variáveis de Ambiente

| Variável                             | Uso                                    | Exposta ao cliente |
| ------------------------------------ | -------------------------------------- | ------------------ |
| `DATABASE_URL`                       | Conexão PostgreSQL (Neon ou Docker)    | ❌                 |
| `NEXT_PUBLIC_APP_URL`                | URL base da app (callbacks Stripe)     | ✅                 |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`  | Clerk — chave pública                  | ✅                 |
| `CLERK_SECRET_KEY`                   | Clerk — chave secreta                  | ❌                 |
| `STRIPE_PREMIUM_PLAN_PRICE_ID`       | ID do price do plano premium no Stripe | ❌                 |
| `STRIPE_SECRET_KEY`                  | Stripe — chave secreta                 | ❌                 |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe — chave pública                 | ✅                 |
| `STRIPE_WEBHOOK_SECRET`              | Secret para validar webhooks do Stripe | ❌                 |

## O que NÃO usar neste projeto

- ❌ `npm` ou `yarn` — usar apenas `pnpm`
- ❌ CSS Modules / styled-components / CSS inline em JS
- ❌ `new PrismaClient()` fora de `app/_lib/prisma.ts` — usar sempre o singleton
- ❌ Instanciar Stripe no cliente — SDK do Stripe server-side só em Server Actions / API Routes
- ❌ Expor `CLERK_SECRET_KEY` ou `STRIPE_SECRET_KEY` em variáveis `NEXT_PUBLIC_`
- ❌ `stripe.redirectToCheckout()` — removido no v9; usar `window.location.href = session.url`
- ❌ `clerkClient().users.*` sem await — `clerkClient()` é async desde v7
- ❌ Componentes adicionais de terceiros sem justificativa — shadcn/ui cobre a maioria dos casos
