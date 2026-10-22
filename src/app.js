const express = require('express');
const path = require('path');
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuarioRoutes');
const authRoutes = require('./routes/authRoutes');
const produtoRoutes = require('./routes/produtoRoutes');
const movimentacaoRoutes = require('./routes/movimentacaoRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(usuarioRoutes);
app.use(authRoutes);
app.use(produtoRoutes);
app.use(movimentacaoRoutes);

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados'))
  .catch(err => console.error('Erro ao conectar:', err));

sequelize.sync();

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));