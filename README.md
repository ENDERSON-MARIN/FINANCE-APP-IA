# 💰 Finance App

## Descrição do Projeto

O Finance App é uma plataforma web moderna e completa para gestão de finanças pessoais, desenvolvida com foco em desempenho, segurança e uma experiência de usuário intuitiva. O projeto oferece funcionalidades essenciais para controle financeiro, incluindo registro de transações, categorização de despesas e receitas, visualização de dados através de gráficos e um sistema de assinatura premium.

## ✨ Funcionalidades-Chave

**Gestão de Transações**: Sistema completo para registro, edição e exclusão de transações financeiras com suporte a múltiplas categorias e métodos de pagamento.

**Dashboard Analítico**: Visualização de dados financeiros através de gráficos interativos, permitindo análise de receitas, despesas e investimentos de forma clara e objetiva.

**Autenticação Segura**: Sistema de autenticação robusto implementado com Clerk, garantindo segurança e facilidade no acesso à plataforma.

**Sistema de Assinatura**: Integração com Stripe para gerenciamento de planos premium, oferecendo funcionalidades avançadas para usuários assinantes.

**Categorização Inteligente**: Organização de transações por categorias (moradia, transporte, alimentação, entretenimento, saúde, educação, salário e outros).

**Múltiplos Métodos de Pagamento**: Suporte para cartão de crédito, débito, transferência bancária, boleto, dinheiro, PIX e outros.

## 📸 Screenshots

<div style="overflow-x: auto;">
    <table style="width: 100%;">
        <tr>
            <td style="width: 50%;"><img src="./public/screenshots/home.png" alt="Home do Sistema" style="width: 100%; height: auto; object-fit: cover;" /></td>
            <td style="width: 50%;"><img src="./public/screenshots/dashboard.png" alt="Dashboard do Sistema" style="width: 100%; height: auto; object-fit: cover;" /></td>
        </tr>
        <tr>
            <td style="width: 50%;"><img src="./public/screenshots/login.png" alt="Login do Sistema" style="width: 100%; height: auto; object-fit: cover;" /></td>
            <td style="width: 50%;"><img src="./public/screenshots/transacoes.png" alt="Gestão de Transações" style="width: 100%; height: auto; object-fit: cover;" /></td>
        </tr>
        <tr>
            <td style="width: 50%;"><img src="./public/screenshots/assinatura.png" alt="Planos de Assinatura" style="width: 100%; height: auto; object-fit: cover;" /></td>
            <td style="width: 50%;"><img src="./public/screenshots/pagamento.png" alt="Gestão de Pagamentos" style="width: 100%; height: auto; object-fit: cover;" /></td>
        </tr>
    </table>
</div>

## 🚀 Stack Tecnológica

**Frontend**: Interface construída com React 18 e Next.js 14 (App Router), garantindo desempenho otimizado com renderização do lado do servidor (SSR). TypeScript para maior robustez e tipagem de código.

**Design e Componentes**: Design moderno e responsivo utilizando Tailwind CSS para estilização. Componentes UI acessíveis e reutilizáveis implementados com Radix UI e shadcn/ui.

**Gerenciamento de Formulários**: Validação de formulários com React Hook Form e Zod, garantindo dados consistentes e validados.

**Visualização de Dados**: Gráficos interativos e informativos criados com Recharts para análise financeira detalhada.

**Backend e Banco de Dados**: PostgreSQL como banco de dados relacional, gerenciado através do Prisma ORM para queries tipadas e seguras.

**Autenticação**: Clerk para autenticação e gerenciamento de usuários com suporte a múltiplos provedores.

**Pagamentos**: Integração completa com Stripe para processamento de pagamentos e gerenciamento de assinaturas.

## 📊 Modelo de Dados

O sistema trabalha com as seguintes entidades principais:

**Transaction**: Registro de transações financeiras com os seguintes atributos:

- Nome da transação
- Tipo (Depósito, Despesa, Investimento)
- Valor
- Categoria
- Método de pagamento
- Data da transação
- Usuário proprietário

