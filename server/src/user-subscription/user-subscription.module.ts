import {Module} from '@nestjs/common';
import {UserSubscriptionService} from './user-subscription.service';
import {UserSubscriptionController} from './user-subscription.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSubscription, UserSubscriptionSchema} from "./schemas/user-subscription.schemas";

@Module({
    imports: [MongooseModule.forFeature([{name: UserSubscription.name, schema: UserSubscriptionSchema}])],
    controllers: [UserSubscriptionController],
    providers: [UserSubscriptionService]
})
export class UserSubscriptionModule {
}
