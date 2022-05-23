import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Course} from "../../course/schemas/course.schema";
import {Type} from "class-transformer";
import {Test} from "../../test/schema/test.schema";

export type LessonDocument = Lesson & mongoose.Document;

@Schema()
export class Lesson {
    @Prop({required: true})
    title: string;

    @Prop({required: true})
    description: string;

    @Type(() => Test)
    test: Test
}


export const LessonSchema = SchemaFactory.createForClass(Lesson);

LessonSchema.virtual('test', {
    ref: 'Test',
    localField: '_id',
    foreignField: 'lesson',
    justOne: true
})

LessonSchema.set('toObject', {virtuals: true})
LessonSchema.set('toJSON', {virtuals: true})
