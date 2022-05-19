import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {
  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    const isCompare = bcrypt.compare(pass, user.password);
    if (user && isCompare) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: User) {
    const candidate = await this.validateUser(user.email, user.password);
    if (!candidate) {
      throw new UnauthorizedException();
    }
    const payload = { email: candidate._doc.email, role: candidate._doc.role, id: candidate._doc._id };
    return {
      access_token: this.jwtService.sign(payload, { secret: process.env.secret_key }),
    };
  }

}