import { sequelize } from '../config/db.js';

import { DataTypes } from 'sequelize';

const Usuario = sequelize.define('Usuario', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('residente', 'administrador'),
    defaultValue: 'residente'
  }
}, {
  timestamps: true, 
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Usuario;
