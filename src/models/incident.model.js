import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Incident = sequelize.define('Incident', {
  subject: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  images: {
    type: DataTypes.JSONB, 
    allowNull: true,
    defaultValue: []
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pending' 
  }
});

export default Incident;
