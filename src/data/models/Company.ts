import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';

class Company extends Model {
    public id!: number;
    public name!: string;
    public profilePicture?: string;
    public isActive!: boolean;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Company.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        profilePicture: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize: getSequelizeInstance(),
        modelName: 'Company',
        tableName: 'companies',
        timestamps: true,
    },
);

export default Company;
