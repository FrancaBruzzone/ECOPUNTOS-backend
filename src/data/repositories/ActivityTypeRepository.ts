import { Repository } from './Repository';
import ActivityType from '../models/ActivityType';

export class ActivityTypeRepository extends Repository<ActivityType> {
    constructor() {
        super(ActivityType);
    }

    // Métodos específicos para ActivityType
}
