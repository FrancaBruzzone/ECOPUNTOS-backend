import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';
import { Gender } from './enumerations/Gender';

class User extends Model {
    public id!: number;
    public email!: string;
    public password!: string;
    public name?: string;
    public surname?: string;
    public gender?: string;
    public birthdate?: Date;
    public profilePicture?: string;
    public isActive!: boolean;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    get availablePoints(): number {
        // Lógica para calcular los puntos disponibles
        return 0;
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        surname: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM(Gender.Female, Gender.Male, Gender.Other),
            allowNull: true,
        },
        birthdate: {
            type: DataTypes.DATE,
            allowNull: true,
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
        modelName: 'User',
        tableName: 'users',
        timestamps: true,
    },
);

export default User;
