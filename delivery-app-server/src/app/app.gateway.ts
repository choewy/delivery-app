import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private readonly server: Server;

  async handleConnection(client: Socket): Promise<void> {
    console.log([client.id, 'connected'].join(' '));
  }

  async handleDisconnect(client: Socket): Promise<void> {
    console.log([client.id, 'disconnected'].join(' '));
  }
}
