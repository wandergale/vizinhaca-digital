# Vizinhaca Digital

Sistema web destinado ao cadastro e agendamento de ações comunitárias, com a finalidade de fortalecer a vida comunitária por meio da integração entre tecnologia e propósito social. Trata-se de uma solução que alia modernidade tecnológica e responsabilidade social, garantindo que líderes comunitários possam organizar eventos e que voluntários realizem inscrições de forma prática, eficiente e segura.

## Objetivos principais do sistema
- Centralizar informações sobre ações comunitárias em um só lugar.
- Facilitar a organização de eventos por líderes comunitários.
- Simplificar a participação de voluntários, permitindo inscrições rápidas.
- Promover engajamento e aumentar a visibilidade das iniciativas locais.

## Problemas que o Sistema Visa Resolver

### 1. Fragmentação das informações
- As informações sobre eventos comunitários encontram-se dispersas em redes sociais, grupos de mensagens e cartazes físicos.  
- Isso dificulta o acesso dos voluntários e reduz a visibilidade das iniciativas.  
- **Solução:** Centralização das informações em um único ambiente digital.

### 2. Dificuldade na organização de eventos
- Líderes comunitários enfrentam obstáculos para planejar, divulgar e gerenciar ações.  
- **Solução:** Ferramentas estruturadas para cadastro de eventos, definição de prioridades e acompanhamento de inscrições.

### 3. Baixa adesão de voluntários
- A ausência de um processo simples de inscrição desestimula a participação.  
- **Solução:** Formulários intuitivos e feedback imediato, tornando o processo acessível e confiável.

### 4. Falta de rastreabilidade
- Não há registros claros de quem participou, quais ações foram realizadas e qual foi o impacto.  
- **Solução:** Histórico detalhado de ações, inscrições e relatórios, garantindo transparência.

### 5. Carência de relatórios e métricas
- Líderes comunitários carecem de dados consolidados para avaliar o sucesso das iniciativas.  
- **Solução:** Relatórios estatísticos sobre número de inscritos, ações realizadas e engajamento.

---

## Impacto da Solução

O sistema **Vizinhaça Digital** promove:  
- Maior **eficiência organizacional** para líderes comunitários.  
- Maior **engajamento voluntário** por meio de processos simplificados.  
- **Transparência institucional**, com registros e relatórios acessíveis.  
- **Segurança digital**, protegendo dados pessoais e garantindo confiabilidade.  
- **Visibilidade ampliada** das iniciativas locais, fortalecendo o tecido comunitário.  

---

## Características Fundamentais

### 1. Autenticação de usuários
- Implementação de login seguro com armazenamento de sessão.  
- Controle de acesso diferenciado por perfis (líderes comunitários e voluntários).  

### 2. Cadastro de ações comunitárias
- Formulário completo com campos de título, descrição, data, local e prioridade.  
- Validação de dados em tempo real para evitar inconsistências.  
- Associação da ação ao líder responsável, garantindo rastreabilidade.  

### 3. Visualização em calendário
- Interface interativa que permite alternar entre visualizações **mensal, semanal e diária**.  
- Exibição das ações cadastradas nas datas correspondentes.  
- Modal de detalhes rápidos com opção de acesso às informações completas.  

### 4. Inscrição de voluntários
- Processo simplificado de inscrição com poucos campos obrigatórios.  
- Feedback imediato de sucesso ou erro, assegurando clareza ao usuário.  
- Registro automático da inscrição vinculado ao voluntário e à ação selecionada.  

### 5. Relatórios gerenciais
- Estatísticas sobre número de inscritos por ação.  
- Indicadores de ações realizadas e engajamento comunitário.  
- Geração de relatórios consolidados para líderes comunitários, com gráficos e tabelas.

---

## Funcionalidade Inicial Básica

Este módulo demonstra o fluxo contínuo básico inicial entre Autenticação, Cadastro de Ações e Calendário.
O objetivo é permitir que o usuário faça login, cadastre uma ação comunitária e visualize essas ações no calendário.

---

**Objetivo**

Essa é a primeira versão funcional básica do sistema, rodando apenas no navegador, sem necessidade de backend.
Ela serve como funcionalidade inicial para validar o fluxo de interação entre login → cadastro → calendário.

---

# Estrutura Inicial 
```
SISTEMA/
├── html/
│   ├── autenticacao.html
│   ├── cadastro-acoes.html
│   ├── calendario.html
│   ├── edicao_cancelar.html
│   └── inscricao-voluntario.html
├── css/
│   ├── autenticacao.css
│   ├── cadastro-acoes.css
│   ├── calendario.css
│   ├── edicao-cancelar.css
│   └── inscricao-voluntario.css
└── js/
├── autenticacao.js
├── cadastro-acoes.js
├── calendario.js
├── edicao-cancelar.js
└── inscricao-voluntario.js
```
## Estrutura Inicial (versão sem backend)

