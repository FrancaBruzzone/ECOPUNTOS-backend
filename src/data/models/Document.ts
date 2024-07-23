import { Model, DataTypes } from 'sequelize';
import { getSequelizeInstance } from '../config/sequelize';
import { DocumentFormat } from './enumerations/DocumentFormat';

class Document extends Model {
    public id!: number;
    public name!: string;
    public format!: DocumentFormat;
    public locationUrl!: string;

    // Relaciones entre entidades
    public sustainabilityActivityId!: number;
    public investmentId!: number;

    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Document.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        format: {
            type: DataTypes.ENUM(
                DocumentFormat.JPEG,
                DocumentFormat.PDF,
                DocumentFormat.PNG,
            ),
            allowNull: false,
        },
        locationUrl: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        sustainabilityActivityId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'sustainabilityactivities',
                key: 'id',
            },
        },
        investmentId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'investments',
                key: 'id',
            },
        },
    },
    {
        sequelize: getSequelizeInstance(),
        modelName: 'Document',
        tableName: 'documents',
        timestamps: true,
    },
);

export default Document;
