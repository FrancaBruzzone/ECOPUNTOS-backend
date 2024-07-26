import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';
import { InvestmentType } from './enumerations/InvestmentType';

class Investment extends Model {
    public id!: number;
    public title!: string;
    public amount!: number;
    public doneAt!: Date;
    public description!: string;
    public type!: string;

    // Relaciones entre entidades
    public companyId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Investment.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        doneAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        type: {
            type: DataTypes.ENUM(
                InvestmentType.BasicService,
                InvestmentType.Courses,
                InvestmentType.ProductPurchase,
            ),
            allowNull: false,
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'companies',
                key: 'id',
            },
        },
    },
    {
        sequelize: getSequelizeInstance(),
        modelName: 'Investment',
        tableName: 'investments',
        timestamps: true,
    },
);

export default Investment;
