import {Injectable} from '@nestjs/common';
import {CreateLessonDto} from './dto/create-lesson.dto';
import {UpdateLessonDto} from './dto/update-lesson.dto';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Lesson, LessonDocument} from "./schemas/lesson.schema";

@Injectable()
export class LessonService {
    constructor(@InjectModel(Lesson.name) private readonly lessonModel: Model<LessonDocument>) {
    }

    create(createLessonDto: CreateLessonDto) {
        return this.lessonModel.create(createLessonDto)
    }

    findAll() {
        return this.lessonModel.find()
    }

    findOne(id: string) {
        return this.lessonModel.findById(id).populate('test')
    }

    async lessonFlow(lessonId: string, flowId: string) {
        const lesson = this.lessonModel.findById(lessonId).populate({
            path: 'test'
        })
        return lesson
    }

    update(id: string, updateLessonDto: UpdateLessonDto) {
        return this.lessonModel.findByIdAndUpdate(id, updateLessonDto)
    }

    remove(id: number) {
        return `This action removes a #${id} lesson`;
    }
}
