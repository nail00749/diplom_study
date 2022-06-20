import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UploadedFile,
  Req,
} from '@nestjs/common';
import { ModuleService } from './module.service';
import { CreateModuleDto } from './dto/create-module.dto';
import { UpdateModuleDto } from './dto/update-module.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { FastifyFileInterceptor } from 'nest-fastify-multer';
import { diskStorage } from 'multer';
import * as path from 'path';
import { editFileName } from '../utils/utils';
import { JsonToObject } from '../Pipes/json-to-object.service';

@Controller('module')
export class ModuleController {
  constructor(private readonly moduleService: ModuleService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @FastifyFileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(__dirname, '../..', 'static', 'modules'),
      filename: editFileName,
    }),
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createModuleDto: CreateModuleDto,
    @Body('lessons', JsonToObject) lessons
  ) {
    if (file && file.filename) {
      createModuleDto.image_path = `/modules/${file.filename}`;
    }
    return this.moduleService.create({ ...createModuleDto, lessons });
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.moduleService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.moduleService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('teacher/:moduleId/:flowId')
  findOneForTeacher(
    @Param('moduleId') moduleId: string,
    @Param('flowId') flowId: string
  ) {
    return this.moduleService.findOneForTeacher(moduleId, flowId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @FastifyFileInterceptor('file', {
    storage: diskStorage({
      destination: path.join(__dirname, '../..', 'static', 'modules'),
      filename: editFileName,
    }),
  })
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateModuleDto: UpdateModuleDto,
    @Body('lessons', JsonToObject) lessons
  ) {
    if (file && file.filename) {
      updateModuleDto.image_path = `/modules/${file.filename}`;
    }
    if (lessons) {
      updateModuleDto.lessons = lessons;
    }
    return this.moduleService.update(id, updateModuleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.moduleService.remove(id);
  }
}