**Categorias Disponíveis**:

- Moradia (HOUSING)
- Transporte (TRANSPORTATION)
- Alimentação (FOOD)
- Entretenimento (ENTERTAINMENT)
- Saúde (HEALTH)
- Utilidades (UTILITY)
- Salário (SALARY)
- Educação (EDUCATION)
- Outros (OTHER)

**Métodos de Pagamento**:

- Cartão de Crédito
- Cartão de Débito
- Transferência Bancária
- Boleto Bancário
- Dinheiro
- PIX
- Outros

## 🛠️ Tecnologias e Ferramentas

- **Next.js 14.2.16** - Framework React com App Router
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript 5** - Superset JavaScript com tipagem estática
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **Prisma 5.22** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Clerk** - Autenticação e gerenciamento de usuários
- **Stripe** - Processamento de pagamentos
- **React Hook Form 7.62** - Gerenciamento de formulários
- **Zod 4.1** - Validação de schemas
- **Recharts 2.15** - Biblioteca de gráficos
- **Radix UI** - Componentes UI acessíveis
- **shadcn/ui** - Componentes UI reutilizáveis
- **TanStack Table 8.20** - Tabelas de dados poderosas
- **date-fns 4.1** - Manipulação de datas
- **Lucide React** - Ícones modernos

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 20.10.0 ou superior)
- **npm** (versão 10.2.3 ou superior)
- **Git**
- **PostgreSQL** (ou Docker para executar localmente)

## 🚀 Começando

### 1. Clone o repositório

```bash
git clone https://github.com/ENDERSON-MARIN/FINANCE-APP.git
cd FINANCE-APP
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Banco de Dados PostgreSQL
# Opção 1: Neon DB Cloud
DATABASE_URL="postgresql://user:password@host/database?sslmode=require"

# Opção 2: Docker Local
DATABASE_URL="postgresql://postgres:password@localhost:5432/finance-ai"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="sua_chave_publica_clerk"
CLERK_SECRET_KEY="sua_chave_secreta_clerk"

# Stripe
NEXT_PUBLIC_APP_URL="http://localhost:3000"
STRIPE_PREMIUM_PLAN_PRICE_ID="seu_price_id_stripe"
STRIPE_SECRET_KEY="sua_chave_secreta_stripe"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="sua_chave_publica_stripe"
STRIPE_WEBHOOK_SECRET="seu_webhook_secret_stripe"
```

### 4. Configure o banco de dados

#### Opção A: Usando Docker (Recomendado para desenvolvimento local)

```bash
docker-compose up -d
```

#### Opção B: PostgreSQL instalado localmente

Certifique-se de que o PostgreSQL está rodando e crie um banco de dados chamado `finance-ai`.

### 5. Execute as migrações do banco de dados

```bash
npx prisma generate
npx prisma db push
```

### 6. (Opcional) Visualize o banco de dados com Prisma Studio

```bash
npx prisma studio
```

Acesse: http://localhost:5555

### 7. Inicie o servidor de desenvolvimento

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📦 Scripts Disponíveis

```bash
npm run dev          # Inicia o servidor de desenvolvimento
npm run build        # Cria a build de produção
npm run start        # Inicia o servidor de produção
npm run lint         # Executa o linter
npm run prepare      # Configura os hooks do Husky
```

## 🔐 Configuração de Serviços Externos

### Clerk (Autenticação)

