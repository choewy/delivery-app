import { FC, useState } from 'react';
import { DismissKeyboardView } from '@/components';
import { RootScreenName } from '../enums';
import { RootScreenProps } from '../types';
import { signInHooks } from './signin.hooks';
import { signInComponent } from './signin.component';

export const SignInScreen: FC<RootScreenProps<RootScreenName.SignIn>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeEmail = signInHooks.useTextInputChangeEvent(setEmail);
  const onChangePassword = signInHooks.useTextInputChangeEvent(setPassword);

  const onSignIn = signInHooks.useSubmitEvent(email, password);
  const onSignUp = signInHooks.useToSignUpEvent(navigation);

  return (
    <DismissKeyboardView>
      {signInComponent.email({
        value: email,
        onChangeText: onChangeEmail,
      })}
      {signInComponent.password({
        value: password,
        onChangeText: onChangePassword,
        onSubmitEditing: onSignIn,
      })}
      {signInComponent.buttons({
        email,
        password,
        signInEvent: onSignIn,
        signUpEvent: onSignUp,
      })}
    </DismissKeyboardView>
  );
};
