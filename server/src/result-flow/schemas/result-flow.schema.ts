import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {User} from "../../user/schemas/user.schema";
import {UserFlow} from "../../user-flow/schemas/user-flow.schema";

export type ResultFlowDocument = ResultFlow & mongoose.Document

@Schema()
export class ResultFlow {
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    user: User

    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'flow'})
    flow: UserFlow

    @Prop( {type: mongoose.Schema.Types.Mixed})
    lessonVideosTimings: any
}

export const ResultFlowSchema = SchemaFactory.createForClass(ResultFlow)
