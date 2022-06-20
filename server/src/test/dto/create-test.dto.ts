import { ApiProperty } from '@nestjs/swagger';

export class CreateTestDto {
  @ApiProperty()
  lesson: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  questions: IQuestion[];
}

interface IQuestion {
  answers: IAnswer[];
  is_extended?: boolean;
  is_multiple?: boolean;
}

interface IAnswer {
  text: string;
  is_correct?: boolean;
}
