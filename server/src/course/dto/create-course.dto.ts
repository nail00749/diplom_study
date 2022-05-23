import {ApiProperty} from "@nestjs/swagger";

export class CreateCourseDto {
  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty()
  readonly teacher: string;

  image_path: string
}
