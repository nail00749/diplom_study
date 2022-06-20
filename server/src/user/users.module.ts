import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { FileService } from '../file/file.service';
import { UserFlowModule } from '../user-flow/user-flow.module';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserFlowModule,
    AdminModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, FileService],
  exports: [UsersService],
})
export class UsersModule {}
