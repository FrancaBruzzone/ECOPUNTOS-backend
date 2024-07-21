import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { synchronizeModels } from './synchronizeModels';
import { MySqlConnection } from './MySqlConnection';

dotenv.config();

const mysqlConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
};

export const configureServer = async function () {
    const app = express();
    app.use(express.json());
    app.use(cors());

    const mysqlConnection = new MySqlConnection(mysqlConfig);

    await mysqlConnection
        .connect()
        .then(() => {
            console.log('Conexión exitosa a MySQL');
        })
        .catch((error) => {
            console.error('Error al conectar con MySQL:', error);
            process.exit(1);
        });

    await synchronizeModels();

    return app;
};
