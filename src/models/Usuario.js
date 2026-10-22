const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = sequelize.define('Usuario', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.ENUM('operador de almoxarifado', 'administrador do sistema'), allowNull: false },
});
module.exports = Usuario;