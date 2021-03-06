import { ApiProperty } from '@nestjs/swagger';

export class TestResultDto {
  @ApiProperty()
  readonly test: string;

  @ApiProperty()
  readonly result: JSON;

  @ApiProperty()
  readonly mark: number;

  @ApiProperty()
  readonly flow: string;

  @ApiProperty()
  readonly user: string;
}
