import { socketService } from '@/core';
import {
  OrderEmitEventSubject,
  OrderOnEventSubject,
} from '@/core/socket/enums';
import { appStore, OrderRowType, orderStore } from '@/store';
import { ReactElement, useCallback, useEffect } from 'react';
import { orderComponent } from './order.component';

export class OrderHooks {
  useSocketEvents(): void {
    const { auth } = appStore.useValue();
    const setOrderRows = orderStore.useSetRows();
    const socket = socketService.useOrderSocket(auth.accessToken);

    useEffect(() => {
      if (!socket) {
        return;
      }

      socket.on(OrderOnEventSubject.Init, setOrderRows);
      socket.emit(OrderEmitEventSubject.Init);

      return () => {
        Object.values(OrderOnEventSubject).forEach(event => socket.off(event));
      };
    }, [socket, setOrderRows]);
  }

  useRenderEachOther(): (row: { item: OrderRowType }) => ReactElement {
    const onPressAccept = orderStore.useAcceptEvent();

    return useCallback(
      ({ item }) =>
        orderComponent.orderRow({
          item,
          onPressAccept: onPressAccept(item.id),
        }),
      [onPressAccept],
    );
  }
}

export const orderHooks = new OrderHooks();
