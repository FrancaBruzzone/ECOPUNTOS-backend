import { Table, Column, Model } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table({ tableName: 'roles', timestamps: false })
class Role extends Model {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    public id!: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        set(value: string) {
            this.setDataValue('name', value.toUpperCase());
        },
        get() {
            const name = this.getDataValue('name');
            return name ? name.toUpperCase() : '';
        },
    })
    public name!: string;
}

export default Role;
