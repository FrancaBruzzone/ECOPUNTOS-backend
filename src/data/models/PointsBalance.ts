import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';
import { FinancialOperations } from './enumerations/FinancialOperations';

class PointsBalance extends Model {
    public id!: number;
    public initialBalance!: number;
    public finalBalance!: number;
    public operation!: string;

    // Relaciones entre entidades
    public userId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

PointsBalance.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        initialBalance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        finalBalance: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        operation: {
            type: DataTypes.ENUM(
                FinancialOperations.Debit,
                FinancialOperations.Credit,
            ),
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
    },
    {
        sequelize: getSequelizeInstance(),
        modelName: 'PointsBalance',
        tableName: 'pointsbalances',
        timestamps: true,
    },
);

export default PointsBalance;
