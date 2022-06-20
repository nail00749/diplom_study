import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  UploadedFile,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FastifyFileInterceptor } from 'nest-fastify-multer';
import { diskStorage } from 'multer';
import * as path from 'path';
import { editFileName } from '../utils/utils';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Req() req) {
    return this.usersService.getMe(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('course-teacher/:course_id')
  findTeachersFromCourse(@Param('course_id') course_id) {
    return this.usersService.findTeachersFromCourse(course_id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('avatar')
  @FastifyFileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(__dirname, '../..', 'static', 'avatars'),
      filename: editFileName,
    }),
  })
  updateAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return this.usersService.updateAvatar(
      req.user.id,
      `/avatars/${file.filename}`
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
