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
- Login seguro com armazenamento de sessão.
- Recuperação e alteração de senha.

### 2. Cadastro de ações comunitárias
- Formulário com título, descrição, data, local, prioridade e **categoria**.
- Campo numérico para **limite de vagas**.
- Validação em tempo real.
- Associação da ação ao líder responsável.

### 3. Gestão de vagas
- Contador visual de inscritos versus limite.
- Barra de progresso indicando ocupação.
- Mensagens dinâmicas: “Vagas disponíveis”, “Limite atingido”, “Vagas esgotadas”.

### 4. Visualização em calendário
- Alternância entre visão mensal, semanal e diária.
- Exibição das ações nas datas corretas.
- Modal de detalhes rápidos com opção de inscrição.

### 5. Inscrição de voluntários
- Formulário simples (nome e e-mail).
- Feedback imediato de sucesso ou erro.
- Registro automático vinculado ao voluntário e à ação.
- Integração com o módulo de vagas.

### 6. Painel de inscrições
- Lista consolidada de voluntários inscritos por ação.
- Filtros por ação, data e status.
- Exportação de dados para relatórios.

### 7. Edição e cancelamento de inscrição
- Voluntário pode editar dados ou cancelar inscrição.
- Confirmação antes de excluir.
- Alterações refletidas no histórico.

### 8. Relatórios gerenciais
- Estatísticas sobre número de inscritos por ação.
- Indicadores de engajamento comunitário.
- Relatórios consolidados com gráficos e tabelas.
- Transparência e rastreabilidade das iniciativas.
  
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
│   ├── inscricao-voluntario.html
│   ├── painel-inscricoes.html
│   └── relatorios-acoes.html
├── css/
│   ├── autenticacao.css
│   ├── cadastro-acoes.css
│   ├── calendario.css
│   ├── edicao-cancelar.css
│   ├── inscricao-voluntario.css
│   ├── painel-inscricoes.css
│   └── relatorios-acoes.css
└── js/
    ├── autenticacao.js
    ├── cadastro-acoes.js
    ├── calendario.js
    ├── edicao-cancelar.js
    ├── inscricao-voluntario.js
    ├── painel-inscricoes.js
    └── relatorios-acoes.js

