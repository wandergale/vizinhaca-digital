# Vizinhaca Digital

Sistema web de cadastro e agendamento de ações comunitárias.

## Stack

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL
- **ORM:** Prisma

## Estrutura

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
**Funcionalidade Específica**

**Backend (Node.js + Express + Prisma + PostgreSQL)**
- src/routes/ → Define as rotas da API (ex.: /users, /actions, /registrations).
- src/controllers/ → Contém a lógica de cada rota, ou seja, o que acontece quando um endpoint é chamado.
- src/middlewares/ → Funções que interceptam requisições antes de chegar ao controller (ex.: autenticação JWT, verificação de permissões).
- src/app.js → Configuração principal do Express (middlewares globais, uso de rotas, etc.).
- prisma/schema.prisma → Define os modelos do banco de dados (User, Action, Registration).
- server.js → Ponto de entrada do servidor, inicializa o Express e conecta ao banco.
- .env.example → Exemplo de variáveis de ambiente (credenciais do banco, porta do servidor, etc.).

**Frontend (React + Vite)**
- src/pages/ → Páginas principais da aplicação (Login, Home, Actions, ActionDetail).
- src/components/ → Componentes reutilizáveis (botões, formulários, cabeçalhos).
- src/services/api.js → Configuração do Axios para consumir a API do backend.
- App.jsx → Define as rotas e a estrutura principal da aplicação.
- main.jsx → Ponto de entrada do React, renderiza o App.
- .env.example → Exemplo de variáveis de ambiente (URL da API, etc.).

## Como rodar

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
