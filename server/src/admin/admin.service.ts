import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from '../users/schemas/user.schema';
import {Model} from 'mongoose';
import {UpdateUserDto} from '../users/dto/update-user.dto';
import {RegisterLink, RegisterLinkDocument} from "./schemas/register-link.schema";
import * as uuid from 'uuid'

@Injectable()
export class AdminService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
                @InjectModel(RegisterLink.name) private readonly registerLinkModel: Model<RegisterLinkDocument>) {
    }

    createRegisterLink() {
        const link = uuid.v4()
        return this.registerLinkModel.create({link})
    }

    getRegisterLink(link: string) {
        return this.registerLinkModel.findOne({link})
    }

    removeRegisterLink(link: string) {
        return this.registerLinkModel.remove({link})
    }

    updateUserData(user: UpdateUserDto) {
        return this.userModel.findOneAndUpdate({email: user.email}, {role: user.role}, {new: true});
    }
}
