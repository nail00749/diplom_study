import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('token')
  async login(@Req() req: any) {
    return this.authService.login(req.body);
  }


}
