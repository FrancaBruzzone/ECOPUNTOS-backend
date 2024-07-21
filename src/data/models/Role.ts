import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';

class Role extends Model {
    public id!: number;
    public name!: string;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Role.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            set(value: string) {
                this.setDataValue('name', value.toUpperCase());
            },
            get() {
                const name = this.getDataValue('name');
                return name ? name.toUpperCase() : '';
            },
        },
    },
    {
        sequelize: getSequelizeInstance(),
        modelName: 'Role',
        tableName: 'roles',
        timestamps: false,
    },
);

export default Role;
