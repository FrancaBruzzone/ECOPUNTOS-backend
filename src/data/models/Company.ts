import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'companies', timestamps: true })
class Company extends Model {
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
        type: DataType.STRING,
        allowNull: true,
    })
    public profilePicture?: string;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    public isActive!: boolean;
}

export default Company;
