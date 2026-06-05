# Vizinhança Digital

> Plataforma web concebida para apoiar a gestão estratégica de comunidades e iniciativas de caráter social. A solução foi desenvolvida com o propósito de centralizar e integrar, em um ambiente digital unificado, os processos de cadastramento de participantes, planejamento e agendamento de atividades, bem como a administração de projetos comunitários. Dessa forma, busca-se promover maior eficiência operacional, organização das informações, transparência na gestão e fortalecimento da colaboração entre os diversos atores envolvidos nas ações sociais.
---

## Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Problemas que o Sistema Resolve](#problemas-que-o-sistema-resolve)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura do Sistema](#arquitetura-do-sistema)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Banco de Dados](#banco-de-dados)
- [Endpoints da API](#endpoints-da-api)
- [Funcionalidades em Detalhe](#funcionalidades-em-detalhe)
- [Fluxo Completo do Usuário](#fluxo-completo-do-usuário)
- [User Stories](#user-stories)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Padrões de Código](#padrões-de-código)
- [Impacto Esperado](#impacto-esperado)

---

## Sobre o Projeto

O **Vizinhança Digital** nasce da necessidade real de organizar e fortalecer iniciativas comunitárias que, historicamente, sofrem com a falta de ferramentas adequadas para comunicação, gestão e rastreabilidade.

Hoje, líderes comunitários dependem de grupos de WhatsApp, posts no Facebook, cartazes em postes e comunicação boca a boca para divulgar ações. Voluntários interessados em participar não têm um canal centralizado para encontrar eventos, se inscrever ou acompanhar suas participações. Não há histórico, não há métricas, não há transparência sobre o impacto real das iniciativas.

### O sistema resolve esses problemas oferecendo:

- **Líderes comunitários** cadastram, gerenciam e acompanham ações de forma estruturada e profissional
- **Voluntários** descobrem oportunidades, se inscrevem e gerenciam sua participação com poucos cliques
- **Relatórios automáticos** mostram o impacto real das iniciativas em gráficos e tabelas
- Tudo acontece de forma **segura, rastreável e acessível** de qualquer dispositivo com navegador

---

## Problemas que o Sistema Resolve

### 1. Fragmentação das informações

**Problema:** As informações sobre eventos comunitários estão dispersas em múltiplos canais — grupos de WhatsApp, páginas do Facebook, Instagram, cartazes físicos e boca a boca. Cada líder usa um canal diferente, tornando impossível para o voluntário ter uma visão unificada das oportunidades disponíveis. Iniciativas relevantes passam despercebidas por falta de visibilidade centralizada.

**Solução:** O sistema centraliza 100% das informações em um único ambiente digital acessível via navegador. Qualquer ação cadastrada por qualquer líder fica imediatamente disponível para todos os voluntários, com detalhes completos, datas, localização e opção de inscrição direta.

---

### 2. Dificuldade na organização de eventos

**Problema:** Líderes comunitários geralmente não têm formação em gestão de eventos nem acesso a ferramentas profissionais. Planilhas do Excel, cadernos físicos e memória são os recursos mais comuns — o que resulta em duplicidade de inscrições, perda de dados e impossibilidade de comunicar alterações de última hora.

**Solução:** O sistema oferece ferramentas estruturadas e intuitivas: formulário de cadastro de ações com todos os campos necessários (título, descrição, data, local, prioridade, categoria, limite de vagas), painel de gestão de inscrições em tempo real, contador automático de vagas e histórico completo de todas as ações.

---

### 3. Baixa adesão de voluntários

**Problema:** Mesmo quando as informações chegam ao voluntário, o processo de confirmação de participação é trabalhoso — enviar mensagem no WhatsApp, esperar resposta, confirmar no dia do evento. Esse atrito desestimula a participação, especialmente de pessoas mais jovens habituadas à praticidade digital.

**Solução:** O processo de inscrição é reduzido a um clique. O voluntário recebe confirmação imediata, pode cancelar ou editar sua inscrição quando quiser, e tem acesso ao histórico completo de suas participações.

---

### 4. Falta de rastreabilidade

**Problema:** Após a realização de um evento, não há registro formal de quem participou, o que foi feito, quais recursos foram necessários e qual foi o impacto gerado. Isso impede o aprendizado organizacional e dificulta a prestação de contas para parceiros, patrocinadores ou órgãos públicos.

**Solução:** O sistema mantém histórico completo e imutável de todas as ações realizadas, com lista de inscritos, status de participação e dados exportáveis. Cada ação fica permanentemente registrada com data, responsável, categoria e métricas de engajamento.

---

### 5. Carência de relatórios e métricas

**Problema:** Líderes comunitários não conseguem quantificar o impacto do seu trabalho. Perguntas simples como "quantas pessoas participaram das nossas ações este ano?" ou "qual categoria de ação gera mais engajamento?" ficam sem resposta por falta de dados organizados.

**Solução:** O módulo de relatórios gera automaticamente estatísticas consolidadas — número de inscritos por ação, taxa de ocupação de vagas, ações por categoria, engajamento ao longo do tempo e comparativos entre períodos. Gráficos e tabelas tornam os dados acessíveis mesmo para quem não tem experiência com análise de dados.

---

## Stack Tecnológica

### Frontend

| Tecnologia | Versão | Finalidade |
|---|---|---|
| React | 18 | Framework principal de UI |
| Vite | — | Build tool e servidor de desenvolvimento |
| JavaScript (JSX) | — | Linguagem de programação |
| CSS Modules + global.css | — | Estilização modular e variáveis globais |
| Axios | — | Cliente HTTP para consumo da API |
| React Router DOM | v6 | Roteamento entre páginas |
| Recharts | — | Gráficos nos relatórios gerenciais |
| FullCalendar / react-big-calendar | — | Visualização do calendário de ações |
| React Toastify | — | Notificações e feedback visual ao usuário |
| JWT (localStorage) | — | Armazenamento e gestão do token de autenticação |

### Backend

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Node.js | 18+ | Runtime de execução JavaScript no servidor |
| Express.js | — | Framework web para criação da API REST |
| JSON Web Token (JWT) | — | Geração e verificação de tokens de autenticação |
| bcrypt | — | Criptografia segura de senhas |
| express-validator | — | Validação e sanitização de dados das requisições |
| cors | — | Controle de acesso entre origens diferentes |
| dotenv | — | Carregamento de variáveis de ambiente do arquivo `.env` |
| nodemon | — | Reinício automático do servidor durante o desenvolvimento |

### Banco de Dados

| Tecnologia | Versão | Finalidade |
|---|---|---|
| PostgreSQL | 15+ | Banco de dados relacional principal |
| Prisma ORM | — | Mapeamento objeto-relacional e queries tipadas |
| Prisma Migrate | — | Controle e versionamento das migrações do banco |
| Prisma Studio | — | Interface visual para inspecionar dados localmente |

### Infraestrutura e Ferramentas

| Ferramenta | Finalidade |
|---|---|
| Git + GitHub | Versionamento de código e colaboração |
| npm | Gerenciador de pacotes |
| `.env` | Isolamento de variáveis sensíveis por ambiente |
| nodemon | Hot reload do backend em desenvolvimento |
| Vite HMR | Hot Module Replacement do frontend em desenvolvimento |

---

## Arquitetura do Sistema

O sistema segue a **arquitetura de três camadas (Three-Tier Architecture)**, separando claramente as responsabilidades de cada parte:

```
┌─────────────────────────────────────────────────────────┐
│         Camada 1 — Apresentação (Frontend React)         │
│   Interface do usuário. Roda no navegador do cliente.    │
│   Consome a API REST via Axios.                          │
└──────────────────────────┬──────────────────────────────┘
                           │ HTTP / REST
┌──────────────────────────▼──────────────────────────────┐
│      Camada 2 — Lógica de Negócio (Node.js + Express)   │
│   Regras de negócio, autenticação JWT, validações.       │
│   Expõe endpoints REST para o frontend.                  │
└──────────────────────────┬──────────────────────────────┘
                           │ Prisma ORM
┌──────────────────────────▼──────────────────────────────┐
│       Camada 3 — Persistência (PostgreSQL + Prisma)      │
│   Armazenamento permanente dos dados.                    │
│   Prisma traduz operações JS em queries SQL.             │
└─────────────────────────────────────────────────────────┘
```

**Fluxo completo de uma requisição:**

```
Usuário (browser)
      │
      ▼
React (frontend)  ──Axios──▶  Express API (backend)  ──Prisma──▶  PostgreSQL
                                                      ◀──────────  ◀─────────
```

---

## Estrutura de Pastas

```
vizinhanca-digital/
│
├── frontend/                             # Aplicação React 18 + Vite
│   ├── public/                           # Arquivos estáticos públicos
│   │   ├── favicon.ico
│   │   └── logo.png
│   │
│   └── src/                             # Código-fonte da aplicação
│       ├── components/                  # Componentes reutilizáveis em toda a aplicação
│       │   ├── Navbar.jsx               # Barra de navegação principal
│       │   ├── Layout.jsx               # Layout base com Navbar + área de conteúdo
│       │   ├── AcaoCard.jsx             # Card resumido de exibição de uma ação
│       │   ├── RelatorioCard.jsx        # Card de métricas para a página de relatórios
│       │   ├── BarraProgresso.jsx       # Barra visual de ocupação de vagas
│       │   ├── ModalDetalhes.jsx        # Modal com detalhes rápidos de uma ação
│       │   ├── ConfirmacaoModal.jsx     # Modal de confirmação genérico (ex: cancelar inscrição)
│       │   ├── FiltroAcoes.jsx          # Componente de filtros por categoria, data e prioridade
│       │   ├── Spinner.jsx              # Indicador de carregamento
│       │   └── RotaPrivada.jsx          # HOC que protege rotas que exigem autenticação
│       │
│       ├── pages/                       # Páginas principais da aplicação
│       │   ├── Home.jsx                 # Lista pública de ações com filtros e busca
│       │   ├── Login.jsx                # Tela de login
│       │   ├── CadastroUsuario.jsx      # Tela de criação de nova conta
│       │   ├── RecuperarSenha.jsx       # Formulário de recuperação de senha
│       │   ├── RedefinirSenha.jsx       # Redefinição de senha via link recebido por e-mail
│       │   ├── Perfil.jsx               # Configurações da conta e histórico de inscrições
│       │   ├── Actions.jsx              # Gerenciamento das ações criadas pelo líder
│       │   ├── ActionDetail.jsx         # Página de detalhes completos de uma ação
│       │   ├── CadastroAcoes.jsx        # Formulário de cadastro e edição de ação
│       │   ├── InscricaoVoluntario.jsx  # Confirmação e processamento da inscrição
│       │   ├── PainelInscricoes.jsx     # Painel de inscritos por ação (exclusivo para líderes)
│       │   ├── Calendario.jsx           # Calendário visual de ações
│       │   ├── RelatoriosAcoes.jsx      # Dashboard de relatórios gerenciais
│       │   └── NaoEncontrado.jsx        # Página de erro 404
│       │
│       ├── services/                    # Camada de comunicação com a API
│       │   ├── api.js                   # Instância configurada do Axios com interceptors
│       │   ├── authService.js           # Login, registro e gerenciamento do token JWT
│       │   ├── acaoService.js           # CRUD completo de ações comunitárias
│       │   ├── inscricaoService.js      # Inscrição, edição e cancelamento
│       │   ├── calendarioService.js     # Busca de ações por período
│       │   ├── relatorioService.js      # Busca de dados para os relatórios
│       │   └── usuarioService.js        # Perfil, senha e dados do usuário
│       │
│       ├── hooks/                       # Custom Hooks React
│       │   ├── useAuth.js               # Hook de autenticação e controle de sessão
│       │   ├── useAcoes.js              # Hook para busca e cache de ações
│       │   └── useInscricoes.js         # Hook para gerenciar estado das inscrições
│       │
│       ├── context/                     # Context API para estado global
│       │   └── AuthContext.jsx          # Contexto global de autenticação do usuário
│       │
│       ├── styles/                      # Arquivos CSS da aplicação
│       │   ├── global.css               # Reset CSS e variáveis globais de design
│       │   ├── navbar.css               # Estilos da barra de navegação
│       │   ├── home.css                 # Estilos da página inicial
│       │   ├── login.css                # Estilos da tela de login
│       │   ├── actions.css              # Estilos da listagem de ações
│       │   ├── cadastro-acoes.css       # Estilos do formulário de cadastro
│       │   ├── calendario.css           # Estilos do calendário
│       │   ├── relatorios.css           # Estilos dos gráficos e relatórios
│       │   ├── painel.css               # Estilos do painel de inscrições
│       │   └── perfil.css               # Estilos da página de perfil
│       │
│       ├── utils/                       # Funções utilitárias do frontend
│       │   ├── formatDate.js            # Formatação de datas para exibição
│       │   ├── validators.js            # Validações de formulário no lado do cliente
│       │   └── constants.js             # Constantes da aplicação (categorias, prioridades, etc.)
│       │
│       ├── App.jsx                      # Componente raiz com definição de todas as rotas
│       └── main.jsx                     # Ponto de entrada da aplicação React
│
└── backend/                             # API REST Node.js + Express
    ├── prisma/                          # Configuração do ORM Prisma
    │   ├── schema.prisma                # Definição dos modelos e relacionamentos do banco
    │   └── migrations/                  # Histórico versionado das migrações do banco
    │       ├── 20240101_init/
    │       ├── 20240102_add_category/
    │       └── 20240103_add_slots/
    │
    └── src/                             # Código-fonte do backend
        ├── config/
        │   └── prisma.js                # Instância singleton do PrismaClient
        │
        ├── controllers/                 # Controladores: recebem a requisição e retornam a resposta
        │   ├── authController.js        # Login, registro e logout
        │   ├── usuarioController.js     # Perfil, senha e dados do usuário
        │   ├── acaoController.js        # CRUD de ações comunitárias
        │   ├── inscricaoController.js   # Criação, edição e cancelamento de inscrições
        │   ├── calendarioController.js  # Ações filtradas por data e período
        │   ├── relatorioController.js   # Geração de estatísticas e métricas
        │   └── dashboardController.js   # Dados consolidados para o painel do líder
        │
        ├── middlewares/                 # Middlewares Express executados antes dos controllers
        │   ├── authMiddleware.js        # Verifica e decodifica o token JWT
        │   ├── adminMiddleware.js       # Verifica se o usuário possui perfil LEADER
        │   ├── errorMiddleware.js       # Tratamento centralizado e padronizado de erros
        │   └── validationMiddleware.js  # Executa as validações do express-validator
        │
        ├── routes/                      # Definição das rotas da API
        │   ├── authRoutes.js            # /login, /register, /forgot-password
        │   ├── usuarioRoutes.js         # /users, /users/:id
        │   ├── acaoRoutes.js            # /actions, /actions/:id
        │   ├── inscricaoRoutes.js       # /registrations, /registrations/:id
        │   ├── calendarioRoutes.js      # /calendar?start=&end=
        │   ├── relatorioRoutes.js       # /reports/actions, /reports/summary
        │   └── dashboardRoutes.js       # /dashboard
        │
        ├── services/                    # Regras de negócio da aplicação
        │   ├── authService.js           # Lógica de autenticação e geração de JWT
        │   ├── usuarioService.js        # Lógica de gerenciamento de usuários
        │   ├── acaoService.js           # Lógica das ações comunitárias
        │   ├── inscricaoService.js      # Lógica de inscrições e controle de vagas
        │   ├── calendarioService.js     # Lógica de consulta de ações por data
        │   ├── relatorioService.js      # Lógica de geração de relatórios e métricas
        │   ├── dashboardService.js      # Lógica de dados consolidados do painel
        │   └── emailService.js          # Envio de e-mails para recuperação de senha
        │
        ├── utils/                       # Funções utilitárias do backend
        │   ├── validators.js            # Schemas de validação dos endpoints
        │   ├── formatDate.js            # Formatação e manipulação de datas
        │   ├── responseHandler.js       # Padrão de resposta JSON da API
        │   ├── jwtHelper.js             # Geração e verificação de tokens JWT
        │   └── hashHelper.js            # Hash e comparação de senhas com bcrypt
        │
        ├── app.js                       # Configuração principal do Express (middlewares e rotas)
        └── server.js                    # Ponto de entrada: inicializa o servidor HTTP
```

---

## Como Rodar Localmente

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:

| Ferramenta | Versão mínima | Link |
|---|---|---|
| Node.js | 18+ | https://nodejs.org |
| npm | 9+ | Incluído com Node.js |
| PostgreSQL | 14+ | https://www.postgresql.org |
| Git | qualquer | https://git-scm.com |

Para verificar as versões instaladas:

```bash
node --version
npm --version
psql --version
```

---

### 1. Clonar o repositório

```bash
git clone https://github.com/seu-usuario/vizinhanca-digital.git
cd vizinhanca-digital
```

---

### 2. Configurar o Backend

**Passo 1** — Entre na pasta do backend:

```bash
cd backend
```

**Passo 2** — Instale as dependências:

```bash
npm install
```

**Passo 3** — Crie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

**Passo 4** — Edite o arquivo `.env` com suas configurações locais (veja a seção [Variáveis de Ambiente](#-variáveis-de-ambiente) para detalhes de cada campo):

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/vizinhanca_digital"
JWT_SECRET="sua_chave_secreta_muito_segura_aqui"
JWT_EXPIRES_IN="7d"
PORT=3001
NODE_ENV=development
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT=587
EMAIL_USER="seu@email.com"
EMAIL_PASS="sua_senha_de_app"
FRONTEND_URL="http://localhost:5173"
```

**Passo 5** — Crie o banco de dados no PostgreSQL:

```bash
psql -U postgres -c "CREATE DATABASE vizinhanca_digital;"
```

**Passo 6** — Execute as migrações para criar as tabelas:

```bash
npx prisma migrate dev --name init
```

**Passo 7** — *(Opcional)* Popule o banco com dados de exemplo:

```bash
npx prisma db seed
```

**Passo 8** — Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O backend estará disponível em: `http://localhost:3001`  
Health check: `GET http://localhost:3001/health`

---

### 3. Configurar o Frontend

Em um **novo terminal**, execute:

**Passo 1** — Entre na pasta do frontend:

```bash
cd frontend
```

**Passo 2** — Instale as dependências:

```bash
npm install
```

**Passo 3** — Crie o arquivo de variáveis de ambiente:

```bash
cp .env.example .env
```

**Passo 4** — Edite o `.env`:

```env
VITE_API_URL=http://localhost:3001
VITE_APP_NAME="Vizinhança Digital"
```

**Passo 5** — Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

---

### 4. Prisma Studio (opcional)

Para inspecionar visualmente os dados do banco de dados através de uma interface gráfica:

```bash
cd backend
npx prisma studio
```

Acesse em: `http://localhost:5555`

---

## Banco de Dados

O schema do banco é gerenciado pelo Prisma e composto por três modelos principais:

### Model User (Usuário)

Representa todos os usuários do sistema, podendo ser líderes comunitários ou voluntários.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Int (PK) | Identificador único auto-incremento |
| `name` | String | Nome completo do usuário |
| `email` | String (unique) | E-mail único utilizado no login |
| `password` | String | Senha criptografada com bcrypt (nunca armazenada em texto puro) |
| `role` | Enum | `LEADER` (líder comunitário) ou `VOLUNTEER` (voluntário) |
| `createdAt` | DateTime | Data e hora de criação da conta |
| `updatedAt` | DateTime | Data e hora da última atualização |
| `resetToken` | String? | Token temporário para recuperação de senha (nullable) |
| `resetTokenExp` | DateTime? | Data de expiração do token de recuperação (nullable) |
| `actions` | Action[] | Ações criadas por este líder (relação 1:N) |
| `registrations` | Registration[] | Inscrições deste voluntário (relação 1:N) |

---

### Model Action (Ação Comunitária)

Representa cada ação ou evento comunitário cadastrado por um líder.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Int (PK) | Identificador único auto-incremento |
| `title` | String | Título da ação comunitária |
| `description` | String | Descrição detalhada da ação |
| `date` | DateTime | Data e hora de realização do evento |
| `location` | String | Endereço ou local de realização |
| `priority` | Enum | `HIGH` (alta), `MEDIUM` (média) ou `LOW` (baixa) |
| `category` | Enum | `SAUDE`, `EDUCACAO`, `MEIO_AMBIENTE`, `SEGURANCA`, `CULTURA` ou `OUTROS` |
| `slots` | Int | Número máximo de vagas disponíveis |
| `createdAt` | DateTime | Data de criação do registro |
| `updatedAt` | DateTime | Data da última atualização |
| `createdById` | Int (FK) | ID do líder responsável pela ação |
| `createdBy` | User | Relação com o usuário criador |
| `registrations` | Registration[] | Inscrições nesta ação (relação 1:N) |

---

### Model Registration (Inscrição)

Representa a inscrição de um voluntário em uma ação comunitária.

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | Int (PK) | Identificador único auto-incremento |
| `userId` | Int (FK) | ID do voluntário inscrito |
| `actionId` | Int (FK) | ID da ação em que se inscreveu |
| `status` | Enum | `ACTIVE` (inscrição ativa) ou `CANCELLED` (cancelada) |
| `createdAt` | DateTime | Data e hora da inscrição |
| `updatedAt` | DateTime | Data da última atualização |
| `user` | User | Relação com o voluntário |
| `action` | Action | Relação com a ação |

---

### Enums

| Enum | Valores |
|---|---|
| `Role` | `LEADER` \| `VOLUNTEER` |
| `Priority` | `HIGH` \| `MEDIUM` \| `LOW` |
| `Category` | `SAUDE` \| `EDUCACAO` \| `MEIO_AMBIENTE` \| `SEGURANCA` \| `CULTURA` \| `OUTROS` |
| `Status` | `ACTIVE` \| `CANCELLED` |

---

## Endpoints da API

**BASE URL:** `http://localhost:3001`

> **Legenda de acesso:**
> - `[PUBLIC]` — Não requer autenticação
> - `[AUTH]` — Requer header `Authorization: Bearer <token>`
> - `[LEADER]` — Requer autenticação com perfil `LEADER`

---

### Health Check

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `GET` | `/health` | PUBLIC | Verifica se o servidor está online e retorna timestamp |

---

### Autenticação

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `POST` | `/register` | PUBLIC | Cria uma nova conta de usuário |
| `POST` | `/login` | PUBLIC | Autentica o usuário e retorna o token JWT |
| `POST` | `/forgot-password` | PUBLIC | Envia e-mail com link de redefinição de senha |
| `POST` | `/reset-password` | PUBLIC | Redefine a senha usando o token recebido por e-mail |

**Exemplos de body:**

```json
// POST /register
{
  "name": "Maria Silva",
  "email": "maria@email.com",
  "password": "minhasenha123",
  "role": "LEADER"
}

// POST /login
{
  "email": "maria@email.com",
  "password": "minhasenha123"
}

// POST /forgot-password
{
  "email": "maria@email.com"
}

// POST /reset-password
{
  "token": "token_recebido_por_email",
  "newPassword": "novasenha456"
}
```

---

### Usuários

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `GET` | `/users/me` | AUTH | Retorna os dados do usuário autenticado |
| `PUT` | `/users/:id` | AUTH | Atualiza nome ou e-mail do usuário |
| `PUT` | `/users/:id/password` | AUTH | Atualiza a senha do usuário |

---

### Ações Comunitárias

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `GET` | `/actions` | PUBLIC | Lista todas as ações (suporta filtros e paginação) |
| `GET` | `/actions/:id` | PUBLIC | Retorna detalhes completos de uma ação |
| `POST` | `/actions` | LEADER | Cadastra uma nova ação comunitária |
| `PUT` | `/actions/:id` | LEADER | Atualiza uma ação existente (somente o criador) |
| `DELETE` | `/actions/:id` | LEADER | Remove uma ação (somente o criador) |

**Query params disponíveis para `GET /actions`:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `category` | string | Filtrar por categoria (ex: `SAUDE`, `EDUCACAO`) |
| `priority` | string | Filtrar por prioridade (`HIGH`, `MEDIUM`, `LOW`) |
| `date` | string | Filtrar por data específica |
| `page` | number | Número da página (paginação) |
| `limit` | number | Quantidade de itens por página |

---

### Inscrições

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `POST` | `/registrations` | AUTH | Inscreve o usuário autenticado em uma ação |
| `GET` | `/registrations` | AUTH | Lista as inscrições do usuário autenticado |
| `GET` | `/registrations?actionId=:id` | LEADER | Lista todos os voluntários inscritos em uma ação |
| `PUT` | `/registrations/:id` | AUTH | Edita uma inscrição (ex: alterar status) |
| `DELETE` | `/registrations/:id` | AUTH | Cancela uma inscrição e libera a vaga automaticamente |

---

### Calendário

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `GET` | `/calendar` | PUBLIC | Retorna ações filtradas por período (`?start=ISO_DATE&end=ISO_DATE`) |

---

### Relatórios

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `GET` | `/reports/actions` | LEADER | Relatório detalhado das ações com inscritos, vagas e taxa de ocupação |
| `GET` | `/reports/summary` | LEADER | Resumo geral: totais, médias e distribuição por categoria |

**Query params disponíveis para `GET /reports/actions`:**

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `startDate` | ISO Date | Data inicial do período |
| `endDate` | ISO Date | Data final do período |
| `category` | string | Filtrar por categoria |

---

### Dashboard

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| `GET` | `/dashboard` | LEADER | Dados consolidados para o painel do líder (próximas ações, inscrições recentes, métricas) |

---

## Funcionalidades em Detalhe

### Frontend

#### `App.jsx` — Roteamento Principal
Define todas as rotas da aplicação utilizando React Router DOM v6. As rotas são organizadas em três grupos: **públicas** (acessíveis por qualquer visitante), **privadas** (exigem autenticação) e **de líder** (exigem perfil `LEADER`). O componente `RotaPrivada` verifica a presença e validade do token JWT antes de renderizar cada página protegida.

- **Rotas públicas:** `/`, `/login`, `/cadastro`, `/recuperar-senha`, `/redefinir-senha/:token`
- **Rotas privadas (AUTH):** `/perfil`, `/inscricoes`, `/calendario`
- **Rotas de líder (LEADER):** `/acoes/cadastrar`, `/acoes/:id/editar`, `/painel`, `/relatorios`

---

#### `AuthContext.jsx` — Contexto Global de Autenticação
Fornece o estado de autenticação para toda a aplicação através da Context API do React, evitando prop drilling. Ao iniciar, verifica automaticamente se há um token válido salvo no `localStorage`.

- **Estado exposto:** `user`, `token`, `isAuthenticated`, `isLeader`, `isLoading`
- **Funções expostas:** `login(email, senha)`, `logout()`, `updateUser(dados)`

---

#### `Home.jsx` — Página Inicial
Exibe a lista pública de todas as ações comunitárias disponíveis, com múltiplas opções de filtro para facilitar a descoberta. Ao clicar em um card, o usuário é direcionado para a página de detalhes completos da ação.

- Grid de cards com informações resumidas de cada ação
- Filtros por categoria, prioridade e data
- Campo de busca por título ou local
- Paginação dos resultados
- Indicador visual de vagas disponíveis em cada card

---

#### `CadastroAcoes.jsx` — Formulário de Ação
Formulário completo com validação em tempo real para cadastrar ou editar uma ação comunitária. No modo de edição, os campos já são pré-preenchidos com os dados existentes.

| Campo | Regra de validação |
|---|---|
| Título | Obrigatório, máximo 100 caracteres |
| Descrição | Obrigatório, máximo 500 caracteres |
| Data e hora | Obrigatório, não pode ser data no passado |
| Local / Endereço | Obrigatório |
| Prioridade | Alta / Média / Baixa (seleção obrigatória) |
| Categoria | Saúde / Educação / Meio Ambiente / Segurança / Cultura / Outros |
| Limite de vagas | Número inteiro positivo obrigatório |

---

#### `ActionDetail.jsx` — Detalhes da Ação
Página completa de uma ação comunitária com comportamento diferente para cada tipo de usuário.

**Para voluntários:**
- Botão "Quero me inscrever" (habilitado somente se há vagas)
- Mensagem de confirmação caso já esteja inscrito
- Botão "Cancelar inscrição" com modal de confirmação

**Para líderes (criador da ação):**
- Botão "Editar ação"
- Botão "Excluir ação" com modal de confirmação
- Link para ver a lista completa de inscritos

**Indicador de vagas:**
- Verde: "X vagas disponíveis"
- Laranja: "Últimas vagas! X restantes" (menos de 20%)
- Vermelho: "Vagas esgotadas" (botão de inscrição desabilitado)

---

#### `Calendario.jsx` — Calendário de Ações
Visualização de todas as ações em formato de calendário interativo, com alternância entre visões mensal, semanal e diária. As ações são coloridas de acordo com sua prioridade. Ao clicar em um evento, abre um modal com detalhes resumidos e botão direto para inscrição.

---

#### `PainelInscricoes.jsx` — Painel do Líder
Painel exclusivo para líderes gerenciarem os voluntários inscritos em suas ações. Permite filtrar, buscar e exportar a lista de inscritos em CSV para comunicação e organização offline.

- Tabela com nome, e-mail, data de inscrição e status de cada voluntário
- Filtros por status (ativa / cancelada) e data de inscrição
- Campo de busca por nome ou e-mail
- Contador de inscritos vs limite de vagas
- Exportação da lista filtrada em formato CSV

---

#### `RelatoriosAcoes.jsx` — Relatórios Gerenciais
Dashboard completo de dados e métricas para líderes avaliarem o impacto de suas iniciativas ao longo do tempo.

**Cards de destaque:**
- Total de ações cadastradas
- Total de voluntários inscritos
- Média de inscritos por ação

**Gráficos disponíveis:**
- Barras: número de inscritos por ação
- Pizza: distribuição percentual por categoria
- Linha: evolução das inscrições ao longo do tempo

**Filtros:** período (data inicial e final), categoria e prioridade  
**Exportação:** relatório completo em CSV

---

### Backend

#### Middlewares

**`authMiddleware.js`** — Protege todas as rotas autenticadas. Verifica o header `Authorization: Bearer <token>`, decodifica o JWT, valida a expiração e injeta o usuário em `req.user`. Retorna `401 Unauthorized` em qualquer falha.

**`adminMiddleware.js`** — Deve ser usado após o `authMiddleware`. Verifica se `req.user.role === 'LEADER'`. Retorna `403 Forbidden` caso contrário.

**`errorMiddleware.js`** — Middleware global de tratamento de erros. Padroniza todas as respostas de erro, trata erros específicos do Prisma (`P2002` = violação de unique constraint, `P2025` = registro não encontrado) e inclui stack trace em ambiente de desenvolvimento.

---

#### Services

**`authService.js`**
- `hashPassword(password)` — Gera hash com bcrypt usando 12 rounds de salt
- `comparePassword(plain, hash)` — Verifica senha em texto plano contra o hash
- `generateToken(userId, role)` — Gera JWT com payload `{ id, role }` e expiração configurável
- `verifyToken(token)` — Decodifica e valida a assinatura e expiração do token
- `generateResetToken()` — Gera token aleatório para o fluxo de recuperação de senha

**`acaoService.js`**
- `createAcao(data, userId)` — Cria ação vinculada ao líder autenticado
- `getAcoes(filters)` — Busca ações com filtros opcionais
- `getAcaoById(id)` — Busca ação com dados do criador e contagem de inscritos
- `updateAcao(id, data, userId)` — Atualiza apenas se o `userId` for o criador
- `deleteAcao(id, userId)` — Remove apenas se o `userId` for o criador
- `countInscritos(acaoId)` — Conta apenas inscrições com status `ACTIVE`

**`inscricaoService.js`**
- `createInscricao(userId, actionId)` — Verifica se já está inscrito, verifica vagas disponíveis (`slots > inscritos ativos`) e cria o registro com status `ACTIVE`
- `getInscricoesByUser(userId)` — Lista todas as inscrições do voluntário
- `getInscricoesByAcao(actionId, liderId)` — Lista inscritos, verificando se o solicitante é o líder da ação
- `cancelInscricao(id, userId)` — Muda status para `CANCELLED`, liberando a vaga automaticamente

---

## Fluxo Completo do Usuário

### Fluxo do Líder Comunitário

**1. Criação de conta**
O líder acessa o sistema, clica em "Criar conta", preenche nome, e-mail, senha e seleciona o perfil "Líder Comunitário". Após o registro, é direcionado automaticamente para o painel de ações.

**2. Cadastro de uma ação**
No menu, acessa "Cadastrar Ação" e preenche o formulário completo — por exemplo: título "Mutirão de Limpeza do Parque", data 15/03/2025 às 08:00, local "Parque Municipal - Entrada Principal", prioridade Alta, categoria Meio Ambiente e 30 vagas disponíveis. Após salvar, a ação aparece imediatamente na home e no calendário.

**3. Acompanhamento de inscrições**
No painel, seleciona a ação e visualiza a tabela com todos os voluntários inscritos — nome, e-mail, data de inscrição e status. Aplica filtros, faz buscas e exporta a lista em CSV para uso offline.

**4. Análise de relatórios**
Na página de relatórios, seleciona um período e visualiza gráficos comparativos. Identifica, por exemplo, que a categoria Saúde tem maior engajamento médio e planeja as próximas ações com base nessa informação.

---

### Fluxo do Voluntário

**1. Descoberta de uma ação**
O voluntário acessa a home sem precisar fazer login. Filtra por categoria "Educação" e encontra "Aulas de Reforço Escolar". Clica no card para ver os detalhes completos.

**2. Inscrição**
Na página de detalhes, vê que há 8 vagas disponíveis de um total de 20. Clica em "Quero me inscrever". Por não estar logado, é redirecionado para o login — após autenticação, retorna automaticamente para a ação e confirma a inscrição. Recebe um toast de sucesso e o contador é atualizado para 9/20.

**3. Gerenciamento da inscrição**
No perfil, acessa "Minhas Inscrições" e visualiza o histórico. Decide cancelar uma inscrição por conflito de agenda, confirma no modal de confirmação e a vaga é liberada automaticamente para outros voluntários.

---

### Fluxo de Recuperação de Senha

1. Na tela de login, clica em "Esqueci minha senha"
2. Informa o e-mail cadastrado e clica em "Enviar"
3. Recebe um e-mail com link de redefinição válido por **1 hora**
4. Clica no link e é direcionado para a tela de redefinição
5. Informa a nova senha e confirma
6. É redirecionado para o login com mensagem de sucesso

> **Segurança:** O sistema retorna mensagem de sucesso mesmo quando o e-mail não está cadastrado, evitando a enumeração de usuários por atores maliciosos.

---

## User Stories

### US01 — Cadastro de Ações Comunitárias

**Como** líder comunitário, **quero** cadastrar ações com título, descrição, data, local, prioridade, categoria e limite de vagas, **para que** voluntários possam se inscrever e a comunidade seja mobilizada de forma organizada.

**Critérios de aceitação:**
- Formulário com todos os campos obrigatórios e validação em tempo real
- Somente líderes autenticados podem cadastrar ações
- A ação aparece imediatamente na home e no calendário após o cadastro
- O sistema impede o cadastro de ações com data no passado
- O limite de vagas deve ser um número inteiro positivo

`Backend: POST /actions` | `Frontend: CadastroAcoes.jsx`

---

### US02 — Visualização em Calendário

**Como** usuário, **quero** visualizar todas as ações em um calendário com visões mensal, semanal e diária, **para** me planejar e encontrar eventos de forma visual e intuitiva.

**Critérios de aceitação:**
- Calendário carrega exibindo o mês atual
- Ações aparecem nas datas corretas com cor diferenciada por prioridade
- Clique em uma ação exibe modal com detalhes resumidos
- Modal contém botão para se inscrever ou ver a página completa
- Alternância fluida entre visualizações mensal, semanal e diária
- Acessível sem autenticação (público)

`Backend: GET /calendar?start=&end=` | `Frontend: Calendario.jsx`

---

### US03 — Inscrição em Ações

**Como** voluntário, **quero** me inscrever em ações comunitárias de forma rápida e segura, **para** confirmar minha participação e contribuir com a comunidade.

**Critérios de aceitação:**
- Voluntário precisa estar autenticado para se inscrever
- Sistema verifica a disponibilidade de vagas antes de confirmar
- Inscrição duplicada é bloqueada com mensagem explicativa
- Confirmação imediata com toast de sucesso
- Contador de vagas atualizado em tempo real

`Backend: POST /registrations` | `Frontend: InscricaoVoluntario.jsx / ActionDetail.jsx`

---

### US04 — Definição de Prioridades

**Como** líder, **quero** definir a prioridade de cada ação (alta, média ou baixa), **para** comunicar a urgência e importância de cada iniciativa aos voluntários.

**Critérios de aceitação:**
- Campo de prioridade obrigatório no formulário de cadastro
- Prioridade exibida com badge colorido nos cards (alta / média / baixa)
- Filtro por prioridade disponível na home e no calendário

`Backend: campo priority (HIGH | MEDIUM | LOW)` | `Frontend: CadastroAcoes.jsx, AcaoCard.jsx`

---

### US05 — Página de Detalhes das Ações

**Como** usuário, **quero** ver todos os detalhes de uma ação antes de decidir me inscrever, **para** tomar uma decisão informada sobre minha participação.

**Critérios de aceitação:**
- Exibe: título, descrição completa, data, hora, local, prioridade, categoria e nome do líder responsável
- Exibe: contador de vagas (inscritos/limite) e barra de progresso visual
- Exibe: mensagem dinâmica de disponibilidade (vagas disponíveis / poucas vagas / esgotado)
- Botão de inscrição desabilitado quando não há mais vagas

`Backend: GET /actions/:id` | `Frontend: ActionDetail.jsx`

---

### US06 — Acompanhamento de Inscrições

**Como** líder, **quero** ver a lista completa de voluntários inscritos em cada uma das minhas ações, **para** organizar a logística e comunicação do evento.

**Critérios de aceitação:**
- Acesso restrito ao líder criador da ação
- Tabela com nome, e-mail, data de inscrição e status de cada voluntário
- Filtros por status, data e campo de busca por nome/e-mail
- Exportação da lista em formato CSV
- Contador de inscritos vs limite visível no topo

`Backend: GET /registrations?actionId=:id` | `Frontend: PainelInscricoes.jsx`

---

### US07 — Cancelamento e Edição de Inscrição

**Como** voluntário, **quero** poder cancelar ou editar minha inscrição em uma ação, **para** garantir que os dados estejam corretos e liberar vagas caso não possa comparecer.

**Critérios de aceitação:**
- Voluntário visualiza suas inscrições ativas no perfil
- O cancelamento exige confirmação em modal antes de ser efetivado
- Após o cancelamento, a vaga é liberada automaticamente
- O histórico mantém o registro mesmo após o cancelamento
- A ação só pode ser cancelada pelo próprio voluntário

`Backend: PUT /registrations/:id, DELETE /registrations/:id` | `Frontend: ActionDetail.jsx, Perfil.jsx`

---

### US08 — Relatórios Gerenciais

**Como** líder, **quero** gerar relatórios com estatísticas das minhas ações, **para** avaliar o impacto das iniciativas e planejar ações futuras com base em dados concretos.

**Critérios de aceitação:**
- Gráfico de barras com número de inscritos por ação
- Gráfico de pizza com distribuição por categoria
- Gráfico de linha com inscrições ao longo do tempo
- Tabela detalhada com todas as ações e suas métricas
- Filtros por período, categoria e prioridade
- Exportação em CSV

`Backend: GET /reports/actions, GET /reports/summary` | `Frontend: RelatoriosAcoes.jsx`

---

### US09 — Confirmação de Inscrição

**Como** voluntário, **quero** receber um feedback visual imediato após me inscrever, **para** ter certeza de que minha inscrição foi registrada com sucesso.

**Critérios de aceitação:**
- Toast de sucesso exibido por 4 segundos após inscrição bem-sucedida
- Mensagem de erro específica em caso de falha (vagas esgotadas, já inscrito, etc.)
- Botão de inscrição muda para "Inscrito ✓" após confirmação
- Contador de vagas atualizado imediatamente na tela

`Backend: POST /registrations` | `Frontend: React Toastify em InscricaoVoluntario.jsx`

---

### US10 — Autenticação de Usuários

**Como** usuário, **quero** fazer login de forma segura com e-mail e senha, **para** acessar funcionalidades restritas ao meu perfil.

**Critérios de aceitação:**
- Login com e-mail e senha, retorna token JWT válido por 7 dias
- Token armazenado no localStorage e validado automaticamente ao reabrir o sistema
- Rotas privadas redirecionam para o login se o usuário não estiver autenticado
- Logout limpa o token e redireciona para a home
- Mensagem de erro específica para credenciais inválidas
- Redirecionamento pós-login diferenciado por perfil: LEADER → `/acoes` | VOLUNTEER → `/`

`Backend: POST /login` | `Frontend: Login.jsx, AuthContext.jsx, RotaPrivada.jsx`

---

### US11 — Recuperação de Senha

**Como** usuário, **quero** recuperar minha senha esquecida via e-mail, **para** não perder acesso à minha conta.

**Critérios de aceitação:**
- Formulário solicita apenas o e-mail cadastrado
- E-mail enviado com link de redefinição válido por 1 hora
- Link funciona apenas uma vez (token invalidado após uso)
- Após a redefinição, o usuário pode fazer login com a nova senha
- Retorna mensagem de sucesso mesmo se o e-mail não existir (proteção contra enumeração)

`Backend: POST /forgot-password, POST /reset-password` | `Frontend: RecuperarSenha.jsx, RedefinirSenha.jsx`

---

### US12 — Atualização de Senha

**Como** usuário autenticado, **quero** alterar minha senha diretamente no perfil, **para** manter minha conta segura.

**Critérios de aceitação:**
- Formulário exige a senha atual antes de definir a nova
- Nova senha com mínimo de 8 caracteres
- Campo de confirmação da nova senha deve coincidir
- Feedback imediato de sucesso ou erro
- Sessão permanece ativa após a troca (não exige novo login)

`Backend: PUT /users/:id/password` | `Frontend: Perfil.jsx`

---

### US13 — Limite de Vagas

**Como** líder, **quero** definir um limite de vagas para cada ação, **para** controlar o número de participantes e garantir a qualidade do evento.

**Critérios de aceitação:**
- Campo obrigatório de limite de vagas no formulário de cadastro
- Barra de progresso visual mostrando a ocupação atual (inscritos/limite)
- Indicadores visuais: verde (vagas disponíveis), laranja (menos de 20% restante), vermelho (esgotado)
- Sistema bloqueia automaticamente novas inscrições ao atingir o limite

`Backend: campo slots + validação em inscricaoService.js` | `Frontend: BarraProgresso.jsx`

---

### US14 — Categorias de Ações

**Como** líder, **quero** definir uma categoria para cada ação, **para** organizar as iniciativas e facilitar a busca pelos voluntários.

**Critérios de aceitação:**
- Campo de categoria obrigatório no cadastro
- Badge visual de categoria exibido nos cards e na página de detalhes
- Filtro por categoria disponível na home e no calendário
- Relatórios mostram distribuição e engajamento por categoria
- Categorias padronizadas: Saúde, Educação, Meio Ambiente, Segurança, Cultura, Outros

`Backend: campo category (Enum)` | `Frontend: FiltroAcoes.jsx, AcaoCard.jsx, ActionDetail.jsx`

---

## Variáveis de Ambiente

### Backend (`/backend/.env`)

| Variável | Descrição | Exemplo |
|---|---|---|
| `DATABASE_URL` | String de conexão completa com o PostgreSQL | `postgresql://postgres:senha@localhost:5432/vizinhanca_digital` |
| `JWT_SECRET` | Chave secreta para assinar os tokens JWT (mínimo 32 caracteres) | `minha_chave_super_secreta_2024` |
| `JWT_EXPIRES_IN` | Tempo de expiração dos tokens JWT | `7d`, `24h` ou `60m` |
| `PORT` | Porta em que o servidor backend vai rodar | `3001` |
| `NODE_ENV` | Ambiente de execução atual | `development`, `production` ou `test` |
| `EMAIL_HOST` | Servidor SMTP para envio de e-mails | `smtp.gmail.com` |
| `EMAIL_PORT` | Porta do servidor SMTP | `587` (TLS) ou `465` (SSL) |
| `EMAIL_USER` | Endereço de e-mail remetente | `noreply@vizinhancadigital.com` |
| `EMAIL_PASS` | Senha ou App Password do e-mail remetente | `senha_ou_app_password` |
| `FRONTEND_URL` | URL do frontend (usada nos links dos e-mails enviados) | `http://localhost:5173` |

### Frontend (`/frontend/.env`)

| Variável | Descrição | Exemplo |
|---|---|---|
| `VITE_API_URL` | URL base da API do backend | `http://localhost:3001` |
| `VITE_APP_NAME` | Nome da aplicação (usado no título das páginas) | `Vizinhança Digital` |

---

## Scripts Disponíveis

### Backend (`/backend`)

```bash
npm run dev       # Inicia o servidor com nodemon — reinicia automaticamente ao salvar arquivos
npm start         # Inicia o servidor sem nodemon (modo produção)
npm test          # Executa os testes automatizados
npm run lint      # Verifica a qualidade do código com ESLint
```

### Prisma (`/backend`)

```bash
npx prisma migrate dev --name <nome>   # Cria e executa uma nova migration (desenvolvimento)
npx prisma migrate deploy              # Executa todas as migrations pendentes (produção)
npx prisma db seed                     # Popula o banco com dados de exemplo
npx prisma studio                      # Abre a interface visual do banco na porta 5555
npx prisma generate                    # Regenera o Prisma Client após mudança no schema.prisma
npx prisma migrate reset               # Apaga o banco e reaplica todas as migrations do zero
```

### Frontend (`/frontend`)

```bash
npm run dev       # Inicia o servidor de desenvolvimento Vite na porta 5173 (com HMR)
npm run build     # Gera o build otimizado de produção na pasta /dist
npm run preview   # Pré-visualiza o build de produção localmente
npm run lint      # Verifica a qualidade do código com ESLint
```

---

## Padrões de Código

### Respostas da API

Todas as respostas seguem o padrão definido em `responseHandler.js`:

```json
// Resposta de sucesso
{
  "success": true,
  "data": { },
  "message": "Operação realizada com sucesso"
}

// Resposta de erro
{
  "success": false,
  "error": "Mensagem de erro clara e objetiva",
  "details": ["campo: descrição do problema"]
}

// Resposta de lista paginada
{
  "success": true,
  "data": [],
  "total": 100,
  "page": 1,
  "pages": 10,
  "limit": 10
}
```

### Convenções de Nomenclatura

| Contexto | Padrão | Exemplos |
|---|---|---|
| Arquivos React | PascalCase | `Login.jsx`, `AcaoCard.jsx` |
| Arquivos JavaScript | camelCase | `authService.js`, `formatDate.js` |
| Variáveis e funções | camelCase | `getUserById()`, `createAcao()` |
| Constantes | UPPER_SNAKE_CASE | `JWT_SECRET`, `MAX_SLOTS` |
| Rotas da API | kebab-case | `/forgot-password`, `/reset-password` |
| Tabelas do banco | snake_case (via Prisma) | `users`, `actions`, `registrations` |

### Estrutura dos Controllers

Toda função de controller segue o mesmo padrão de quatro etapas:

1. **Extrair** os dados da requisição (`req.body`, `req.params`, `req.query`, `req.user`)
2. **Chamar** o service correspondente com os dados extraídos
3. **Retornar** a resposta formatada com o `responseHandler`
4. **Propagar** erros para o `errorMiddleware` usando `next(error)`

### Estrutura dos Services

Os services contêm **apenas regras de negócio** e seguem princípios claros:

- Não têm acesso direto a `req` ou `res`
- Recebem parâmetros tipados e retornam dados ou lançam erros
- Interagem com o banco de dados **exclusivamente via Prisma**
- São completamente testáveis de forma isolada

---

## Impacto Esperado

| Área | Impacto |
|---|---|
| **Eficiência organizacional** | Líderes comunitários substituem planilhas, cadernos e grupos de WhatsApp por uma plataforma profissional de gestão, eliminando erros de comunicação e duplicidade de inscrições |
| **Engajamento voluntário** | O processo de inscrição reduzido a um clique remove o principal obstáculo para a participação. Expectativa de **aumento de 40%** na taxa de inscrição |
| **Transparência institucional** | Todos os dados ficam registrados, acessíveis e exportáveis, permitindo a prestação de contas a parceiros, patrocinadores e órgãos públicos com relatórios gerados em segundos |
| **Segurança digital** | Autenticação JWT, senhas criptografadas com bcrypt, controle de acesso por perfil e proteção de rotas garantem a privacidade dos dados de voluntários e líderes |
| **Visibilidade ampliada** | Ações antes restritas ao alcance do grupo de WhatsApp do líder passam a ser visíveis para qualquer pessoa com acesso à internet, multiplicando o alcance das iniciativas |
| **Memória institucional** | O histórico permanente de ações e participações cria um registro que transcende gestões individuais, permitindo aprendizado contínuo e avaliação de longo prazo do impacto comunitário |

---
