import { ApiProperty } from '@nestjs/swagger';

export class CreateUserFlowDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly date: Date;

  @ApiProperty()
  readonly course: string;
}
