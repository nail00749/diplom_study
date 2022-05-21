import { PartialType } from '@nestjs/mapped-types';
import { CreateUserSubscriptionDto } from './create-user-subscription.dto';

export class UpdateUserSubscriptionDto extends PartialType(CreateUserSubscriptionDto) {}
