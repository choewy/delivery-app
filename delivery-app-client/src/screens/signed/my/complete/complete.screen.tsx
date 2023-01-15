import { FC } from 'react';
import { View, Text } from 'react-native';
import { MyScreenName } from '../enums';
import { MyScreenProps } from '../types';

export const MyOrderCompleteScreen: FC<
  MyScreenProps<MyScreenName.Complete>
> = ({}) => {
  return (
    <View>
      <Text>주문 완료</Text>
    </View>
  );
};
