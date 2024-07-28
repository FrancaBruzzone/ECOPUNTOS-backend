import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import User from './User';
import { AvailableLanguage } from './enumerations/AvailableLanguage';

@Table({ tableName: 'settings', timestamps: false })
class Setting extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    public id!: number;

    @Column({
        type: DataType.ENUM(
            AvailableLanguage.Spanish,
            AvailableLanguage.English,
        ),
        allowNull: true,
    })
    public language!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public userId!: number;

    public user?: User;
}

export default Setting;
