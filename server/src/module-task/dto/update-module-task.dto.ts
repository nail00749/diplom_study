import { PartialType } from '@nestjs/swagger';
import { CreateModuleTaskDto } from './create-module-task.dto';

export class UpdateModuleTaskDto extends PartialType(CreateModuleTaskDto) {}
