import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';
import { AvailableLanguage } from './enumerations/AvailableLanguage';

class Setting extends Model {
    public id!: number;
    public language!: string;

    // Relaciones entre entidades
    public userId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Setting.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        language: {
            type: DataTypes.ENUM(
                AvailableLanguage.Spanish,
                AvailableLanguage.English,
            ),
            allowNull: true,
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
        modelName: 'Setting',
        tableName: 'settings',
        timestamps: false,
    },
);

export default Setting;
