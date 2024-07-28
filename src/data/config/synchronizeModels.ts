import { getSequelizeInstance } from './sequelize';

export const synchronizeModels = async () => {
    try {
        // Conexión y autenticación a la base de datos
        const sequelize = getSequelizeInstance();
        await sequelize.authenticate();
        console.log('Conexión a la base de datos establecida');

        await sequelize.sync({ force: false });
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

export default synchronizeModels;
