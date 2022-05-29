import {Injectable} from '@nestjs/common';
import {CreateResultFlowDto} from './dto/create-result-flow.dto';
import {UpdateResultFlowDto} from './dto/update-result-flow.dto';
import {InjectModel} from "@nestjs/mongoose";
import {ResultFlow, ResultFlowDocument} from "./schemas/result-flow.schema";
import {Model} from "mongoose";

@Injectable()
export class ResultFlowService {
    constructor(@InjectModel(ResultFlow.name) private readonly resultFlowModel: Model<ResultFlowDocument>) {
    }

    create(createResultFlowDto: CreateResultFlowDto) {
        return this.resultFlowModel.create(createResultFlowDto)
    }

    findAll() {
        return `This action returns all resultFlow`;
    }

    findOne(id: string, userId: string) {
        return this.resultFlowModel.findOne({flow: id, user: userId})
    }

    update(id: string, updateResultFlowDto: UpdateResultFlowDto) {
        return `This action updates a #${id} resultFlow`;
    }

    async updateByFlow(payload) {
        const result = await this.resultFlowModel.findOne({flow: payload.flowId, user: payload.userId})
        if (!result.lessonVideosTimings) {
            result.lessonVideosTimings = {}
        }
        if (!result.lessonVideosTimings[payload.lessonId]) {
            result.lessonVideosTimings[payload.lessonId] = 0
        }
        if ((result.lessonVideosTimings[payload.lessonId] <= payload.timer || payload.timer === -1) && result.lessonVideosTimings[payload.lessonId] !== -1) {
            result.lessonVideosTimings[payload.lessonId] = payload.timer
            result.markModified('lessonVideosTimings')
            await result.save()
        }
        return result
    }

    remove(id: string) {
        return `This action removes a #${id} resultFlow`;
    }
}
