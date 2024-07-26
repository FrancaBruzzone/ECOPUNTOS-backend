import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';
import { ExchangeState } from './enumerations/ExchangeState';

class Exchange extends Model {
    public id!: number;
    public state!: string;
    public pointsUsed!: number;
    public amountInCurrency!: number;

    // Relaciones entre entidades
    public userId!: number;
    public offerId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Exchange.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        state: {
            type: DataTypes.ENUM(
                ExchangeState.Pending,
                ExchangeState.Cancelled,
                ExchangeState.Completed,
                ExchangeState.InProgress,
            ),
            allowNull: false,
        },
        pointsUsed: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        amountInCurrency: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
        },
        offerId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'offers',
                key: 'id',
            },
        },
    },
    {
        sequelize: getSequelizeInstance(),
        modelName: 'Exchange',
        tableName: 'exchanges',
        timestamps: true,
    },
);

export default Exchange;
