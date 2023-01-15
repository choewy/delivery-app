import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderGateway } from './order.gateway';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderGateway, OrderService],
})
export class OrderModule {}
