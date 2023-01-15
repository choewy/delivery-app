import {
  FileDBPRovideToken,
  FileDBService,
  OrderEntity,
  OrderStatus,
  UserEntity,
} from '@/core';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class OrderService {
  constructor(
    @Inject(FileDBPRovideToken.User)
    private readonly userRepository: FileDBService<UserEntity>,
    @Inject(FileDBPRovideToken.Order)
    private readonly orderRepository: FileDBService<OrderEntity>,
  ) {}

  async getOrders(): Promise<OrderEntity[]> {
    const users = await this.userRepository.find();
    const orders = await this.orderRepository.find();

    return orders.map((order) => {
      if (!order.userId) {
        order.user = null;
        return order;
      }

      order.user = users.find(({ id }) => id === order.userId);
      delete order.user.password;
      return order;
    });
  }

  async findById(id: number): Promise<OrderEntity> {
    return this.orderRepository.findAndBy({ id });
  }

  async acceptOrder(id: number, userId: number): Promise<void> {
    await this.orderRepository.update(
      { id },
      { userId, status: OrderStatus.Accept },
    );
  }
}
