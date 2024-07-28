import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import User from './User';
import Offer from './Offer';
import { ExchangeState } from './enumerations/ExchangeState';

@Table({ tableName: 'exchanges', timestamps: true })
class Exchange extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    public id!: number;

    @Column({
        type: DataType.ENUM(
            ExchangeState.Pending,
            ExchangeState.Cancelled,
            ExchangeState.Completed,
            ExchangeState.InProgress,
        ),
        allowNull: false,
    })
    public state!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public pointsUsed!: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    public amountInCurrency!: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public userId!: number;

    @ForeignKey(() => Offer)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public offerId!: number;

    public user?: User;
    public offer?: Offer;
}

export default Exchange;
