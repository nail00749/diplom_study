import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UploadedFile} from '@nestjs/common';
import {CourseService} from './course.service';
import {CreateCourseDto} from './dto/create-course.dto';
import {UpdateCourseDto} from './dto/update-course.dto';
import {FastifyFileInterceptor} from 'nest-fastify-multer';
import {diskStorage} from 'multer';
import * as path from 'path'
import {editFileName} from "../utils/utils";


@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) {
    }

    @Post()
    @FastifyFileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: path.join(__dirname, '../..', 'static', 'courses'),
                filename: editFileName
            })
        }
    )
    create(@UploadedFile() file: Express.Multer.File, @Body() createCourseDto: CreateCourseDto) {
        if (file && file.filename) {
            createCourseDto.image_path = `/courses/${file.filename}`
        }
        return this.courseService.create(createCourseDto);
    }

    @Get()
    findAll() {
        return this.courseService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    }

    @Patch(':course_id')
    @FastifyFileInterceptor(
        'file',
        {
            storage: diskStorage({
                destination: path.join(__dirname, '../..', 'static', 'courses'),
                filename: editFileName
            })
        }
    )
    update(@Query('course_id') id: string, @UploadedFile() file: Express.Multer.File, @Body() updateCourseDto: UpdateCourseDto) {
        if (file && file.filename) {
            updateCourseDto.image_path = `/courses/${file.filename}`
        }
        return this.courseService.update(id, updateCourseDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.courseService.remove(+id);
    }
}
