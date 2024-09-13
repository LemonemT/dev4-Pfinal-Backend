import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js'; 

const Incident = sequelize.define('Incident', {
  titulo: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  ubicacion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('reportada', 'en proceso', 'resuelta'),
    defaultValue: 'reportada'
  },
  imagenes: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  timestamps: true, 
  createdAt: 'created_at', 
  updatedAt: 'updated_at' 
});

export default Incident;
