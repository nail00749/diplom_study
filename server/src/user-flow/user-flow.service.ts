import {Injectable} from '@nestjs/common';
import {CreateUserFlowDto} from './dto/create-user-flow.dto';
import {UpdateUserFlowDto} from './dto/update-user-flow.dto';
import {InjectModel} from "@nestjs/mongoose";
import {UserFlow, UserFlowDocument} from "./schemas/user-flow.schema";
import {Model} from "mongoose";

@Injectable()
export class UserFlowService {
    constructor(@InjectModel(UserFlow.name) private readonly userFlowModel: Model<UserFlowDocument>,) {
    }

    create(createUserFlowDto: CreateUserFlowDto) {
        return this.userFlowModel.create(createUserFlowDto)
    }

    findAll() {
        return this.userFlowModel.find()
    }

    findTeacherFlow(id: string) {
        return this.userFlowModel.find({teacher: id}).populate('course')
    }

    findFlowsByCourse(courseId: string) {
        return this.userFlowModel.find({course: courseId})
    }

    findOne(id: number) {
        return `This action returns a #${id} userFlow`;
    }

    update(id: number, updateUserFlowDto: UpdateUserFlowDto) {
        return `This action updates a #${id} userFlow`;
    }

    remove(id: number) {
        return `This action removes a #${id} userFlow`;
    }
}
