import { Module } from '@nestjs/common';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Course, CourseSchema } from './schemas/course.schema';
import { ResultFlowModule } from '../result-flow/result-flow.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }]),
    ResultFlowModule,
  ],
  controllers: [CourseController],
  providers: [CourseService],
})
export class CourseModule {}
