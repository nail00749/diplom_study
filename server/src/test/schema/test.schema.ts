import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Type} from "class-transformer";
import {Lesson, LessonSchema} from 'src/lesson/schemas/lesson.schema';
import {TestResult} from "./test-result.schema";

export type TestDocument = Test & mongoose.Document;

@Schema()
export class Test {
    @Prop({required: true})
    description: string;

    @Prop([{}])
    questions: [{
        is_extended?: boolean,
        is_multiple?: boolean,
        answers: [{
            text: string,
            is_correct?: boolean,
        }],
    }]

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Lesson'})
    @Type(() => Lesson)
    lesson: Lesson;

    @Type(() => Test)
    result: TestResult
}

export const TestSchema = SchemaFactory.createForClass(Test);


TestSchema.virtual('result', {
    ref: 'TestResult',
    localField: '_id',
    foreignField: 'test',
    justOne: true
})

TestSchema.set('toObject', {virtuals: true})
TestSchema.set('toJSON', {virtuals: true})