1. Crie uma conta em [clerk.com](https://clerk.com)
2. Crie uma nova aplicação
3. Copie as chaves de API para o arquivo `.env`
4. Configure os provedores de autenticação desejados

### Stripe (Pagamentos)

1. Crie uma conta em [stripe.com](https://stripe.com)
2. Acesse o Dashboard e obtenha suas chaves de API
3. Crie um produto e um preço para o plano premium
4. Configure o webhook endpoint: `https://seu-dominio.com/api/webhooks/stripe`
5. Copie o secret do webhook para o arquivo `.env`

## 🗂️ Estrutura do Projeto

```
finance-app/
├── app/
│   ├── (home)/              # Página inicial com dashboard
│   ├── login/               # Página de autenticação
│   ├── subscription/        # Gerenciamento de assinaturas
│   ├── transactions/        # Gestão de transações
│   ├── _actions/            # Server Actions
│   ├── _components/         # Componentes globais
│   ├── _constants/          # Constantes da aplicação
│   ├── _data/               # Funções de busca de dados
│   ├── _lib/                # Bibliotecas e utilitários
│   ├── _utils/              # Funções auxiliares
│   └── api/                 # API Routes
├── prisma/
│   ├── schema.prisma        # Schema do banco de dados
│   └── migrations/          # Migrações do banco
├── public/                  # Arquivos estáticos
└── components.json          # Configuração shadcn/ui
```

## 🎨 Funcionalidades Detalhadas

### Dashboard Financeiro

- Visualização de saldo total, receitas e despesas do mês
- Gráficos interativos de análise financeira
- Resumo de transações por categoria
- Indicadores de desempenho financeiro

### Gestão de Transações

- Adicionar, editar e excluir transações
- Filtros por tipo, categoria e período
- Tabela de dados com ordenação e paginação
- Busca e filtros avançados

### Sistema de Assinatura

- Plano gratuito com funcionalidades básicas
- Plano premium com recursos avançados
- Integração completa com Stripe
- Gerenciamento de assinaturas

### Autenticação

- Login seguro com Clerk
- Suporte a múltiplos provedores
- Gerenciamento de perfil de usuário
- Proteção de rotas

## 🔒 Segurança

- Autenticação robusta com Clerk
- Validação de dados com Zod
- Proteção contra SQL Injection via Prisma
- Variáveis de ambiente para dados sensíveis
- HTTPS obrigatório em produção
- Webhooks seguros com validação de assinatura

## 🚀 Deploy

### Vercel (Recomendado)

1. Faça push do código para o GitHub
2. Importe o projeto no Vercel
3. Configure as variáveis de ambiente
4. Deploy automático

### Outras Plataformas

O projeto pode ser deployado em qualquer plataforma que suporte Next.js:

- Netlify
- Railway
- Render
- AWS Amplify

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Padrões de Código

- Utilize TypeScript para todo o código
- Siga os princípios SOLID e Clean Code
- Use kebab-case para nomes de arquivos e pastas
- Componentes reutilizáveis devem estar em `_components`
- Utilize Tailwind CSS para estilização
- Valide formulários com React Hook Form e Zod
- Commits seguindo Conventional Commits

## 🐛 Problemas Conhecidos

Nenhum problema conhecido no momento. Reporte bugs através das [Issues](https://github.com/ENDERSON-MARIN/FINANCE-APP/issues).

## 📚 Recursos Adicionais

- [Documentação Next.js](https://nextjs.org/docs)
- [Documentação Prisma](https://www.prisma.io/docs)
- [Documentação Clerk](https://clerk.com/docs)
- [Documentação Stripe](https://stripe.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

## 👨‍💻 Autor

**Enderson Marín**

- 🎨 Portfolio: [portfolio-ecmm.vercel.app](https://portfolio-ecmm.vercel.app/)
- 📧 Email: marinenderson1@gmail.com
- 💼 LinkedIn: [enderson-millan](https://www.linkedin.com/in/enderson-millan)
- 🐱 GitHub: [@ENDERSON-MARIN](https://github.com/ENDERSON-MARIN)
- 🎥 YouTube: [Canal de Demonstrações](https://www.youtube.com/channel/UCDIIj706aFneZlfVJucVkhA)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - consulte o arquivo [LICENSE.md](LICENSE.md) para obter detalhes.

## ⭐ Agradecimentos

Obrigado por conferir este projeto! Se você achou útil, considere dar uma estrela no repositório.

---

Desenvolvido com 💙 por [Enderson Marín](https://github.com/ENDERSON-MARIN)
