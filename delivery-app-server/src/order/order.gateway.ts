import { OnEvent } from '@nestjs/event-emitter';
import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Namespace, Socket } from 'socket.io';
import {
  OrderEmitEventSubject,
  OrderEmitterSubject,
  OrderOnEventSubject,
} from './enums';
import { OrderService } from './order.service';

@WebSocketGateway({
  namespace: 'order',
})
export class OrderGateway {
  @WebSocketServer()
  private readonly server: Namespace;

  constructor(private readonly orderService: OrderService) {}

  @OnEvent(OrderEmitterSubject.Refresh)
  async refreshOrders() {
    this.server.emit(
      OrderEmitEventSubject.Init,
      await this.orderService.getOrders(),
    );
  }

  @SubscribeMessage(OrderOnEventSubject.Init)
  async init(@ConnectedSocket() socket: Socket) {
    socket.emit(
      OrderEmitEventSubject.Init,
      await this.orderService.getOrders(),
    );
  }
}
