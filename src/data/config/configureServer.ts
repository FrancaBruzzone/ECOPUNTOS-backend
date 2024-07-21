import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import container from '../../di/container';
import { synchronizeModels } from './synchronizeModels';
import { MySqlConnection } from './MySqlConnection';
import { IUserService } from '../../interfaces/IUserService';
import userRoutes from '../../api/routes/UserRoutes';
import roleRoutes from '../../api/routes/RoleRoutes';
import companyRoutes from '../../api/routes/CompanyRoutes';
import { errorHandler } from '../../middlewares/errorHandler';
import { IRoleService } from '../../interfaces/IRoleService';
import { ICompanyService } from '../../interfaces/ICompanyService';

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

    const userService = container.resolve<IUserService>('IUserService');
    app.set('userService', userService);
    app.use('/api', userRoutes);

    const roleService = container.resolve<IRoleService>('IRoleService');
    app.set('roleService', roleService);
    app.use('/api', roleRoutes);

    const companyService =
        container.resolve<ICompanyService>('ICompanyService');
    app.set('companyService', companyService);
    app.use('/api', companyRoutes);

    app.use(errorHandler);

    return app;
};
