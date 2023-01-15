import { FC } from 'react';
import { RootScreenName } from './enums';
import { RootScreenStack } from './stack';
import { SignInScreen } from './signin';
import { SignUpScreen } from './signup';

export const RootScreens: FC = () => {
  return (
    <RootScreenStack.Navigator>
      <RootScreenStack.Screen
        name={RootScreenName.SignIn}
        component={SignInScreen}
        options={{ title: '로그인' }}
      />
      <RootScreenStack.Screen
        name={RootScreenName.SignUp}
        component={SignUpScreen}
        options={{ title: '회원가입' }}
      />
    </RootScreenStack.Navigator>
  );
};
