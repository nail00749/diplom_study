import {Injectable} from '@nestjs/common';
import {CreateTestDto} from './dto/create-test.dto';
import {UpdateTestDto} from './dto/update-test.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {TestDocument, Test} from "./schema/test.schema";

@Injectable()
export class TestService {
    constructor(@InjectModel(Test.name) private readonly testModel: Model<TestDocument>) {
    }

    create(createTestDto: CreateTestDto) {
        return this.testModel.create(createTestDto)
    }

    findAll() {
        return `This action returns all test`;
    }

    findOne(id: number) {
        return `This action returns a #${id} test`;
    }

    update(id: string, updateTestDto: UpdateTestDto) {
        return this.testModel.findByIdAndUpdate(id, updateTestDto)
    }

    remove(id: number) {
        return `This action removes a #${id} test`;
    }
}
