import {Injectable} from '@nestjs/common';
import {CreateUserSubscriptionDto} from './dto/create-user-subscription.dto';
import {UpdateUserSubscriptionDto} from './dto/update-user-subscription.dto';
import {InjectModel} from "@nestjs/mongoose";
import {UserSubscription, UserSubscriptionDocument} from "./schemas/user-subscription.schemas";
import {Model} from "mongoose";

@Injectable()
export class UserSubscriptionService {
    constructor(@InjectModel(UserSubscription.name) private readonly userSubscriptionModel: Model<UserSubscriptionDocument>) {
    }

    create(createUserSubscriptionDto: CreateUserSubscriptionDto) {
        return this.userSubscriptionModel.create(createUserSubscriptionDto)
    }

    findAll() {
        return this.userSubscriptionModel.find()
    }

    findOne(id: number) {
        return `This action returns a #${id} userSubscription`;
    }

    update(id: number, updateUserSubscriptionDto: UpdateUserSubscriptionDto) {
        return `This action updates a #${id} userSubscription`;
    }

    remove(id: number) {
        return `This action removes a #${id} userSubscription`;
    }
}
