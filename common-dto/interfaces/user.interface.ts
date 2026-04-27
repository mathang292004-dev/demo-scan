import { Document } from 'mongoose'

export interface User extends Document{
    userName: string;
    name: string;
    email: string;
    password: string;
    role?: string;
}