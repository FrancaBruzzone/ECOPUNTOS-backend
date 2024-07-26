import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';

class UserSession extends Model {
    public id!: number;
    public sessionId!: string;
    public isEnabled?: boolean;

    // Relaciones entre entidades
    public userId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

UserSession.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        sessionId: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        isEnabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
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
        modelName: 'UserSession',
        tableName: 'usersessions',
        timestamps: false,
    },
);

export default UserSession;
