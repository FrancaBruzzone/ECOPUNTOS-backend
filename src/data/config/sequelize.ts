import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

let sequelize: Sequelize | null = null;

export const getSequelizeInstance = () => {
    if (!sequelize) {
        if (process.env.NODE_ENV === 'production') {
            // Configuración para producción con MySQL
            sequelize = new Sequelize({
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT) || 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
            });
        } else {
            // Configuración para pruebas con SQLite en memoria
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                logging: false,
            });
        }
    }
    return sequelize;
};
