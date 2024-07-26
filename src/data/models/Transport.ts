import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';
import { TransportType } from './enumerations/TransportType';

class Transport extends Model {
    public id!: number;
    public activityTypeId!: number;
    public distance!: number;
    public type!: string;
}

Transport.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        activityTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'activitytypes',
                key: 'id',
            },
        },
        distance: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(
                TransportType.Bicycle,
                TransportType.PublicTransport,
                TransportType.Walk,
            ),
            allowNull: false,
        },
    },
    {
        sequelize: getSequelizeInstance(),
        modelName: 'Transport',
        tableName: 'transports',
        timestamps: false,
    },
);

export default Transport;
