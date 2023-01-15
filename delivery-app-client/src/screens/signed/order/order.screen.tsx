import { FC } from 'react';
import { View, Text } from 'react-native';
import { SignedScreenName } from '../enums';
import { SignedScreenProps } from '../types';

export const OrderScreen: FC<
  SignedScreenProps<SignedScreenName.Order>
> = () => {
  return (
    <View>
      <Text>주문</Text>
    </View>
  );
};
