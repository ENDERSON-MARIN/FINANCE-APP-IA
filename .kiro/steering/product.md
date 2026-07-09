---
inclusion: always
---

# Produto: Finance App

Plataforma web moderna de gestão de finanças pessoais. Permite ao utilizador registar, categorizar e analisar as suas transações financeiras através de um dashboard analítico com gráficos interativos. Possui plano premium com funcionalidades avançadas gerido via Stripe.

## Páginas e Funcionalidades

| Rota                   | Descrição                                                          | Acesso      |
| ---------------------- | ------------------------------------------------------------------ | ----------- |
| `/`                    | Dashboard principal — resumo do mês, gráficos e últimas transações | Autenticado |
| `/transactions`        | Tabela completa de transações com filtros, edição e exclusão       | Autenticado |
| `/subscription`        | Página de planos — free vs. premium, botão de upgrade via Stripe   | Autenticado |
| `/login`               | Página de autenticação gerida pelo Clerk                           | Público     |
| `/api/webhooks/stripe` | Endpoint para eventos do Stripe (checkout, subscription updates)   | Interno     |

## Funcionalidades Principais

- **Dashboard analítico** — saldo total, total de depósitos, despesas e investimentos do mês corrente
- **Gráfico de pizza** — distribuição das transações por tipo (Depósito / Despesa / Investimento)
- **Despesas por categoria** — breakdown percentual das despesas por categoria com barra de progresso
- **Últimas transações** — lista das transações mais recentes com badge de tipo e valor formatado
- **Filtro por mês** — selector de mês para navegar entre períodos no dashboard
- **Gestão de transações** — tabela com ordenação, paginação (TanStack Table) e ações de edição/exclusão
- **Dialog de upsert** — formulário único para criar e editar transações (React Hook Form + Zod)
- **Badge de tipo** — indicador visual colorido por tipo de transação
- **Limite de transações** — utilizadores free têm limite mensal; premium têm acesso ilimitado
- **Checkout Stripe** — upgrade para premium via Stripe Checkout Session
- **Autenticação completa** — login, logout e proteção de rotas via Clerk

## Modelo de Dados

### Transaction

| Campo           | Tipo                       | Descrição                    |
| --------------- | -------------------------- | ---------------------------- |
| `id`            | `String` (UUID)            | Identificador único          |
| `name`          | `String`                   | Nome/descrição da transação  |
| `type`          | `TransactionType`          | DEPOSIT, EXPENSE, INVESTMENT |
| `amount`        | `Decimal(10,2)`            | Valor monetário              |
| `category`      | `TransactionCategory`      | Ver categorias abaixo        |
| `paymentMethod` | `TransactionPaymentMethod` | Ver métodos abaixo           |
| `date`          | `DateTime`                 | Data da transação            |
| `userId`        | `String`                   | ID do utilizador Clerk       |
| `createdAt`     | `DateTime`                 | Criação automática           |
| `updatedAt`     | `DateTime`                 | Atualização automática       |

### Categorias (`TransactionCategory`)

`HOUSING` · `TRANSPORTATION` · `FOOD` · `ENTERTAINMENT` · `HEALTH` · `UTILITY` · `SALARY` · `EDUCATION` · `OTHER`

### Métodos de Pagamento (`TransactionPaymentMethod`)

`CREDIT_CARD` · `DEBIT_CARD` · `BANK_TRANSFER` · `BANK_SLIP` · `CASH` · `PIX` · `OTHER`

## Planos

| Plano       | Transações/mês | Acesso ao dashboard | Relatórios avançados |
| ----------- | -------------- | ------------------- | -------------------- |
| **Free**    | Limitado       | ✅                  | ❌                   |
| **Premium** | Ilimitado      | ✅                  | ✅                   |

## Identidade Visual

- **Tema**: Dark mode por padrão — fundo escuro (`background`), cards com leve elevação
- **Cores semânticas**: verde para depósitos/positivo, vermelho (`danger: #F6352E`) para despesas/negativo, branco/cinza para investimentos
- **Fonte**: Mulish — moderna, legível, profissional
- **Tom**: financeiro, claro e direto — dados em destaque, UI não intrusiva
- **Ícones**: Lucide React — consistente com o ecossistema shadcn/ui
