import * as mongoose from 'mongoose';
import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Type} from "class-transformer";
import {UserFlow} from "../../user-flow/schemas/user-flow.schema";
import {User} from "../../user/schemas/user.schema";

export type UserSubscriptionDocument = UserSubscription & mongoose.Document;

@Schema()
export class UserSubscription {
    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    @Type(() => User)
    student: User;

    @Prop({required: true, type: mongoose.Schema.Types.ObjectId, ref: 'UserFlow'})
    @Type(() => UserFlow)
    flow: UserFlow;

    @Prop({required: true, type: Date})
    start_date: Date;

    @Prop({required: true, type: Date})
    end_date: Date;


}

export const UserSubscriptionSchema = SchemaFactory.createForClass(UserSubscription);
