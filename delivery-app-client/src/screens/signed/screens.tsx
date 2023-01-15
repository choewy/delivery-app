import { FC } from 'react';
import { SignedScreenName } from './enums';
import { MyOrderScreens } from './my';
import { OrderScreen } from './order';
import { SettingScreen } from './setting';
import { SignedScreenStack } from './stack';

export const SignedScreens: FC = () => {
  return (
    <SignedScreenStack.Navigator>
      <SignedScreenStack.Screen
        name={SignedScreenName.Order}
        component={OrderScreen}
        options={{ title: '주문' }}
      />
      <SignedScreenStack.Screen
        name={SignedScreenName.MyOrder}
        component={MyOrderScreens}
        options={{ title: '내 정보', headerShown: false }}
      />
      <SignedScreenStack.Screen
        name={SignedScreenName.Setting}
        component={SettingScreen}
        options={{ title: '설정' }}
      />
    </SignedScreenStack.Navigator>
  );
};
