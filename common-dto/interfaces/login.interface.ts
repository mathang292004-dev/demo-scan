import { Document } from "mongoose";

export interface Login extends Document{
    username: string,
    password: string
}