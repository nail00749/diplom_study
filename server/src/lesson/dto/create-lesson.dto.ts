import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class CreateLessonDto {
    @ApiProperty()
    readonly title: string

    @ApiProperty()
    readonly description: string

    @ApiProperty()
    readonly course: string

    @ApiPropertyOptional()
    video_path: string
}
