import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '../models/User';
import PointsBalance from '../models/PointsBalance';
import Exchange from '../models/Exchange';
import Role from '../models/Role';
import Offer from '../models/Offer';
import Company from '../models/Company';
import Investment from '../models/Investment';
import SustainabilityActivity from '../models/SustainabilityActivity';
import UserSession from '../models/UserSession';
import Setting from '../models/Setting';
import Document from '../models/Document';
import ActivityType from '../models/ActivityType';
import Transport from '../models/Transport';
import WasteManagement from '../models/WasteManagement';
import UserRole from '../models/UserRole';
import UserCompany from '../models/UserCompany';

dotenv.config();

let sequelize: Sequelize | null = null;

export const getSequelizeInstance = (): Sequelize => {
    if (!sequelize) {
        // Configuración para producción con MySQL
        if (process.env.NODE_ENV === 'production') {
            sequelize = new Sequelize({
                dialect: 'mysql',
                host: process.env.DB_HOST,
                port: Number(process.env.DB_PORT) || 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_DATABASE,
                models: [
                    User,
                    PointsBalance,
                    Exchange,
                    Role,
                    Offer,
                    Company,
                    Investment,
                    SustainabilityActivity,
                    UserSession,
                    Setting,
                    Document,
                    ActivityType,
                    Transport,
                    WasteManagement,
                    UserRole,
                    UserCompany,
                ],
                logging: console.log,
            });
        } else {
            // Configuración para pruebas con SQLite en memoria
            sequelize = new Sequelize({
                dialect: 'sqlite',
                storage: ':memory:',
                models: [
                    User,
                    PointsBalance,
                    Exchange,
                    Role,
                    Offer,
                    Company,
                    Investment,
                    SustainabilityActivity,
                    UserSession,
                    Setting,
                    Document,
                    ActivityType,
                    Transport,
                    WasteManagement,
                    UserRole,
                    UserCompany,
                ],
                logging: false,
            });
        }
    }
    return sequelize;
};
