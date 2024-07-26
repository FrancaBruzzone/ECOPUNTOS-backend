import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import Company from './Company';
import User from './User';

@Table({ tableName: 'offers', timestamps: true })
class Offer extends Model {
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
    public code!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public name!: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public description!: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    public stock?: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    })
    public amount!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    public minPointsRequired!: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    public maxPointsRequired?: number;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    public productPicture?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    public isActive!: boolean;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    public allowsCancelExchange!: boolean;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    public exchangeCompletedCount!: number;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    public companyId?: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public userId!: number;

    // Relaciones entre entidades
    public company?: Company;
}

export default Offer;
