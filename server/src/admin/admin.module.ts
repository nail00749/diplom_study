import {Module} from '@nestjs/common';
import {AdminService} from './admin.service';
import {AdminController} from './admin.controller';
import {UsersService} from '../users/users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {User, UserSchema} from '../users/schemas/user.schema';
import {FileService} from "../file/file.service";
import {RegisterLink, RegisterLinkSchema} from "./schemas/register-link.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
        MongooseModule.forFeature([{name: RegisterLink.name, schema: RegisterLinkSchema}])
    ],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService]
})
export class AdminModule {
}
