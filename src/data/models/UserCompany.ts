import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import User from './User';
import Company from './Company';

@Table({ tableName: 'users_companies', timestamps: false })
class UserCompany extends Model {
    @ForeignKey(() => User)
    @Column
    userId!: number;

    @ForeignKey(() => Company)
    @Column
    companyId!: number;
}

export default UserCompany;
