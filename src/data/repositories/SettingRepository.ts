import { Repository } from './Repository';
import Setting from '../models/Setting';

export class SettingRepository extends Repository<Setting> {
    constructor() {
        super(Setting);
    }

    // Métodos específicos para Setting
}
