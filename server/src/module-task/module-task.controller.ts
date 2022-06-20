import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ModuleTaskService } from './module-task.service';
import { CreateModuleTaskDto } from './dto/create-module-task.dto';
import { UpdateModuleTaskDto } from './dto/update-module-task.dto';

@Controller('module-task')
export class ModuleTaskController {
  constructor(private readonly moduleTaskService: ModuleTaskService) {}

  @Post()
  create(@Body() createModuleTaskDto: CreateModuleTaskDto) {
    return this.moduleTaskService.create(createModuleTaskDto);
  }

  @Get()
  findAll() {
    return this.moduleTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.moduleTaskService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateModuleTaskDto: UpdateModuleTaskDto
  ) {
    return this.moduleTaskService.update(id, updateModuleTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleTaskService.remove(+id);
  }
}
