import {Module} from '@nestjs/common';
import {ResultFlowService} from './result-flow.service';
import {ResultFlowController} from './result-flow.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ResultFlow, ResultFlowSchema} from "./schemas/result-flow.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: ResultFlow.name, schema: ResultFlowSchema}])],
    controllers: [ResultFlowController],
    providers: [ResultFlowService],
    exports: [ResultFlowService]
})
export class ResultFlowModule {
}
