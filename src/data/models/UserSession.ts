import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import User from './User';

@Table({ tableName: 'usersessions', timestamps: false })
class UserSession extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    public id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    public sessionId!: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    public isEnabled?: boolean;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public userId!: number;

    // Relaciones entre entidades
    public user?: User;
}

export default UserSession;
