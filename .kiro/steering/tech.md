---
inclusion: always
---

# Stack Tecnológica — Finance App

Stack completa full-stack com Next.js App Router, banco de dados relacional, autenticação e pagamentos.

## Frontend

- **Next.js 14.2.16** (App Router) + **TypeScript 5** — framework React com SSR e Server Actions
- **React 18** — biblioteca de UI
- **Tailwind CSS 3.4** — utilitários de estilo com tema dark via CSS variables
- `next/font` com **Mulish** — fonte carregada via Google Fonts otimizado (subset `latin-ext`)
- **shadcn/ui** + **Radix UI** — componentes UI acessíveis (gerados em `app/_components/ui/`)
- **Lucide React** — ícones SVG consistentes com o ecossistema shadcn/ui
- **Recharts 2.15** — gráficos interativos (pizza chart, barras)
- **TanStack Table 8.20** — tabela de dados com ordenação e paginação
- **class-variance-authority** + **clsx** + **tailwind-merge** — composição de classes Tailwind
- **tailwindcss-animate** — animações via Tailwind
- **date-fns 4.1** — manipulação e formatação de datas

## Backend / Dados

- **PostgreSQL** — banco de dados relacional
  - Produção: **Neon DB** (serverless PostgreSQL cloud)
  - Desenvolvimento local: **Docker** via `docker-compose.yml`
- **Prisma 5.22** — ORM com tipagem gerada automaticamente; schema em `prisma/schema.prisma`
- **Server Actions** (Next.js) — mutações de dados sem API REST separada
- **API Routes** — apenas para webhooks externos (Stripe)

## Autenticação

- **Clerk (`@clerk/nextjs` v5)** — autenticação completa, gestão de utilizadores e sessões
- **`clerkMiddleware()`** em `middleware.ts` — protege todas as rotas por padrão
- `userId` do Clerk é a foreign key de todas as entidades do utilizador no banco

## Pagamentos

- **Stripe** — processamento de pagamentos e gestão de subscrições premium
- **`stripe` SDK** (server-side) + **`@stripe/stripe-js`** (client-side)
- Webhook em `/api/webhooks/stripe` para eventos de checkout e subscrição

## Formulários e Validação

- **React Hook Form 7.62** — gestão de estado de formulários performática
- **`@hookform/resolvers`** — integração React Hook Form ↔ Zod
- **Zod 4.1** — validação de schemas no cliente e servidor
- **`react-number-format` / `react-day-picker`** — inputs especializados (monetário, data)

## Gerenciador de Pacotes

- **npm** — padrão do projeto; `package-lock.json` versionado
- Não usar `pnpm` ou `yarn` neste projeto

## Comandos

| Comando               | Ação                                              |
| --------------------- | ------------------------------------------------- |
| `npm run dev`         | Servidor de desenvolvimento Next.js               |
| `npm run build`       | Build de produção                                 |
| `npm run start`       | Serve o build de produção                         |
| `npm run lint`        | ESLint com regras Next.js                         |
| `npx prisma db push`  | Aplica alterações do schema ao banco sem migração |
| `npx prisma generate` | Regenera o Prisma Client após mudanças no schema  |
| `npx prisma studio`   | Interface visual do banco (localhost:5555)        |
| `npx tsc --noEmit`    | Verifica erros de TypeScript sem compilar         |

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

- ❌ `pnpm` ou `yarn` — usar apenas `npm`
- ❌ CSS Modules / styled-components / CSS inline em JS
- ❌ `new PrismaClient()` fora de `app/_lib/prisma.ts` — usar sempre o singleton
- ❌ Instanciar Stripe no cliente — SDK do Stripe server-side só em Server Actions / API Routes
- ❌ Expor `CLERK_SECRET_KEY` ou `STRIPE_SECRET_KEY` em variáveis `NEXT_PUBLIC_`
- ❌ Componentes adicionais de terceiros sem justificativa — shadcn/ui cobre a maioria dos casos