- Esta primeira versão tem como objetivo validar o fluxo básico de interação entre **login → cadastro de ações → calendário → inscrição de voluntários → edição/cancelamento de inscrição**.
- Todo o funcionamento ocorre diretamente no navegador, utilizando **HTML, CSS e JavaScript**, sem necessidade de banco de dados.
---
**Autenticação**
- autenticacao.html → Página de login e criação de conta (formulário com usuário/senha).
- autenticacao.css → Estilos da tela de login (layout, cores, mensagens de erro/sucesso).
- autenticacao.js → Lógica de autenticação: valida credenciais, mostra feedback e salva sessão no localStorage.
**Função principal:** Garantir que apenas usuários autenticados possam acessar funcionalidades restritas, como cadastro de ações.
---
**Cadastro de Ações**
- cadastro-acoes.html → Formulário para cadastrar ações comunitárias (título, descrição, data, local, prioridade).
- cadastro-acoes.css → Estilos da tela de cadastro (formulário, botões, mensagens).
- cadastro-acoes.js → Validação dos campos, exibição de mensagens de erro em vermelho ou modal de sucesso. Também verifica se o usuário está logado antes de permitir o acesso.
**Função principal:** Permitir que líderes comunitários registrem ações de forma estruturada e rastreável.
---
**Calendário**
- calendario.html → Estrutura do calendário, com botões para alternar visualização (mês, semana, dia) e modal de detalhes rápidos.
- calendario.css → Estilos visuais do calendário (cores por prioridade, layout da grade, modal).
- calendario.js → Lógica de renderização das ações no calendário, alternância de visualização e abertura de detalhes. Lê as ações cadastradas e posiciona nos dias corretos.
**Função principal:** Oferecer uma visão clara e organizada das ações comunitárias cadastradas.
 --- 
**Inscrição de Voluntários**
- inscricao-voluntario.html → Página de inscrição, com formulário simples (nome e e-mail).
- inscricao-voluntario.css → Estilos da tela de inscrição (layout limpo, mensagens de sucesso/erro).
- inscricao-voluntario.js → Lógica da inscrição: valida dados, registra no localStorage e exibe feedback imediato.
**Função principal:** Simplificar o processo de participação dos voluntários, garantindo clareza e confiabilidade.

---
**Edição/Cancelamento de Inscrição**
- edicao_cancelar.html → Página para o voluntário editar ou cancelar sua inscrição em uma ação comunitária.
- edicao-cancelar.css → Estilos da tela de edição/cancelamento (formulário de edição, botões de confirmação).
- edicao-cancelar.js → Lógica para atualizar ou excluir inscrições, com confirmação antes de aplicar mudanças. Alterações são refletidas no histórico de inscrições armazenado no localStorage.
**Função principal:** Garantir autonomia ao voluntário para gerenciar sua participação em ações comunitárias.

---
## Procedimento para rodar o código
- Abra o explorador de arquivos (Windows).
- Clique duas vezes em `autenticacao.html` para iniciar o sistema.
- Faça login ou crie uma conta.
- Após login, acesse `cadastro-acoes.html` para cadastrar novas ações comunitárias.
- Visualize as ações no `calendario.html`.
- Clique em uma ação → o navegador exibirá os detalhes e a opção “Quero me inscrever”.
- O navegador abrirá `inscricao-voluntario.html`.
- Preencha os campos de nome e e-mail.
- O sistema exibirá uma mensagem de sucesso ou erro.
- Caso queira alterar ou cancelar sua inscrição, abra `edicao_cancelar.html`.

---

## Fluxo do Usuário
**Login (autenticacao.html)**  
- Usuário acessa o sistema.  
- Faz login ou cria conta.  
- Se válido, sessão é salva no `localStorage`.  

---

**Cadastro de Ações (cadastro-acoes.html)**  
- Apenas acessível se o usuário estiver logado.  
- Formulário com título, descrição, data, local e prioridade.  
- Validação feita pelo JS → mensagens de erro em vermelho ou modal de sucesso.  

---

**Calendário (calendario.html)**  
- Exibe os dias do mês atual em grade.  
- Mostra as ações cadastradas nas datas corretas.  
- Permite alternar entre visualização mensal, semanal e diária.  
- Ao clicar em uma ação, abre modal com detalhes rápidos e opção de inscrição.  

---

**Inscrição de Voluntários (inscricao-voluntario.html)**  
- Usuário preenche nome e e-mail.  
- Sistema valida os dados e confirma inscrição.  
- Feedback imediato: mensagem de sucesso ou erro.  
- Inscrição vinculada à ação escolhida e registrada no `localStorage`.  

---

**Edição/Cancelamento de Inscrição (edicao_cancelar.html)**  
- Voluntário acessa suas inscrições.  
- Pode editar dados (nome, e-mail) ou cancelar inscrição.  
- Cancelamento exige confirmação antes de excluir.  
- Alterações são refletidas imediatamente no sistema.  

---
---
## Stack Final do Sistema

- **Frontend:** React 18 + Vite
- **Backend:** Node.js + Express
- **Banco de dados:** PostgreSQL
- **ORM:** Prisma
---
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
---
## Funcionalidade Específica

**Backend (Node.js + Express + Prisma + PostgreSQL)**
- src/routes/ → Define as rotas da API (ex.: /users, /actions, /registrations).
- src/controllers/ → Contém a lógica de cada rota, ou seja, o que acontece quando um endpoint é chamado. Exemplo: ao chamar POST /registrations, o controller valida os dados e cria a inscrição no banco.
- src/middlewares/ → Funções que interceptam requisições antes de chegar ao controller (ex.: autenticação JWT, verificação de permissões).
- src/app.js → Configuração principal do Express (middlewares globais, uso de rotas, etc.).
- prisma/schema.prisma → Define os modelos do banco de dados (User → pessoas cadastradas, Action → ações comunitárias, Registration → inscrições dos voluntários).
- server.js → Ponto de entrada do servidor, inicializa o Express e conecta ao PostgreSQL.
- .env.example → Exemplo de variáveis de ambiente (porta, credenciais do banco, secret JWT).

---
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
