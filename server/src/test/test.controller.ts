import {Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req} from '@nestjs/common';
import {TestService} from './test.service';
import {CreateTestDto} from './dto/create-test.dto';
import {UpdateTestDto} from './dto/update-test.dto';
import {TestResultDto} from "./dto/test-result.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('test')
export class TestController {
    constructor(private readonly testService: TestService) {
    }

    @Post()
    create(@Body() createTestDto: CreateTestDto) {
        return this.testService.create(createTestDto);
    }

    @UseGuards(JwtAuthGuard)
    @Post('finish')
    createTestResult(@Req() req, @Body() testResult: TestResultDto) {
        return this.testService.createTestResult(req.user.id, testResult)
    }


    @UseGuards(JwtAuthGuard)
    @Get('my-result/:testId')
    getMyTestResult(@Req() req, @Param('testId') testId) {
        return this.testService.getMyTestResult(req.user.id, testId)
    }


    @Get()
    findAll() {
        return this.testService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testService.findOne(+id);
    }

    @Patch(':test_id')
    update(@Query('test_id') id: string, @Body() updateTestDto: UpdateTestDto) {
        return this.testService.update(id, updateTestDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testService.remove(+id);
    }
}
