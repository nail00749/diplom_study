import { Body, Controller, Param, Patch, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { Role } from '../auth/Roles';
import RoleGuard from '../auth/roles.guard';


@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService, ) {
  }

  @UseGuards(RoleGuard(Role.ADMIN))
  @UseGuards(JwtAuthGuard)
  @Patch('users/:id')
  updateUserData(@Param('id') id: string, @Body() userDto: UpdateUserDto) {
    this.adminService.updateUserData(userDto);
  }
}
