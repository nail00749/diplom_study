import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Type} from "class-transformer";
import {Module} from "../../module/schemas/module.schema";

export type CourseDocument = Course & mongoose.Document;

@Schema()
export class Course {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string

    @Prop()
    image_path: string

    @Props({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Module'}]})
    modules: Module[]

}

export const CourseSchema = SchemaFactory.createForClass(Course);

CourseSchema.virtual('lessons', {
    ref: 'Lesson',
    localField: '_id',
    foreignField: 'course',
})

CourseSchema.set('toObject', {virtuals: true})
CourseSchema.set('toJSON', {virtuals: true})
