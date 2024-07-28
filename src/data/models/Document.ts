import {
    Table,
    Column,
    Model,
    ForeignKey,
    DataType,
} from 'sequelize-typescript';
import { DocumentFormat } from './enumerations/DocumentFormat';
import SustainabilityActivity from './SustainabilityActivity';
import Investment from './Investment';

@Table({ tableName: 'documents', timestamps: true })
class Document extends Model {
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
    public name!: string;

    @Column({
        type: DataType.ENUM(
            DocumentFormat.JPEG,
            DocumentFormat.PDF,
            DocumentFormat.PNG,
        ),
        allowNull: false,
    })
    public format!: DocumentFormat;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    public locationUrl!: string;

    @ForeignKey(() => SustainabilityActivity)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    public sustainabilityActivityId?: number;

    @ForeignKey(() => Investment)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
    })
    public investmentId?: number;

    // Relaciones entre entidades
    public sustainabilityActivity?: SustainabilityActivity;
    public investment?: Investment;
}

export default Document;
