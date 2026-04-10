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