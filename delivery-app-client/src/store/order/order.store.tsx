import { orderApiService } from '@/core';
import { Store } from '@/utils';
import { useCallback } from 'react';
import { appStore } from '../app';
import { OrderRowType, OrderStoreType } from './types';

export class OrderStore extends Store<OrderStoreType> {
  useSetRows(): (rows: OrderRowType[]) => void {
    const setState = this.useSetState();

    return useCallback(
      rows => {
        setState(prev => ({ ...prev, rows }));
      },
      [setState],
    );
  }

  useAcceptEvent(): (orderId: number) => () => Promise<void> {
    const { auth } = appStore.useValue();

    return useCallback(
      orderId => async () => {
        try {
          await orderApiService.updateToAccept(orderId, auth.accessToken);
        } catch (e) {
          console.log(e);
        }
      },
      [auth],
    );
  }
}

export const orderStore = new OrderStore(OrderStore.name, {
  rows: [],
});
