import { Connection } from 'mongoose';
import { UserSchema } from './user/schema/user.schema';


export const AuthProviders = [

    {
        provide: 'USER_MODEL',
        useFactory: (connection: Connection) => connection.model('roles', UserSchema),
        inject: ['DATABASE_CONNECTION']
    },
    // {
    //     provide: 'ROLES_MODEL',
    //     useFactory: (connection: Connection) => connection.model('roles', RoleSchema),
    //     inject: ['DATABASE_CONNECTION']
    // },
]