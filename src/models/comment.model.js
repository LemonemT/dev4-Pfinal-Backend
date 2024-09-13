import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const Comentario = sequelize.define('Comentario', {
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  timestamps: true, 
  createdAt: 'created_at', 
  updatedAt: false 
});

export default Comentario;
