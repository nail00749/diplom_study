import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { CourseModule } from './course/course.module';
import { FileService } from './file/file.service';
import { FileModule } from './file/file.module';
import { LessonModule } from './lesson/lesson.module';
import { TestModule } from './test/test.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.db_url),
    UsersModule,
    AuthModule,
    AdminModule,
    CourseModule,
    FileModule,
    LessonModule,
    TestModule,
  ],
  controllers: [AppController],
  providers: [AppService, FileService],
})
export class AppModule {
}
