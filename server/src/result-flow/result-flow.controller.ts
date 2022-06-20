import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ResultFlowService } from './result-flow.service';
import { CreateResultFlowDto } from './dto/create-result-flow.dto';
import { UpdateResultFlowDto } from './dto/update-result-flow.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ResultTestDto } from './dto/result-test.dto';

@Controller('result-flow')
export class ResultFlowController {
  constructor(private readonly resultFlowService: ResultFlowService) {}

  @Post()
  create(@Body() createResultFlowDto: CreateResultFlowDto) {
    return this.resultFlowService.create(createResultFlowDto);
  }

  @Get()
  findAll() {
    return this.resultFlowService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.resultFlowService.findOne(id, req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('module-task/:id')
  updateModuleTask(
    @Param('id') id: string,
    @Body() updateResultFlowDto: UpdateResultFlowDto
  ) {
    return this.resultFlowService.updateModuleTask(id, updateResultFlowDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('lesson-test/:id')
  updateLessonTest(@Param('id') id: string, @Body() dto: ResultTestDto) {
    return this.resultFlowService.updateLessonTest(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('test-mark/:id')
  setMarkTest(@Param('id') id: string, @Body() dto: ResultTestDto) {
    return this.resultFlowService.setMarkTest(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultFlowService.remove(id);
  }
}
