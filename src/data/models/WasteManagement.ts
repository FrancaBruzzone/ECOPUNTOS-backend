import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
} from 'sequelize-typescript';
import { ClasificationWaste } from './enumerations/ClasificationWaste';
import ActivityType from './ActivityType';

@Table({ tableName: 'wastemanagements', timestamps: false })
class WasteManagement extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    public id!: number;

    @ForeignKey(() => ActivityType)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public activityTypeId!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    public weight!: number;

    @Column({
        type: DataType.ENUM(
            ClasificationWaste.Paper,
            ClasificationWaste.Plastic,
        ),
        allowNull: false,
    })
    public clasification!: ClasificationWaste;
}

export default WasteManagement;
