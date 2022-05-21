import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {User, UserDocument} from '../users/schemas/user.schema';
import {Model} from 'mongoose';
import {UpdateUserDto} from '../users/dto/update-user.dto';

@Injectable()
export class AdminService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {
    }

    async updateUserData(user: UpdateUserDto) {
        return this.userModel.findOneAndUpdate({email: user.email}, {role: user.role}, {new: true});
    }
}
