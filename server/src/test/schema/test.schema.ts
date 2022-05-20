import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Type} from "class-transformer";
import { Lesson } from 'src/lesson/schemas/lesson.schema';

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
}

export const TestSchema = SchemaFactory.createForClass(Test);