```
## Estrutura Inicial (versão sem backend)

Esta primeira versão valida o fluxo básico de interação entre:

**Login → Cadastro de Ações → Calendário → Inscrição de Voluntários → Edição/Cancelamento → Painel de Inscrições → Relatórios**

Todo o funcionamento ocorre diretamente no navegador, utilizando **HTML, CSS e JavaScript**, sem necessidade de banco de dados.

---

### Autenticação
- `autenticacao.html` → Página de login e criação de conta.
- `autenticacao.css` → Estilos da tela de login.
- `autenticacao.js` → Lógica de autenticação: valida credenciais, mostra feedback e salva sessão no `localStorage`.

**Função principal:** Garantir que apenas usuários autenticados possam acessar funcionalidades restritas.

---

### Cadastro de Ações
- `cadastro-acoes.html` → Formulário para cadastrar ações (título, descrição, data, local, prioridade, categoria, limite de vagas).
- `cadastro-acoes.css` → Estilos da tela de cadastro.
- `cadastro-acoes.js` → Validação dos campos, mensagens de erro/sucesso, controle de vagas.

**Função principal:** Permitir que líderes registrem ações de forma estruturada e rastreável.

---

### Calendário
- `calendario.html` → Estrutura do calendário (mês, semana, dia).
- `calendario.css` → Estilos visuais do calendário.
- `calendario.js` → Renderização das ações, alternância de visualização, modal de detalhes.

**Função principal:** Oferecer visão clara e organizada das ações comunitárias.

---

### Inscrição de Voluntários
- `inscricao-voluntario.html` → Página de inscrição (nome e e-mail).
- `inscricao-voluntario.css` → Estilos da tela de inscrição.
- `inscricao-voluntario.js` → Lógica da inscrição: valida dados, registra no `localStorage`, feedback imediato.

**Função principal:** Simplificar o processo de participação dos voluntários.

---

### Confirmação de Inscrição
- Feedback imediato após inscrição:
  - **Sucesso** → inscrição concluída.
  - **Erro** → campos obrigatórios não preenchidos.

**Função principal:** Garantir clareza e confiança no processo.

---

### Edição/Cancelamento de Inscrição
- `edicao_cancelar.html` → Página para editar ou cancelar inscrição.
- `edicao-cancelar.css` → Estilos da tela de edição/cancelamento.
- `edicao-cancelar.js` → Lógica para atualizar ou excluir inscrições, com confirmação.

**Função principal:** Garantir autonomia ao voluntário.

---

### Painel de Inscrições
- `painel-inscricoes.html` → Lista consolidada de voluntários inscritos por ação.
- `painel-inscricoes.css` → Estilos do painel.
- `painel-inscricoes.js` → Lógica para exibir inscritos, aplicar filtros e exportar dados.

**Função principal:** Permitir que líderes acompanhem e gerenciem inscrições.

---

### Relatórios de Ações
- `relatorios-acoes.html` → Página de relatórios gerenciais.
- `relatorios-acoes.css` → Estilos dos relatórios (gráficos, tabelas).
- `relatorios-acoes.js` → Lógica para gerar estatísticas e indicadores.

**Função principal:** Fornecer transparência e métricas de engajamento comunitário.

---

## Procedimento para rodar o código
1. Abra o explorador de arquivos (Windows).
2. Clique duas vezes em `autenticacao.html` para iniciar o sistema.
3. Faça login ou crie uma conta.
4. Após login, acesse `cadastro-acoes.html` para cadastrar novas ações.
5. Visualize as ações no `calendario.html`.
6. Clique em uma ação → opção **“Quero me inscrever”**.
7. O navegador abrirá `inscricao-voluntario.html`.
8. Preencha os campos de nome e e-mail.
9. O sistema exibirá mensagem de sucesso ou erro.
10. Para editar ou cancelar inscrição, abra `edicao_cancelar.html`.
11. Para acompanhar inscritos, abra `painel-inscricoes.html`.
12. Para relatórios gerenciais, abra `relatorios-acoes.html`.
---

# Fluxo do Usuário — Vizinhaça Digital

Consiste em descrver o fluxo completo de interação do usuário dentro do sistema **Vizinhaça Digital**, desde o login até relatórios gerenciais.

---

## 1. Login e Autenticação
- Usuário acessa `autenticacao.html`.
- Faz login ou cria conta.
- Se válido, sessão é salva no `localStorage` (versão inicial) ou JWT (versão final).
- Apenas usuários autenticados podem acessar módulos restritos.

**Função principal:** Garantir acesso seguro e diferenciado por perfil (líder comunitário ou voluntário).

---

## 2. Cadastro de Ações
- Líder comunitário acessa `cadastro-acoes.html`.
- Preenche formulário com:
  - Título
  - Descrição
  - Data
  - Local
  - Prioridade
  - Categoria
  - Limite de vagas
- Sistema valida os campos e exibe mensagens de erro/sucesso.
- A ação é registrada e aparece na tabela e no calendário.

**Função principal:** Permitir registro estruturado e rastreável das ações.

---

## 3. Gestão de Vagas
- Cada ação possui um **limite de vagas** definido.
- Contador mostra **inscritos / limite**.
- Barra de progresso indica ocupação.
- Mensagens dinâmicas:
  - Verde → “Vagas disponíveis”
  - Laranja → “Limite atingido”
  - Vermelho → “Vagas esgotadas”

**Função principal:** Controlar ocupação de vagas em tempo real.

---

## 4. Visualização em Calendário
- Usuário acessa `calendario.html`.
- Alterna entre visualização **mensal, semanal e diária**.
- Ações cadastradas aparecem nas datas corretas.
- Ao clicar em uma ação, abre modal com detalhes e opção de inscrição.

**Função principal:** Oferecer visão clara e organizada das ações comunitárias.

---

## 5. Inscrição de Voluntários
- Voluntário acessa `inscricao-voluntario.html`.
- Preenche formulário simples (nome e e-mail).
- Sistema valida dados e registra inscrição no `localStorage`.
- Feedback imediato: sucesso ou erro.
- Contador de vagas é atualizado dinamicamente.

**Função principal:** Simplificar participação dos voluntários.

---

## 6. Confirmação de Inscrição
- Após inscrição, voluntário recebe retorno imediato:
  - **Sucesso** → inscrição concluída.
  - **Erro** → campos obrigatórios não preenchidos.

**Função principal:** Garantir clareza e confiança no processo.

---

## 7. Edição e Cancelamento de Inscrição
- Voluntário acessa `edicao_cancelar.html`.
- Pode editar dados ou cancelar inscrição.
- Sistema solicita confirmação antes de excluir.
- Alterações refletidas no histórico de inscrições.

**Função principal:** Garantir autonomia ao voluntário.

---

## 8. Painel de Inscrições
- Líder acessa `painel-inscricoes.html`.
- Visualiza lista consolidada de voluntários inscritos por ação.
- Aplica filtros por ação, data e status.
- Exporta dados para relatórios.

**Função principal:** Permitir acompanhamento e gestão das inscrições.

---

## 9. Relatórios de Ações
- Líder acessa `relatorios-acoes.html`.
- Sistema gera estatísticas:
  - Número de inscritos
  - Ocupação de vagas
  - Engajamento comunitário
- Exibe gráficos e tabelas consolidadas.

**Função principal:** Fornecer transparência e métricas de engajamento.

---

## Resumo do Fluxo

**Login → Cadastro de Ações (com categorias e limite de vagas) → Gestão de Vagas → Calendário → Inscrição de Voluntários → Confirmação → Edição/Cancelamento → Painel de Inscrições → Relatórios**

---
  
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

### Backend (Node.js + Express + Prisma + PostgreSQL)
- **src/routes/** → Define rotas da API (`/users`, `/actions`, `/registrations`, `/reports`).  
- **src/controllers/** → Lógica dos endpoints (ex.: `POST /registrations` cria inscrição).  
- **src/middlewares/** → Autenticação JWT e verificação de permissões.  
- **src/app.js** → Configuração principal do Express.  
- **prisma/schema.prisma** → Modelos do banco (`User`, `Action`, `Registration`).  
- **server.js** → Inicializa servidor e conecta ao PostgreSQL.  
- **.env.example** → Variáveis de ambiente (porta, credenciais, secret JWT).  

### Frontend (React + Vite)
- **src/pages/** → Páginas principais:  
  - `Login.jsx` → Autenticação de usuários.  
  - `Home.jsx` → Lista de ações comunitárias.  
  - `Actions.jsx` → Gerenciamento de ações (líderes).  
  - `ActionDetail.jsx` → Detalhes da ação e inscrição.  
  - `Reports.jsx` → Relatórios gerenciais.  
- **src/components/** → Componentes reutilizáveis (inputs, botões, barra de progresso, alertas).  
- **src/services/api.js** → Configuração do Axios para consumir API.  
- **App.jsx** → Define rotas principais.  
- **main.jsx** → Ponto de entrada do React.  

---

## Funcionamento para rodar o código

### Pré-requisitos
- Node.js 18+  
- PostgreSQL rodando localmente  

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Editar .env com credenciais do PostgreSQL
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
| `Registration` | id, userId, actionId, status                                       |
```
```
## Endpoints disponíveis
- GET /health — health check
- POST /login — autenticação de usuários
- POST /register — criação de conta
- POST /actions — cadastro de ações
- GET /actions — listar ações
- GET /actions/:id — detalhes de uma ação
- POST /registrations — inscrição em ação
- PUT /registrations/:id — edição de inscrição
- DELETE /registrations/:id — cancelamento de inscrição
- GET /registrations?actionId=:id — lista de inscritos por ação
- GET /reports/actions — relatórios gerenciais

```
```

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



### 11. Relatórios das ações realizadas
**Como líder da ação comunitária, quero gerar relatórios das ações realizadas, para avaliar resultados e planejar futuras atividades.**

- Criar módulo de relatórios com estatísticas:
  - Número de inscritos
  - Presença
  - Prioridade das ações

---

### 12. Acompanhamento de inscrições
**Como líder da ação comunitária, quero acompanhar inscrições dos voluntários, para saber quem participará de cada ação.**

- Implementar painel que liste voluntários inscritos em cada ação.
- Permitir filtros por ação, data e status.
- Exportar dados para relatórios.

---

### 13. Recuperação de senha
**Como voluntário, quero recuperar minha senha, para acessar o sistema caso eu esqueça minhas credenciais.**

- Implementar fluxo de recuperação de senha via e-mail.
- Enviar link seguro para redefinição.

---

### 14. Atualização de senha
**Como voluntário, quero atualizar minha senha, para manter minha conta segura.**

- Criar opção de alteração de senha no perfil.
- Validar senha antiga antes de permitir alteração.

---

### 15. Limite de vagas
**Como líder comunitário, quero definir limite de vagas em cada ação, para controlar o número de participantes.**

- Adicionar campo de limite de vagas no cadastro de ações.
- Exibir contador de inscritos versus limite.
- Mostrar mensagens dinâmicas (disponível, limite atingido, esgotado).

---

### 16. Categorias de ações
**Como líder da ação comunitária, quero definir categorias para as ações (ex.: saúde, educação, meio ambiente), para organizar melhor os eventos.**

- Adicionar campo de categoria no cadastro de ações.
- Permitir filtragem e organização por categoria.

---

## Resumo
Essas histórias de usuário complementam o fluxo já existente, garantindo que o sistema **Vizinhaça Digital** ofereça:
- **Transparência** (relatórios e painel de inscrições).  
- **Segurança** (recuperação e atualização de senha).  
- **Organização** (limite de vagas e categorias).  
