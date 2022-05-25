import {Injectable} from '@nestjs/common';
import {CreateModuleDto} from './dto/create-module.dto';
import {UpdateModuleDto} from './dto/update-module.dto';
import {InjectModel} from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import {Module, ModuleDocument} from "./schemas/module.schema";

@Injectable()
export class ModuleService {
    constructor(@InjectModel(Module.name) private readonly moduleModel: mongoose.Model<ModuleDocument>) {
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
        return this.moduleModel.findById(id)
    }

    update(id: string, updateModuleDto: UpdateModuleDto) {
        return this.moduleModel.findByIdAndUpdate(id, updateModuleDto)
    }

    remove(id: string) {
        return `This action removes a #${id} module`;
    }
}
