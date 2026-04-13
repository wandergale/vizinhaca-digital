# Vizinhaca Digital

Sistema web de cadastro e agendamento de ações comunitárias foi pensado para fortalecer a vida comunitária, oferecendo um sistema onde líderes podem organizar eventos e voluntários se inscrevem de forma prática. Ele une tecnologia moderna com propósito social. 

## Objetivos principais do sistema
- Centralizar informações sobre ações comunitárias em um só lugar.
- Facilitar a organização de eventos por líderes comunitários.
- Simplificar a participação de voluntários, permitindo inscrições rápidas.
- Promover engajamento e aumentar a visibilidade das iniciativas locais.

## Funcionalidade Inicial Básica

Este módulo demonstra o fluxo contínuo básico inicial entre Página de Detalhes da Ação e Módulo de Inscrição.
O objetivo é permitir que o usuário visualize informações de uma ação comunitária e, em seguida, se inscreva de forma simples.

**Objetivo**

Essa é a primeira versão funcional básica do sistema, rodando apenas no navegador, sem necessidade de backend.
Ela serve como funcionalidade inicial para validar o fluxo de interação entre detalhes da ação e inscrição.

# Estrutura Inicial 
```
SISTEMA/
├── inscricao.html          # Formulário de inscrição
├── detalhes-acao.html      # Página com informações da ação
├── css/
│   ├── inscricao.css       # Estilos da página de inscrição
│   └── detalhes-acao.css   # Estilos da página de detalhes
└── js/
    ├── inscricao.js        # Lógica da inscrição (validação, mensagens)
    └── detalhes-acao.js    # Lógica da página de detalhes (navegação)
```

## Estrutura Inicial (versão sem backend)
Essa primeira versão é apenas para validar o fluxo básico de interação:

- detalhes-acao.html → Página estática que mostra informações de uma ação comunitária (ex.: título, descrição, data, local).
- inscricao.html → Formulário simples onde o voluntário coloca nome e e-mail.
- detalhes-acao.js → Script que controla a navegação. Exemplo: quando o usuário clica em “Quero me inscrever”, abre a página de inscrição.
- inscricao.js → Faz a validação dos campos (nome e e-mail). Exibe mensagem de sucesso ou erro.
- CSS → Cada página tem seu estilo separado para manter organização.
  
**Procedimento para rodar o código**
- Abra o explorador de arquivos (Windows).
- Clique duas vezes em detalhes-acao.html.
- O navegador (Chrome) exibirá os detalhes da ação.
- Clique em “Quero me inscrever” → o navegador abrirá inscricao.html.
- Preencha os campos de nome e e-mail.
- O sistema exibirá uma mensagem de sucesso ou erro.

**Fluxo do Usuário**
- Visualização: usuário acessa detalhes da ação.
- Ação: clica em “Quero me inscrever”.
- Formulário: abre página de inscrição.
- Feedback: após preencher nome e e-mail, recebe mensagem de confirmação.

---

## Stack Final do Sistema

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL
- **ORM:** Prisma

## Estrutura Final (com backend e frontend)

```
vizinhaca-digital/
├── backend/
│   ├── src/
│   │   ├── routes/          # Rotas da API
│   │   ├── controllers/     # Lógica dos endpoints
│   │   ├── middlewares/     # Auth, controle de acesso
│   │   └── app.js           # Configuração do Express
│   ├── prisma/
│   │   └── schema.prisma    # Modelos do banco
│   ├── .env.example
│   ├── package.json
│   └── server.js
└── frontend/
    ├── src/
    │   ├── pages/           # Login, Home, Actions, ActionDetail
    │   ├── components/      # Componentes reutilizáveis
    │   ├── services/
    │   │   └── api.js       # Instância do axios
    │   ├── App.jsx
    │   └── main.jsx
    ├── .env.example
    └── package.json
```
## Funcionalidade Específica

**Backend (Node.js + Express + Prisma + PostgreSQL)**
- src/routes/ → Define as rotas da API (ex.: /users, /actions, /registrations).
- src/controllers/ → Contém a lógica de cada rota, ou seja, o que acontece quando um endpoint é chamado. Exemplo: ao chamar POST /registrations, o controller valida os dados e cria a inscrição no banco.
- src/middlewares/ → Funções que interceptam requisições antes de chegar ao controller (ex.: autenticação JWT, verificação de permissões).
- src/app.js → Configuração principal do Express (middlewares globais, uso de rotas, etc.).
- prisma/schema.prisma → Define os modelos do banco de dados (User → pessoas cadastradas, Action → ações comunitárias, Registration → inscrições dos voluntários).
- server.js → Ponto de entrada do servidor, inicializa o Express e conecta ao PostgreSQL.
- .env.example → Exemplo de variáveis de ambiente (porta, credenciais do banco, secret JWT).
  
