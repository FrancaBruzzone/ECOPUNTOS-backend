import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';

class ActivityType extends Model {
    public id!: number;
    public title!: string;
    public description!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ActivityType.init(
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
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize: getSequelizeInstance(),
        modelName: 'ActivityType',
        tableName: 'activitytypes',
        timestamps: true,
    },
);

export default ActivityType;
