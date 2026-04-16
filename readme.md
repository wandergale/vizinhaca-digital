# Vizinhaca Digital

Sistema web de cadastro e agendamento de ações comunitárias foi pensado para fortalecer a vida comunitária, oferecendo um sistema onde líderes podem organizar eventos e voluntários se inscrevem de forma prática. Ele une tecnologia moderna com propósito social. 

## Objetivos principais do sistema
- Centralizar informações sobre ações comunitárias em um só lugar.
- Facilitar a organização de eventos por líderes comunitários.
- Simplificar a participação de voluntários, permitindo inscrições rápidas.
- Promover engajamento e aumentar a visibilidade das iniciativas locais.

## Funcionalidade Inicial Básica

Este módulo demonstra o fluxo contínuo básico inicial entre Autenticação, Cadastro de Ações e Calendário.
O objetivo é permitir que o usuário faça login, cadastre uma ação comunitária e visualize essas ações no calendário.

**Objetivo**

Essa é a primeira versão funcional básica do sistema, rodando apenas no navegador, sem necessidade de backend.
Ela serve como funcionalidade inicial para validar o fluxo de interação entre login → cadastro → calendário.

# Estrutura Inicial 
```
SISTEMA/
├── html/
│   ├── autenticacao.html      # Tela de login e criação de conta
│   ├── cadastro-acoes.html    # Formulário para cadastrar ações comunitárias
│   └── calendario.html        # Calendário para visualizar ações cadastradas
├── css/
│   ├── autenticacao.css       # Estilos da tela de login
│   ├── cadastro-acoes.css     # Estilos da tela de cadastro
│   └── calendario.css         # Estilos do calendário
└── js/
    ├── autenticacao.js        # Lógica de autenticação (login/cadastro)
    ├── cadastro-acoes.js      # Validação e feedback do cadastro de ações
    └── calendario.js          # Renderização do calendário e exibição das ações
```

## Estrutura Inicial (versão sem backend)
Essa primeira versão é apenas para validar o fluxo básico de interação:

**Autenticação**
- autenticacao.html → Página de login e criação de conta (formulário com usuário/senha).
- autenticacao.css → Estilos da tela de login (layout, cores, mensagens de erro/sucesso).
- autenticacao.js → Lógica de autenticação: valida credenciais, mostra feedback e salva sessão no localStorage.

**Cadastro de Ações**
- cadastro-acoes.html → Formulário para cadastrar ações comunitárias (título, descrição, data, local, prioridade).
- cadastro-acoes.css → Estilos da tela de cadastro (formulário, botões, mensagens).
- cadastro-acoes.js → Validação dos campos, exibição de mensagens de erro em vermelho ou modal ✔ de sucesso. Também verifica se o usuário está logado antes de permitir o acesso.

**Calendário**
- calendario.html → Estrutura do calendário, com botões para alternar visualização (mês, semana, dia) e modal de detalhes rápidos.
- calendario.css → Estilos visuais do calendário (cores por prioridade, layout da grade, modal).
- calendario.js → Lógica de renderização das ações no calendário, alternância de visualização e abertura de detalhes. Lê as ações cadastradas e posiciona nos dias corretos.
  
**Procedimento para rodar o código**
- Abra o explorador de arquivos (Windows).
- Clique duas vezes em detalhes-acao.html.
- O navegador (Chrome) exibirá os detalhes da ação.
- Clique em “Quero me inscrever” → o navegador abrirá inscricao.html.
- Preencha os campos de nome e e-mail.
- O sistema exibirá uma mensagem de sucesso ou erro.

**Fluxo do Usuário**
**Login (autenticacao.html)**
- Usuário acessa o sistema.
- Faz login ou cria conta.
- Se válido, sessão é salva no localStorage.
  
**Cadastro de Ações (cadastro-acoes.html)**
- Apenas acessível se o usuário estiver logado.
- Formulário com título, descrição, data, local e prioridade.
- Validação feita pelo JS → mensagens de erro em vermelho ou modal ✔ de sucesso.

**Calendário (calendario.html)**

- Exibe os dias do mês atual em grade.
- Mostra as ações cadastradas nas datas corretas.
- Permite alternar entre visualização mensal, semanal e diária.
- Ao clicar em uma ação, abre modal com detalhes rápidos e opção de ver detalhes completos.

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
