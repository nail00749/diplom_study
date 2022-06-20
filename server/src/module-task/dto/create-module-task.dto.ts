import { ApiProperty } from '@nestjs/swagger';

export class CreateModuleTaskDto {
  @ApiProperty()
  readonly module: string;

  @ApiProperty()
  readonly fullText: string;

  leftWordArr: string[];

  arrWord: string[];
}
