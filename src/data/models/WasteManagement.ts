import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';
import { ClasificationWaste } from './enumerations/ClasificationWaste';

class WasteManagement extends Model {
    public id!: number;
    public activityTypeId!: number;
    public weight!: number;
    public clasification!: string;
}

WasteManagement.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        activityTypeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true,
            references: {
                model: 'activitytypes',
                key: 'id',
            },
        },
        weight: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        clasification: {
            type: DataTypes.ENUM(
                ClasificationWaste.Paper,
                ClasificationWaste.Plastic,
            ),
            allowNull: false,
        },
    },
    {
        sequelize: getSequelizeInstance(),
        modelName: 'WasteManagement',
        tableName: 'wastemanagements',
        timestamps: false,
    },
);

export default WasteManagement;
