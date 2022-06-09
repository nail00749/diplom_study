import {Injectable} from '@nestjs/common';
import {CreateTestDto} from './dto/create-test.dto';
import {UpdateTestDto} from './dto/update-test.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {TestDocument, Test} from "./schema/test.schema";
import {TestResult, TestResultDocument} from "./schema/test-result.schema";
import {TestResultDto} from "./dto/test-result.dto";

@Injectable()
export class TestService {
    constructor(@InjectModel(Test.name) private readonly testModel: Model<TestDocument>,
                @InjectModel(TestResult.name) private readonly testResultModel: Model<TestResultDocument>) {
    }

    create(createTestDto: CreateTestDto) {
        return this.testModel.create(createTestDto)
    }

    createTestResult(userId: string, testResult: TestResultDto) {
        return this.testResultModel.create({...testResult, user: userId})
    }

    setMark(id: string, testResultDto: TestResultDto) {
        return this.testResultModel.findByIdAndUpdate(id, testResultDto)
    }

    getMyTestResult(userId: string, testId: string) {
        return this.testResultModel.findOne({user: userId, test: testId})
    }

    findAll() {
        return
    }

    findAllResultsByTest(testId: string, flowId: string) {
        return this.testResultModel.find({test: testId, flow: flowId}).populate({
            path: 'user',
            select: ['-password']
        })
    }

    async getOne(id: string): Promise<TestDocument> {
        const test = await this.testModel.findById(id)
        return test
    }

    update(id: string, updateTestDto: UpdateTestDto) {
        return this.testModel.findByIdAndUpdate(id, updateTestDto)
    }

    remove(id: number) {
        return `This action removes a #${id} test`;
    }
}
