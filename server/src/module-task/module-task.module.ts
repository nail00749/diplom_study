import {Module} from '@nestjs/common';
import {ModuleTaskService} from './module-task.service';
import {ModuleTaskController} from './module-task.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ModuleTask, ModuleTaskSchema} from "./schemas/module-task.schema";

@Module({
    imports: [
        MongooseModule.forFeature([{name: ModuleTask.name, schema: ModuleTaskSchema}])
    ],
    controllers: [ModuleTaskController],
    providers: [ModuleTaskService],
    exports: [ModuleTaskService]
})
export class ModuleTaskModule {
}
