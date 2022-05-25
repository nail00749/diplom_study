import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, UploadedFile} from '@nestjs/common';
import {LessonService} from './lesson.service';
import {CreateLessonDto} from './dto/create-lesson.dto';
import {UpdateLessonDto} from './dto/update-lesson.dto';
import {FastifyFileInterceptor} from "nest-fastify-multer";
import {diskStorage} from "multer";
import * as path from "path";
import {editFileName} from "../utils/utils";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @FastifyFileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: path.join(__dirname, '../..', 'static', 'lessons'),
                filename: editFileName
            })
        }
    )
    create(@UploadedFile() file: Express.Multer.File, @Body() createLessonDto: CreateLessonDto,) {
        if (file && file.filename) {
            createLessonDto.video_path = `/lessons/${file.filename}`
        }
        return this.lessonService.create(createLessonDto);
    }

    @Get()
    findAll() {
        return this.lessonService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.lessonService.findOne(id);
    }

    @Get('/flow')
    findFlow(@Query('lessonId') lessonId, @Query('flowId') flowId) {
        return this.lessonService.lessonFlow(lessonId, flowId)
    }


    @UseGuards(JwtAuthGuard)
    @Patch(':lesson_id')
    @FastifyFileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: path.join(__dirname, '../..', 'static', 'lessons'),
                filename: editFileName
            })
        }
    )
    update(@Query('lesson_id') id: string,
           @Body() updateLessonDto: UpdateLessonDto,
           @UploadedFile() file: Express.Multer.File,) {
        if (file && file.filename) {
            updateLessonDto.video_path = `/lessons/${file.filename}`
        }
        return this.lessonService.update(id, updateLessonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.lessonService.remove(+id);
    }
}
