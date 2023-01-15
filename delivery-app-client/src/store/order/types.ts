import { OrderStatus } from './enums';

export type OrderUserType = {
  id: number;
  name: string;
  email: string;
};

export type OrderRowType = {
  id: number;
  price: number;
  startLatitude: number;
  startLongitude: number;
  endLatitude: number;
  endLongitude: number;
  status: OrderStatus;
  userId: number | null;
  user: OrderUserType | null;
};

export type OrderStoreType = {
  rows: OrderRowType[];
};
