import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../user/users.module';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt.strategy';
import {WsGuard} from "./WsGuard";

@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.register({
            secret: process.env.secret_key,
            signOptions: {expiresIn: '30d'}
        })
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy, WsGuard],
    exports: [AuthService]
})
export class AuthModule {
}
