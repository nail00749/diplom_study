import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Type} from "class-transformer";
import {Course} from "../../course/schemas/course.schema";
import {User} from "../../user/schemas/user.schema";

export type UserFlowDocument = UserFlow & mongoose.Document;

@Schema()
export class UserFlow {
    @Prop({required: true})
    name: string;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Course'})
    @Type(() => Course)
    course: Course;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    @Type(() => User)
    teacher: User;

    @Prop({required: true, type: Date})
    date: Date;
}

export const UserFlowSchema = SchemaFactory.createForClass(UserFlow);


UserFlowSchema.virtual('subscriptions', {
    ref: 'UserSubscription',
    localField: '_id',
    foreignField: 'flow',
})

UserFlowSchema.set('toObject', {virtuals: true})
UserFlowSchema.set('toJSON', {virtuals: true})
