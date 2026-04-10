const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth.routes');
const actionsRoutes = require('./routes/actions.routes');
const registrationsRoutes = require('./routes/registrations.routes');

const app = express();

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

module.exports = app;
