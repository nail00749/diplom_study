import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Type} from "class-transformer";
import {Test} from "./test.schema";
import {User} from "../../users/schemas/user.schema";

export type TestResultDocument = TestResult & mongoose.Document;

@Schema()
export class TestResult {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Test'})
    @Type(() => Test)
    test: Test;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    @Type(() => User)
    user: User;

    @Prop({required: true, type: mongoose.Schema.Types.Mixed})
    result: mongoose.Schema.Types.Mixed

    @Prop()
    mark: number
}

export const TestResultSchema = SchemaFactory.createForClass(TestResult);
