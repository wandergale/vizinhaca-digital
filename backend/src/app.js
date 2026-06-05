const express = require('express');
const cors = require('cors');

const { authRoutes, actionsRoutes, registrationsRoutes } = require('./routes');
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
app.use('/auth', authRoutes);
app.use('/actions', actionsRoutes);
app.use('/registrations', registrationsRoutes);

// Middleware de tratamento de erros
app.use(errorMiddleware);

module.exports = app;