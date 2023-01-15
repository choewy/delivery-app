import { orderStore } from '@/store';
import { FC } from 'react';
import { View, FlatList } from 'react-native';
import { SignedScreenName } from '../enums';
import { SignedScreenProps } from '../types';
import { orderHooks } from './order.hooks';

export const OrderScreen: FC<
  SignedScreenProps<SignedScreenName.Order>
> = ({}) => {
  orderHooks.useSocketEvents();

  const { rows } = orderStore.useValue();
  const renderRow = orderHooks.useRenderEachOther();

  return (
    <View>
      <FlatList
        data={rows}
        keyExtractor={row => row.id.toString()}
        renderItem={renderRow}
      />
    </View>
  );
};
