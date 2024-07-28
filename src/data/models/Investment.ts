import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import Company from './Company';
import { InvestmentType } from './enumerations/InvestmentType';

@Table({ tableName: 'investments', timestamps: true })
class Investment extends Model {
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
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    public amount!: number;

    @Column({
        type: DataType.DATE,
        allowNull: false,
    })
    public doneAt!: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public description!: string;

    @Column({
        type: DataType.ENUM(
            InvestmentType.BasicService,
            InvestmentType.Courses,
            InvestmentType.ProductPurchase,
        ),
        allowNull: false,
    })
    public type!: string;

    @ForeignKey(() => Company)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    public companyId!: number;

    // Relaciones entre entidades
    public company?: Company;
}

export default Investment;
