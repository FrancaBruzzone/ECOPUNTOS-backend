import {
    Table,
    Column,
    Model,
    HasMany,
    BelongsToMany,
    HasOne,
    BeforeSave,
} from 'sequelize-typescript';
import PointsBalance from './PointsBalance';
import Role from './Role';
import Exchange from './Exchange';
import UserSession from './UserSession';
import Offer from './Offer';
import SustainabilityActivity from './SustainabilityActivity';
import Setting from './Setting';
import Company from './Company';
import bcrypt from 'bcrypt';
import UserRole from './UserRole';
import UserCompany from './UserCompany';

@Table({ tableName: 'users', timestamps: true })
class User extends Model {
    @Column
    email!: string;

    @Column
    password!: string;

    @Column
    name?: string;

    @Column
    surname?: string;

    @Column
    gender?: string;

    @Column
    birthdate?: Date;

    @Column
    profilePicture?: string;

    @Column
    isActive!: boolean;

    @HasMany(() => PointsBalance)
    pointsBalances!: PointsBalance[];

    @BelongsToMany(() => Role, () => UserRole)
    roles!: Role[];

    @HasMany(() => Exchange)
    exchanges!: Exchange[];

    @HasMany(() => UserSession)
    userSessions!: UserSession[];

    @HasMany(() => Offer)
    offers!: Offer[];

    @HasMany(() => SustainabilityActivity)
    sustainabilityActivities!: SustainabilityActivity[];

    @HasOne(() => Setting)
    setting!: Setting;

    @BelongsToMany(() => Company, () => UserCompany)
    companies!: Company[];

    @BeforeSave
    static async hashPassword(user: User) {
        if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
        }
    }

    get availablePoints(): number {
        // Lógica para calcular los puntos disponibles
        return 0;
    }

    public async comparePassword(candidatePassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, this.password);
    }
}

export default User;
