import {CacheModule, Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UsersModule} from './user/users.module';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/auth.module';
import {AdminModule} from './admin/admin.module';
import {CourseModule} from './course/course.module';
import {FileService} from './file/file.service';
import {FileModule} from './file/file.module';
import {LessonModule} from './lesson/lesson.module';
import {TestModule} from './test/test.module';
import {UserFlowModule} from './user-flow/user-flow.module';
import {UserSubscriptionModule} from './user-subscription/user-subscription.module';
import {ModuleModule} from './module/module.module';
import { ResultFlowModule } from './result-flow/result-flow.module';
import { SocketRedisCache } from './Gateways/socket-redis-cache.gateway';
import * as redisStore from 'cache-manager-redis-store'

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
        UserFlowModule,
        UserSubscriptionModule,
        ModuleModule,
        ResultFlowModule,
        CacheModule.register({
            store: redisStore,
            host: 'localhost',
            port: 6379
        })
    ],
    controllers: [AppController],
    providers: [AppService, FileService, SocketRedisCache],
})
export class AppModule {
}
