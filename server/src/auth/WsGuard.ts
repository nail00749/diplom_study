import {CanActivate, Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import * as jwt from 'jsonwebtoken'
import {resolve} from "dns";
import {AuthService} from "./auth.service";
import {UsersService} from "../user/users.service";


@Injectable()
export class WsGuard implements CanActivate {
    constructor(private userService: UsersService,) {
    }

    async canActivate(context: any) {
        const token = context.args[0].handshake.headers.authorization.split(' ').pop()
        try {
            const decoded: any = jwt.verify(token, process.env.secret_key)
            const user = await this.userService.findOne(decoded.email)
            //console.log(user)
            //context.switchToWs().getData().authorizedUser  = user
            return Boolean(user)
        } catch (e) {
            console.log(e)
            return false
        }
    }


}

