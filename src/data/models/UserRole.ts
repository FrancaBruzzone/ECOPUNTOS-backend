import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import User from './User';
import Role from './Role';

@Table({ tableName: 'users_roles', timestamps: false })
class UserRole extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Role)
    @Column
    roleId!: number;
}

export default UserRole;
