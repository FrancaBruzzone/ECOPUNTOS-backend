import { Repository } from './Repository';
import PointsBalance from '../models/PointsBalance';

export class PointsBalanceRepository extends Repository<PointsBalance> {
    constructor() {
        super(PointsBalance);
    }

    // Métodos específicos para PointsBalance
}
