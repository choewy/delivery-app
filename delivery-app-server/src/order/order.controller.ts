import { OrderStatus, User, UserData } from '@/core';
import { Controller, Param, Patch } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { GetOrderByIdParams } from './dtos';
import { OrderEmitterSubject } from './enums';
import {
  NotFoundOrderException,
  OrderIsNotAcceptableException,
} from './exceptions';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly emitter: EventEmitter2,
  ) {}

  @Patch(':id/accept')
  async accept(
    @User() user: UserData,
    @Param() params: GetOrderByIdParams,
  ): Promise<void> {
    const order = await this.orderService.findById(parseInt(params.id as any));

    if (!order) {
      throw new NotFoundOrderException();
    }

    if (order.status !== OrderStatus.Wait) {
      throw new OrderIsNotAcceptableException();
    }

    await this.orderService.acceptOrder(order.id, user.id);
    await this.emitter.emitAsync(OrderEmitterSubject.Refresh);
  }
}
