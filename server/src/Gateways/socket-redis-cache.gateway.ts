import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    OnGatewayInit,
    SubscribeMessage,
    WebSocketGateway, WebSocketServer
} from '@nestjs/websockets';
import {Socket, Server} from 'socket.io';
import {CACHE_MANAGER, Inject, UseGuards} from "@nestjs/common";
import {Cache} from 'cache-manager';
import {WsGuard} from "../auth/WsGuard";
import {ResultFlowService} from "../result-flow/result-flow.service";
import {UpdateUserDto} from "../user/dto/update-user.dto";
import {UpdateResultFlowDto} from "../result-flow/dto/update-result-flow.dto";

@WebSocketGateway({
    cors: {
        origin: '*',
    },
    namespace: '/api/v1/ws',
    path: '/api/v1/ws/socket.io',
})
export class SocketRedisCache implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
                private readonly resultFlowService: ResultFlowService
    ) {
    }
    @WebSocketServer()
    server: Server

    //@UseGuards(WsGuard)
    @SubscribeMessage('msgToServer')
    async handleMessage(client: Socket, payload: any): Promise<void> {
        const {type} = payload
        if (type !== 'play') {
            await this.resultFlowService.updateByFlow(payload)
        } else {
            await this.cacheManager.set(client.id, JSON.stringify(payload), {ttl: 100})
        }
    }

    afterInit(server: any): any {
        console.log('afterInit')
    }

    handleConnection(client: Socket, ...args: any[]) {
        console.log('handleConnection', client.id,)
    }

    async handleDisconnect(client: Socket) {
        const str: string = await this.cacheManager.get(client.id)
        if (str) {
            try {
                const data = JSON.parse(str)
                await this.resultFlowService.updateByFlow(data)
            } catch (e) {
                console.log(e)
            }
        }
    }
}
