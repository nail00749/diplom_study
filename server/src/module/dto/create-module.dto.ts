import {ApiProperty} from "@nestjs/swagger";
import {Lesson} from "../../lesson/schemas/lesson.schema";

export class CreateModuleDto {
    @ApiProperty()
    readonly title: string

    @ApiProperty()
    readonly description: string

    @ApiProperty()
    readonly lessons: Lesson[]
}
