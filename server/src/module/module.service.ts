import {Injectable} from '@nestjs/common';
import {CreateModuleDto} from './dto/create-module.dto';
import {UpdateModuleDto} from './dto/update-module.dto';
import {InjectModel} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Module, ModuleDocument} from "./schemas/module.schema";
import {UserSubscriptionService} from "../user-subscription/user-subscription.service";

@Injectable()
export class ModuleService {
    constructor(@InjectModel(Module.name) private readonly moduleModel: mongoose.Model<ModuleDocument>,
                private readonly userSubscriptionService: UserSubscriptionService
    ) {
    }

    create(createModuleDto: CreateModuleDto) {
        return this.moduleModel.create(createModuleDto)
    }

    findAll() {
        return this.moduleModel.find().populate({
            path: 'lessons'
        })
    }

    findOne(id: string) {
        return this.moduleModel.findById(id).populate({
            path: 'lessons',
        })
    }

    async findOneForTeacher(moduleId: string, flowId: string) {
        const module = await this.moduleModel.findById(moduleId).populate({
            path: 'lessons'
        })
        const subscriptions = await this.userSubscriptionService.findAllByFlow(flowId)

        return {module, subscriptions}
    }

    update(id: string, updateModuleDto: UpdateModuleDto) {
        return this.moduleModel.findByIdAndUpdate(id, updateModuleDto)
    }

    remove(id: string) {
        return `This action removes a #${id} module`;
    }
}
