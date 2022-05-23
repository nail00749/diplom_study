import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import {User, UserDocument} from './schemas/user.schema';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {UserFlowService} from "../user-flow/user-flow.service";
import {AdminService} from "../admin/admin.service";
import {intervalToDuration} from 'date-fns'

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
                private readonly userFlowService: UserFlowService,
                private readonly adminService: AdminService
    ) {
    }

    async create(dto: CreateUserDto): Promise<Partial<User>> {
        let validLink = false
        if (dto.link) {
            const link = await this.adminService.getRegisterLink(dto.link)
            if (!link) {
                throw new HttpException('Ссылка не валидна', HttpStatus.FORBIDDEN);
            }
            const interval = intervalToDuration({
                start: new Date(link.createdAt),
                end: new Date()
            })
            if (interval.days >= 1) {
                this.adminService.removeRegisterLink(dto.link)
                throw new HttpException('Истек срок ссылки', HttpStatus.FORBIDDEN);
            }
            validLink = true
        }
        const candidate = await this.userModel.findOne({email: dto.email});
        if (candidate) {
            throw new HttpException('Пользователь уже существует', HttpStatus.FORBIDDEN);
        }
        const hash = await bcrypt.hash(dto.password, 10);
        const {password, ...result} = await this.userModel.create({
            ...dto,
            password: hash,
            role: validLink ? 'teacher' : 'user'
        });
        return result;
    }

    getMe(u) {
        return this.userModel.findOne({email: u.email}).select('-password');
    }

    findAll() {
        return this.userModel.find().select('-password');
    }

    findOne(email: string) {
        return this.userModel.findOne({email});
    }

    update(user: User, updateUserDto: UpdateUserDto) {
        return this.userModel.findOneAndUpdate({email: user.email}, updateUserDto, {new: true});
    }

    updateAvatar(id, filePath) {
        return this.userModel.findByIdAndUpdate(id, {avatar_path: filePath})
    }

    async findTeachersFromCourse(course_id: string) {
        const flows = await this.userFlowService.findFlowsByCourse(course_id).distinct('teacher')
        return this.userModel.find().where('_id').in(flows).select('-password')
    }


    remove(id: number) {
        return `This action removes a #${id} user`;
    }

}
