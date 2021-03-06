import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { FastifyFileInterceptor } from 'nest-fastify-multer';
import { diskStorage } from 'multer';
import * as path from 'path';
import { editFileName } from '../utils/utils';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JsonToObject } from '../Pipes/json-to-object.service';

@ApiBearerAuth()
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @FastifyFileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(__dirname, '../..', 'static', 'courses'),
      filename: editFileName,
    }),
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createCourseDto: CreateCourseDto,
    @Body('modules', JsonToObject) modules
  ) {
    if (file && file.filename) {
      createCourseDto.image_path = `/courses/${file.filename}`;
    }
    return this.courseService.create({ ...createCourseDto, modules: modules });
  }

  @Get()
  findAll() {
    return this.courseService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':courseId')
  findOne(@Req() req, @Param('courseId') courseId: string) {
    return this.courseService.findOne(courseId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':course_id')
  @FastifyFileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(__dirname, '../..', 'static', 'courses'),
      filename: editFileName,
    }),
  })
  update(
    @Param('course_id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateCourseDto: UpdateCourseDto,
    @Body('modules', JsonToObject) modules
  ) {
    if (file && file.filename) {
      updateCourseDto.image_path = `/courses/${file.filename}`;
    }
    if (modules) {
      updateCourseDto.modules = modules;
    }
    return this.courseService.update(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.remove(+id);
  }
}
