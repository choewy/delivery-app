import { FC } from 'react';
import { View, Text } from 'react-native';
import { SignedScreenName } from '../enums';
import { SignedScreenProps } from '../types';

export const SettingScreen: FC<
  SignedScreenProps<SignedScreenName.Setting>
> = () => {
  return (
    <View>
      <Text>설정</Text>
    </View>
  );
};
