import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import ActivityType from './ActivityType';
import { TransportType } from './enumerations/TransportType';

@Table({ tableName: 'transports', timestamps: false })
class Transport extends Model {
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
        unique: true,
    })
    public activityTypeId!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    public distance!: number;

    @Column({
        type: DataType.ENUM(
            TransportType.Bicycle,
            TransportType.PublicTransport,
            TransportType.Walk,
        ),
        allowNull: false,
    })
    public type!: string;

    // Relaciones entre entidades
    public activityType?: ActivityType;
}

export default Transport;
