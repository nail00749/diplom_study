import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User, UserDocument} from './schemas/user.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {FileService} from "../file/file.service";

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>, private readonly fileService: FileService) {
    }

    async create(dto: CreateUserDto): Promise<Partial<User>> {
        const candidate = await this.userModel.findOne({email: dto.email});
        if (candidate) {
            throw new HttpException('user already exist', HttpStatus.FORBIDDEN);
        }
        const hash = await bcrypt.hash(dto.password, 10);
        const {password, ...result} = await this.userModel.create({...dto, password: hash});
        return result;
    }

    getMe(u) {
        return this.userModel.findOne({email: u.email}).select('-password');
    }

    async findAll(): Promise<User[]> {
        const users = await this.userModel.find().select('-password');
        return users;
    }

    async findOne(email: string): Promise<User | undefined> {
        const user = await this.userModel.findOne({email});
        return user;
    }

    update(user: User, updateUserDto: UpdateUserDto) {
        return this.userModel.findOneAndUpdate({email: user.email}, updateUserDto, {new: true});
    }

    updateAvatar(id, filePath) {
        return this.userModel.findByIdAndUpdate(id, {avatar_path: filePath})
    }


    remove(id: number) {
        return `This action removes a #${id} user`;
    }

}
