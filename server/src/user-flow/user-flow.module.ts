import { Module } from '@nestjs/common';
import { UserFlowService } from './user-flow.service';
import { UserFlowController } from './user-flow.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {UserFlow, UserFlowSchema} from "./schemas/user-flow.schema";

@Module({
  imports: [MongooseModule.forFeature([{name: UserFlow.name, schema: UserFlowSchema}])],
  controllers: [UserFlowController],
  providers: [UserFlowService],
  exports: [UserFlowService]
})
export class UserFlowModule {}
