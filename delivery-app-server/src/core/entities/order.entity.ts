import { OrderStatus } from './enums';
import { UserEntity } from './user.entity';

export class OrderEntity {
  id: number;
  price: number;
  startLatitude: number;
  startLongitude: number;
  endLatitude: number;
  endLongitude: number;
  status: OrderStatus;
  userId: number | null;
  user: UserEntity | null;
}
