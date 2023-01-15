import { FC } from 'react';
import { View, Text } from 'react-native';
import { SignedScreenName } from '../enums';
import { SignedScreenProps } from '../types';
import { settingComponent } from './setting.component';
import { settingHooks } from './setting.hooks';

export const SettingScreen: FC<
  SignedScreenProps<SignedScreenName.Setting>
> = () => {
  const onPressSignOut = settingHooks.useSignOutEvent();

  return (
    <View>
      <Text>설정</Text>
      {settingComponent.logoutButton({ signOutEvent: onPressSignOut })}
    </View>
  );
};
