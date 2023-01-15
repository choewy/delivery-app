import { FC } from 'react';
import { MyOrderCompleteScreen } from './complete';
import { MyScreenName } from './enums';
import { MyOrderIngScreen } from './ing';
import { MyScreenStack } from './stack';

export const MyOrderScreens: FC = () => {
  return (
    <MyScreenStack.Navigator>
      <MyScreenStack.Screen
        name={MyScreenName.Ing}
        component={MyOrderIngScreen}
        options={{ title: '내 주문 목록' }}
      />
      <MyScreenStack.Screen
        name={MyScreenName.Complete}
        component={MyOrderCompleteScreen}
        options={{ title: '완료하기' }}
      />
    </MyScreenStack.Navigator>
  );
};
