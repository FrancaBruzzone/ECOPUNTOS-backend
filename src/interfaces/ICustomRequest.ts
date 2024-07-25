import { Request } from 'express';
import User from '../data/models/User';

export interface ICustomRequest extends Request {
    user: User;
    token: string;
}
