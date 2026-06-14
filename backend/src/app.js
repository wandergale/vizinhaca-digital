const express = require('express');
const cors = require('cors');

const { authRoutes, actionRoutes, registrationRoutes, notificationRoutes, messageRoutes } = require('./routes');
const errorMiddleware = require('./middlewares/errorMiddleware');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Rotas
app.use('/auth', authRoutes); // Rota para autenticação
app.use('/actions', actionRoutes); // Rota para ações comunitárias
app.use('/registrations', registrationRoutes); // Rota para inscrições
app.use('/notifications', notificationRoutes); // Rota para notificações
app.use('/messages', messageRoutes); // Rota para mensagens

// Middleware de tratamento de erros
app.use(errorMiddleware);

module.exports = app;