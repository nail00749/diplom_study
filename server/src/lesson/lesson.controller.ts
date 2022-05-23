import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import {LessonService} from './lesson.service';
import {CreateLessonDto} from './dto/create-lesson.dto';
import {UpdateLessonDto} from './dto/update-lesson.dto';

@Controller('lesson')
export class LessonController {
    constructor(private readonly lessonService: LessonService) {
    }

    @Post()
    create(@Body() createLessonDto: CreateLessonDto) {
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

    @Patch(':lesson_id')
    update(@Query('lesson_id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
        return this.lessonService.update(id, updateLessonDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.lessonService.remove(+id);
    }
}
