import { Module } from '@nestjs/common';
import { UserSubscriptionService } from './user-subscription.service';
import { UserSubscriptionController } from './user-subscription.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserSubscription,
  UserSubscriptionSchema,
} from './schemas/user-subscription.schemas';
import { ResultFlowModule } from '../result-flow/result-flow.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserSubscription.name, schema: UserSubscriptionSchema },
    ]),
    ResultFlowModule,
  ],
  controllers: [UserSubscriptionController],
  providers: [UserSubscriptionService],
  exports: [UserSubscriptionService],
})
export class UserSubscriptionModule {}
