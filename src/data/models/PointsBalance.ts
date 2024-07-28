import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import User from './User';
import { FinancialOperations } from './enumerations/FinancialOperations';

@Table({ tableName: 'pointsbalances', timestamps: true })
class PointsBalance extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    public id!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public initialBalance!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public finalBalance!: number;

    @Column({
        type: DataType.ENUM(
            FinancialOperations.Debit,
            FinancialOperations.Credit,
        ),
        allowNull: false,
    })
    public operation!: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public userId!: number;

    // Relaciones entre entidades
    public user?: User;
}

export default PointsBalance;
