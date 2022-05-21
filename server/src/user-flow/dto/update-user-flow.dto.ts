import { PartialType } from '@nestjs/mapped-types';
import { CreateUserFlowDto } from './create-user-flow.dto';

export class UpdateUserFlowDto extends PartialType(CreateUserFlowDto) {}
