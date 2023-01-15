import { FC, Fragment } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { appStore } from '@/store';
import { RootScreens } from './root';
import { SignedScreens } from './signed/screens';
import { socketService } from '@/core';

export const Screens: FC = () => {
  appStore.useHealthCheck();
  appStore.useAuthEffect();

  const signed = appStore.useSigned();

  socketService.useSocketConnect(signed);

  return (
    <Fragment>
      <NavigationContainer>
        {signed ? <SignedScreens /> : <RootScreens />}
      </NavigationContainer>
    </Fragment>
  );
};
