import {Module} from '@nestjs/common';
import {TestService} from './test.service';
import {TestController} from './test.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Test, TestSchema} from "./schema/test.schema";
import {TestResult, TestResultSchema} from "./schema/test-result.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Test.name, schema: TestSchema}]),
        MongooseModule.forFeature([{name: TestResult.name, schema: TestResultSchema}])
    ],
    controllers: [TestController],
    providers: [TestService],
    exports: [TestService]
})
export class TestModule {
}
