import { PartialType } from '@nestjs/swagger';
import { CreateResultFlowDto } from './create-result-flow.dto';

export class UpdateResultFlowDto extends PartialType(CreateResultFlowDto) {}
