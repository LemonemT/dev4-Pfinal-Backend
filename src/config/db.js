import { Sequelize } from 'sequelize';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE, DB_PORT } from './config.js';

const sequelize = new Sequelize(`mysql://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_DATABASE}`, {
    dialect: 'mysql',
    logging: false,
});

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conectado a la base de datos');
    } catch (error) {
        console.error('Error en la conexión:', error);
    }
};

export default sequelize;
