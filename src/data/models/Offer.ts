import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';

class Offer extends Model {
    public id!: number;
    public code!: number;
    public name!: string;
    public description!: string;
    public stock?: number;
    public amount!: number;
    public minPointsRequired!: number;
    public maxPointsRequired!: number;
    public productPicture?: string;
    public isActive?: boolean;
    public allowsCancelExchange!: boolean;
    public exchangeCompletedCount!: number;

    // Relaciones entre entidades
    public companyId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Offer.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        minPointsRequired: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        maxPointsRequired: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        productPicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        allowsCancelExchange: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        exchangeCompletedCount: {
            type: DataTypes.INTEGER,
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
        modelName: 'Offer',
        tableName: 'offers',
        timestamps: true,
    },
);

export default Offer;
