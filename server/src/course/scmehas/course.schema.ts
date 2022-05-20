import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {Lesson} from "../../lesson/schemas/lesson.schema";
import {Type} from "class-transformer";

export type CourseDocument = Course & Document;

@Schema()
export class Course {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string

    @Prop()
    image_path: string

    @Type(() => Lesson)
    lessons: Lesson[]

}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'course',
})

CourseSchema.set('toObject', {virtuals: true})
CourseSchema.set('toJSON', {virtuals: true})
