import {Module} from '@nestjs/common';
import {ModuleService} from './module.service';
import {ModuleController} from './module.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {ModuleSchema} from "./schemas/module.schema";

@Module({
    imports: [MongooseModule.forFeature([{name: Module.name, schema: ModuleSchema}])],
    controllers: [ModuleController],
    providers: [ModuleService]
})
export class ModuleModule {
}