**Frontend (React + Vite)**
- src/pages/ → Páginas principais da aplicação: (Login.jsx: Página de autenticação de usuários (login e registro), Home.jsx: Página inicial (lista de ações comunitárias disponíveis), Actions.jsx: Página de gerenciamento de ações (voltada para líderes comunitários), ActionDetail.jsx: Página de detalhes de uma ação específica (informações completas e opção de inscrição).
- src/components/ → Componentes reutilizáveis (botões, formulários, cabeçalhos, modais).
- src/services/api.js → Configuração do Axios para consumir a API do backend (api.get("/actions") para listar ações).
- App.jsx → Define as rotas e a estrutura principal da aplicação (/login, /actions/:id).
- main.jsx → Ponto de entrada do React, renderiza o App.
- .env.example → Exemplo de variáveis de ambiente (URL da API, etc.).


## Funcionamento para rodar o código

### Pré-requisitos

- Node.js 18+
- PostgreSQL rodando localmente

### Backend

```bash
cd backend
npm install
cp .env.example .env
# Editar .env com as credenciais do PostgreSQL
npx prisma migrate dev --name init
npm run dev
```

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Modelos do banco

| Modelo         | Campos principais                                           |
|----------------|-------------------------------------------------------------|
| `User`         | id, name, email, password, role (LEADER/VOLUNTEER)          |
| `Action`       | id, title, description, date, location, priority, createdBy |
| `Registration` | id, userId, actionId                                        |

## Endpoints disponíveis

- `GET /health` — health check

> Demais rotas serão implementadas nas próximas etapas.


# Itens do Backlog e Estrutura Final

## User Story 1 — Cadastro de ações comunitárias
**Backend:**
- Rota `POST /actions` em `src/routes/actions.js`
- Controller: lógica para salvar ação no banco via Prisma (`src/controllers/actionsController.js`)

**Frontend:**
- Formulário em `src/pages/Actions.jsx`
- Campos: título, descrição, data, local, prioridade
- Botão de envio que chama a API `POST /actions`

---

## User Story 2 — Visualização de calendário
**Backend:**
- Rota `GET /actions` para listar todas as ações
- Controller: retorna ações com data e local

**Frontend:**
- Interface de calendário em `src/components/Calendar.jsx`
- Consome API `GET /actions` e exibe eventos no calendário

---

## User Story 3 — Inscrição em ações comunitárias
**Backend:**
- Rota `POST /registrations` em `src/routes/registrations.js`
- Controller: cria inscrição vinculando `userId` e `actionId`

**Frontend:**
- Botão “Quero me inscrever” em `src/pages/ActionDetail.jsx`
- Chama API `POST /registrations` e exibe mensagem de sucesso

---

## User Story 4 — Definição de prioridades
**Backend:**
- Campo `priority` já previsto no modelo `Action`
- Controller: valida prioridade ao cadastrar ação

**Frontend:**
- Campo adicional no formulário de cadastro (`src/pages/Actions.jsx`)
- Seleção de prioridade (alta, média, baixa)

---

## User Story 5 — Página de detalhes das ações
**Backend:**
- Rota `GET /actions/:id` para buscar detalhes de uma ação específica

**Frontend:**
- Página `src/pages/ActionDetail.jsx`
- Exibe título, descrição, data, local, prioridade e botão de inscrição

---

## User Story 6 — Acompanhamento de inscrições
**Backend:**
- Rota `GET /registrations?actionId=:id`
- Controller: retorna lista de voluntários inscritos em uma ação

**Frontend:**
- Painel em `src/pages/Actions.jsx` (visível para líderes)
- Exibe lista de inscritos por ação

---

## User Story 7 — Cancelamento/edição de inscrição
**Backend:**
- Rota `PUT /registrations/:id` para editar inscrição
- Rota `DELETE /registrations/:id` para cancelar inscrição

**Frontend:**
- Botão de editar/cancelar em `src/pages/ActionDetail.jsx`
- Confirmação antes de excluir inscrição

---

## User Story 8 — Relatórios das ações realizadas
**Backend:**
- Rota `GET /reports/actions`
- Controller: gera estatísticas (quantidade de inscritos, ações realizadas, etc.)

**Frontend:**
- Página `src/pages/Reports.jsx`
- Exibe gráficos e tabelas com dados das ações

---

## User Story 9 — Confirmação de inscrição
**Backend:**
- Após `POST /registrations`, dispara uma notificação interna (mensagem de sucesso retornada pela API)

**Frontend:**
- Exibe mensagem de sucesso após inscrição
- Pode usar um toast/alert visual para confirmar ao usuário que a inscrição foi realizada

---

## User Story 10 — Autenticação de usuários
**Backend:**
- Rota `POST /login` e `POST /register`
- Middleware `src/middlewares/auth.js` para validar JWT

**Frontend:**
- Página `src/pages/Login.jsx`
- Armazena token JWT no `localStorage`
- Protege rotas privadas (ex.: cadastro de ações, relatórios)
