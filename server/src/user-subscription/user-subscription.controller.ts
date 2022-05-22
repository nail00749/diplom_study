import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req} from '@nestjs/common';
import {UserSubscriptionService} from './user-subscription.service';
import {CreateUserSubscriptionDto} from './dto/create-user-subscription.dto';
import {UpdateUserSubscriptionDto} from './dto/update-user-subscription.dto';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@Controller('user-subscription')
export class UserSubscriptionController {
    constructor(private readonly userSubscriptionService: UserSubscriptionService) {
    }

    @Post()
    create(@Body() createUserSubscriptionDto: CreateUserSubscriptionDto) {
        return this.userSubscriptionService.create(createUserSubscriptionDto);
    }

    @Get()
    findAll() {
        return this.userSubscriptionService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('course')
    findStudentCourse(@Req() req) {
        return this.userSubscriptionService.findStudentCourse(req.user.id)
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.userSubscriptionService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateUserSubscriptionDto: UpdateUserSubscriptionDto) {
        return this.userSubscriptionService.update(+id, updateUserSubscriptionDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.userSubscriptionService.remove(+id);
    }
}
