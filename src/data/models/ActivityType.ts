import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'activitytypes', timestamps: true })
class ActivityType extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    public id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public title!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public description!: string;
}

export default ActivityType;
