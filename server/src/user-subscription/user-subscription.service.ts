import {Injectable} from '@nestjs/common';
import {CreateUserSubscriptionDto} from './dto/create-user-subscription.dto';
import {UpdateUserSubscriptionDto} from './dto/update-user-subscription.dto';
import {InjectModel} from "@nestjs/mongoose";
import {UserSubscription, UserSubscriptionDocument} from "./schemas/user-subscription.schemas";
import {Model} from "mongoose";
import {ResultFlowService} from "../result-flow/result-flow.service";

@Injectable()
export class UserSubscriptionService {
    constructor(@InjectModel(UserSubscription.name) private readonly userSubscriptionModel: Model<UserSubscriptionDocument>,
                private readonly resultFlowService: ResultFlowService
    ) {
    }

    async create(createUserSubscriptionDto: CreateUserSubscriptionDto) {
        const sub = await this.userSubscriptionModel.create(createUserSubscriptionDto)
        await this.resultFlowService.create({user: sub.student, flow: sub.flow, subscription: sub._id})
        return sub
    }

    findAll() {
        return this.userSubscriptionModel.find()
    }

    findAllByFlow(flowId: string) {
        return this.userSubscriptionModel.find({flow: flowId}).populate([
            {
                path: 'student',
                select: ['-password'],
                populate: {
                    path: 'resultFlow',
                    match: {flow: flowId}
                }
            }
        ])
    }

    findStudentCourse(userId: string) {
        return this.userSubscriptionModel.find({
            student: userId
        }).populate({
            path: 'flow',
            populate: 'course'
        })
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
