import {Module} from '@nestjs/common';
import {ResultFlowService} from './result-flow.service';
import {ResultFlowController} from './result-flow.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ResultFlow, ResultFlowSchema} from "./schemas/result-flow.schema";
import {ModuleTaskModule} from "../module-task/module-task.module";
import {TestModule} from "../test/test.module";

@Module({
    imports: [
        MongooseModule.forFeature([{name: ResultFlow.name, schema: ResultFlowSchema}]),
        ModuleTaskModule,
        TestModule
    ],
    controllers: [ResultFlowController],
    providers: [ResultFlowService],
    exports: [ResultFlowService]
})
export class ResultFlowModule {
}
