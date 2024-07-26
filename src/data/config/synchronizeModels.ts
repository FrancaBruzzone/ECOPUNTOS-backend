import User from '../models/User';
import PointsBalance from '../models/PointsBalance';
import { getSequelizeInstance } from './sequelize';
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

export const synchronizeModels = async () => {
    try {
        // Conexión y autenticación a la base de datos
        const sequelize = getSequelizeInstance();
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida');

        // Sincronización de los modelos
        await syncModel(User);
        await syncModel(Company);
        await syncModel(Role);
        await syncModel(PointsBalance);
        await syncModel(Setting);
        await syncModel(Offer);
        await syncModel(Exchange);
        await syncModel(UserSession);
        await syncModel(SustainabilityActivity);
        await syncModel(Investment);
        await syncModel(Document);
        await syncModel(ActivityType);
        await syncModel(Transport);
        await syncModel(WasteManagement);

        // Configuración de las relaciones entre modelos
        setupModelRelationships();

        await sequelize.sync();

        console.log(
            'Todos los modelos sincronizados y relaciones configuradas correctamente',
        );
    } catch (error) {
        console.error(
            'Error al conectar y sincronizar la base de datos:',
            error,
        );
        process.exit(1);
    }
};

async function syncModel(model: any) {
    try {
        await model.sync({ force: false });
        console.log(`Modelo ${model.name} sincronizado correctamente`);
    } catch (error) {
        console.error(`Error al sincronizar el modelo ${model.name}:`, error);
        throw error;
    }
}

function setupModelRelationships() {
    // Relaciones de la entidad User
    User.hasMany(PointsBalance, { foreignKey: 'userId' });
    User.belongsToMany(Role, {
        through: 'users_roles',
        foreignKey: 'userId',
        otherKey: 'roleId',
    });
    User.hasMany(Exchange, { foreignKey: 'userId' });
    User.hasMany(UserSession, { foreignKey: 'userId' });
    User.hasMany(Offer, { foreignKey: 'userId' });
    User.hasMany(SustainabilityActivity, { foreignKey: 'userId' });
    User.hasOne(Setting, { foreignKey: 'userId' });
    User.belongsToMany(Company, {
        through: 'users_companies',
        foreignKey: 'userId',
        otherKey: 'companyId',
    });

    // Relaciones de la entidad Setting
    Setting.belongsTo(User, { foreignKey: 'userId' });

    // Relaciones de la entidad Company
    Company.belongsToMany(User, {
        through: 'users_companies',
        foreignKey: 'companyId',
        otherKey: 'userId',
    });
    Company.hasMany(Offer, { foreignKey: 'companyId' });
    Company.hasMany(Investment, { foreignKey: 'companyId' });

    // Relaciones de la entidad Offer
    Offer.belongsTo(User, { foreignKey: 'userId' });
    Offer.belongsTo(Company, { foreignKey: 'companyId' });
    Offer.hasMany(Exchange, { as: 'exchanges', foreignKey: 'offerId' });

    // Relaciones de la entidad Exchange
    Exchange.belongsTo(User, { foreignKey: 'userId' });
    Exchange.belongsTo(Offer, { foreignKey: 'offerId' });

    // Relaciones de la entidad SustainabilityActivity
    SustainabilityActivity.belongsTo(User, { foreignKey: 'userId' });
    SustainabilityActivity.belongsTo(ActivityType, {
        foreignKey: 'activityTypeId',
    });
    SustainabilityActivity.hasMany(Document, {
        foreignKey: 'sustainabilityActivityId',
    });

    // Relaciones de la entidad Document
    Document.belongsTo(SustainabilityActivity, {
        foreignKey: 'sustainabilityActivityId',
    });
    Document.belongsTo(Investment, { foreignKey: 'investmentId' });

    // Relaciones de la entidad Investment
    Investment.belongsTo(Company, { foreignKey: 'companyId' });
    Investment.hasMany(Document, { foreignKey: 'investmentId' });

    // Relaciones de la entidad Role
    Role.belongsToMany(User, {
        through: 'users_roles',
        foreignKey: 'roleId',
        otherKey: 'userId',
    });

    // Relaciones de la entidad PointsBalance
    PointsBalance.belongsTo(User, { foreignKey: 'userId' });

    // Relaciones de la entidad UserSession
    UserSession.belongsTo(User, { foreignKey: 'userId' });

    // Relaciones de la entidad ActivityType
    ActivityType.hasMany(SustainabilityActivity, {
        foreignKey: 'activityTypeId',
    });
    ActivityType.hasMany(Transport, { foreignKey: 'activityTypeId' });
    ActivityType.hasMany(WasteManagement, { foreignKey: 'activityTypeId' });

    // Relaciones de la entidad Transport
    Transport.belongsTo(ActivityType, { foreignKey: 'activityTypeId' });

    // Relaciones de la entidad WasteManagement
    WasteManagement.belongsTo(ActivityType, { foreignKey: 'activityTypeId' });

    console.log('Relaciones entre modelos configuradas correctamente');
}

export default synchronizeModels;
