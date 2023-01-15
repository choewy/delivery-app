import { FC } from 'react';
import { Text, View } from 'react-native';
import { MyScreenName } from '../enums';
import { MyScreenProps } from '../types';

export const MyOrderIngScreen: FC<MyScreenProps<MyScreenName.Ing>> = () => {
  return (
    <View>
      <Text>내 주문 목록</Text>
    </View>
  );
};
