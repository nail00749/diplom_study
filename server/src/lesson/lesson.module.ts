import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Lesson, LessonSchema} from "./schemas/lesson.schema";
import {UserSubscriptionModule} from "../user-subscription/user-subscription.module";

@Module({
  imports: [
      MongooseModule.forFeature([{name: Lesson.name, schema: LessonSchema}]),
      UserSubscriptionModule
  ],
  controllers: [LessonController],
  providers: [LessonService]
})
export class LessonModule {}
