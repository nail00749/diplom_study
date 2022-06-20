import { Injectable } from '@nestjs/common';
import { CreateResultFlowDto } from './dto/create-result-flow.dto';
import { UpdateResultFlowDto } from './dto/update-result-flow.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ResultFlow, ResultFlowDocument } from './schemas/result-flow.schema';
import { Model } from 'mongoose';
import { ModuleTaskService } from '../module-task/module-task.service';
import { ResultTestDto } from './dto/result-test.dto';
import { TestService } from '../test/test.service';

@Injectable()
export class ResultFlowService {
  constructor(
    @InjectModel(ResultFlow.name)
    private readonly resultFlowModel: Model<ResultFlowDocument>,
    private readonly moduleTaskService: ModuleTaskService,
    private readonly testService: TestService
  ) {}

  create(createResultFlowDto: CreateResultFlowDto) {
    return this.resultFlowModel.create(createResultFlowDto);
  }

  findAll() {
    return;
  }

  findOne(flowId: string, userId: string) {
    return this.resultFlowModel.findOne({ flow: flowId, user: userId });
  }

  async updateModuleTask(id: string, dto: UpdateResultFlowDto) {
    const task = await this.moduleTaskService.findById(dto.taskId);
    const result = await this.resultFlowModel.findById(id);
    if (!result.moduleTasks) {
      result.moduleTasks = {};
    }
    let mark = 0;
    task.leftWordArr.forEach((word: string, i) => {
      if (word === dto.response[i]) {
        mark++;
      }
    });

    result.moduleTasks[dto.taskId] = {
      response: dto.response,
      mark,
    };
    result.markModified('moduleTasks');
    await result.save();
    return result;
  }

  async updateLessonTest(id: string, dto: ResultTestDto) {
    const result = await this.resultFlowModel.findById(id);
    const test = await this.testService.getOne(dto.testId);
    const isExtendedTest = test.questions.some(
      (question) => question.is_extended
    );

    if (!result.testsResult) {
      result.testsResult = {};
    }
    let mark = isExtendedTest ? -1 : 0;
    if (!isExtendedTest) {
      test.questions.forEach((question) => {
        if (!question.is_extended) {
          const response = dto.response[question.id];
          if (question.is_multiple && Array.isArray(response)) {
            const arr = question.answers.filter(
              (answer) => response.findIndex((r) => r === answer.id) !== -1
            );
            if (arr.every((answer) => answer.is_correct)) {
              mark++;
            }
          } else {
            const answer = question.answers.find(
              (answer) => answer.id === +response
            );
            if (answer && answer.is_correct) {
              mark++;
            }
          }
        }
      });
    }
    result.testsResult[test._id] = {
      mark,
      response: dto.response,
    };
    result.markModified('testsResult');
    await result.save();
    return result;
  }

  async setMarkTest(id: string, dto: ResultTestDto) {
    const result = await this.resultFlowModel.findById(id);
    const test = await this.testService.getOne(dto.testId);
    if (!result.testsResult) {
      result.testsResult = {};
    }
    let mark = 0;

    test.questions.forEach((question) => {
      const response = dto.response[question.id];
      if (!question.is_extended) {
        if (question.is_multiple && Array.isArray(response)) {
          const arr = question.answers.filter(
            (answer) => response.findIndex((r) => r === answer.id) !== -1
          );
          if (arr.every((answer) => answer.is_correct)) {
            mark++;
          }
        } else {
          const answer = question.answers.find(
            (answer) => answer.id === +response
          );
          if (answer && answer.is_correct) {
            mark++;
          }
        }
      } else {
        if (
          typeof response === 'object' &&
          !Array.isArray(response) &&
          response.isCorrect
        ) {
          mark++;
        }
      }
    });

    result.testsResult[test._id] = {
      mark,
      response: dto.response,
    };
    result.markModified('testsResult');
    await result.save();
    return result;
  }

  async updateLessonTiming(payload) {
    const result = await this.resultFlowModel.findOne({
      flow: payload.flowId,
      user: payload.userId,
    });
    if (!result.lessonVideosTimings) {
      result.lessonVideosTimings = {};
    }
    if (!result.lessonVideosTimings[payload.lessonId]) {
      result.lessonVideosTimings[payload.lessonId] = 0;
    }
    if (
      (result.lessonVideosTimings[payload.lessonId] <= payload.timer ||
        payload.timer === -1) &&
      result.lessonVideosTimings[payload.lessonId] !== -1
    ) {
      result.lessonVideosTimings[payload.lessonId] = payload.timer;
      result.markModified('lessonVideosTimings');
      await result.save();
    }
    return result;
  }

  remove(id: string) {
    return `This action removes a #${id} resultFlow`;
  }
}
