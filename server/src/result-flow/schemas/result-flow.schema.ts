import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '../../user/schemas/user.schema';
import { UserFlow } from '../../user-flow/schemas/user-flow.schema';
import { UserSubscription } from '../../user-subscription/schemas/user-subscription.schemas';

export type ResultFlowDocument = ResultFlow & mongoose.Document;

@Schema()
export class ResultFlow {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSubscription' })
  subscription: UserSubscription;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'flow' })
  flow: UserFlow;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  lessonVideosTimings: any;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  moduleTasks: Record<string, { mark: number; response: string[] }>;

  @Prop({ type: mongoose.Schema.Types.Mixed, default: {} })
  testsResult: Record<string, { mark: number; response: any }>;
}

export const ResultFlowSchema = SchemaFactory.createForClass(ResultFlow);
