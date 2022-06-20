import { Injectable } from '@nestjs/common';
import { CreateModuleTaskDto } from './dto/create-module-task.dto';
import { UpdateModuleTaskDto } from './dto/update-module-task.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ModuleTask, ModuleTaskDocument } from './schemas/module-task.schema';
import { Model } from 'mongoose';

@Injectable()
export class ModuleTaskService {
  constructor(
    @InjectModel(ModuleTask.name)
    private readonly moduleTaskModel: Model<ModuleTaskDocument>
  ) {}

  create(createModuleTaskDto: CreateModuleTaskDto) {
    const arr = createModuleTaskDto.fullText.split('//');
    const leftWordArr = arr.filter((_, i) => i % 2 !== 0);
    const arrWord = arr.filter((_, i) => i % 2 === 0);
    return this.moduleTaskModel.create({
      ...createModuleTaskDto,
      leftWordArr,
      arrWord,
    });
  }

  findAll() {
    return `This action returns all moduleTask`;
  }

  findById(id: string) {
    return this.moduleTaskModel.findById(id);
  }

  update(id: string, updateModuleTaskDto: UpdateModuleTaskDto) {
    return `This action updates a #${id} moduleTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} moduleTask`;
  }
}
