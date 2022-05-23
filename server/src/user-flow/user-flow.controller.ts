import {Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards} from '@nestjs/common';
import {UserFlowService} from './user-flow.service';
import {CreateUserFlowDto} from './dto/create-user-flow.dto';
import {UpdateUserFlowDto} from './dto/update-user-flow.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('user-flow')
export class UserFlowController {
    constructor(private readonly userFlowService: UserFlowService) {
    }

    @Post()
    create(@Body() createUserFlowDto: CreateUserFlowDto) {
        return this.userFlowService.create(createUserFlowDto);
    }

    @Get()
    findAll() {
        return this.userFlowService.findAll();
    }


    @UseGuards(JwtAuthGuard)
    @Get('teacher')
    findTeacherFlow(@Req() req) {
        return this.userFlowService.findTeacherFlow(req.user.id)
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    findOne(@Req() req, @Param('id') id) {
        return this.userFlowService.findOne(req.user.id, id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserFlowDto: UpdateUserFlowDto) {
        return this.userFlowService.update(+id, updateUserFlowDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userFlowService.remove(+id);
    }
}
