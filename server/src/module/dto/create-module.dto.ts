import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";
import {Lesson} from "../../lesson/schemas/lesson.schema";

export class CreateModuleDto {
    @ApiProperty()
    readonly title: string

    @ApiProperty()
    readonly description: string

    @ApiProperty()
    lessons: string[]

    /*@ApiPropertyOptional()
    readonly file?: File*/

    image_path: string
}
