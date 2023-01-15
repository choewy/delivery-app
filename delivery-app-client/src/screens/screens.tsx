import { FC } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { appStore } from '@/store';
import { RootScreens } from './root';
import { SignedScreens } from './signed/screens';
import { socketService } from '@/core';

export const Screens: FC = () => {
  const signed = appStore.useSigned();
  const socket = socketService.useSocket(signed);

  return (
    <NavigationContainer>
      {signed ? <SignedScreens /> : <RootScreens />}
    </NavigationContainer>
  );
};
