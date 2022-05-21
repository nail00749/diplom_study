import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserFlowService } from './user-flow.service';
import { CreateUserFlowDto } from './dto/create-user-flow.dto';
import { UpdateUserFlowDto } from './dto/update-user-flow.dto';

@Controller('user-flow')
export class UserFlowController {
  constructor(private readonly userFlowService: UserFlowService) {}

  @Post()
  create(@Body() createUserFlowDto: CreateUserFlowDto) {
    return this.userFlowService.create(createUserFlowDto);
  }

  @Get()
  findAll() {
    return this.userFlowService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userFlowService.findOne(+id);
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
