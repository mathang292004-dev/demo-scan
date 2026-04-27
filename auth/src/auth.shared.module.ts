import { Module } from "@nestjs/common";
import { DatabaseModule } from "./config/database.provider";
import { AuthProviders } from "./auth.provider";
import { CommonService } from "./service/common.service";

@Module({
    imports:[DatabaseModule],
    providers:[
        ...AuthProviders,
        CommonService
    ],
    exports:[
        ...AuthProviders,
        CommonService,
        DatabaseModule
    ]
})
export class AuthSharedModule{}