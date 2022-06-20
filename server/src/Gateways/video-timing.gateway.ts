import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { ResultFlowService } from '../result-flow/result-flow.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: '/api/v1/ws',
  path: '/api/v1/ws/socket.io',
})
export class SocketRedisCache
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly resultFlowService: ResultFlowService
  ) {}

  @WebSocketServer()
  server: Server;

  //@UseGuards(WsGuard)
  @SubscribeMessage('msgToServer')
  async handleMessage(client: Socket, payload: any): Promise<void> {
    const { type } = payload;
    if (type !== 'play') {
      await this.resultFlowService.updateLessonTiming(payload);
      await this.cacheManager.del(client.id);
    } else {
      await this.cacheManager.set(client.id, JSON.stringify(payload), {
        ttl: 100,
      });
    }
  }

  afterInit(server: any): any {
    console.log('afterInit');
  }

  handleConnection(client: Socket, ...args: any[]) {
    console.log('handleConnection', client.id);
  }

  async handleDisconnect(client: Socket) {
    const str: string = await this.cacheManager.get(client.id);
    if (str) {
      try {
        const data = JSON.parse(str);
        await this.resultFlowService.updateLessonTiming(data);
        await this.cacheManager.del(client.id);
      } catch (e) {
        console.log(e);
      }
    }
  }
}
