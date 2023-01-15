import { FC, useState } from 'react';
import { DismissKeyboardView } from '@/components';
import { RootScreenName } from '../enums';
import { RootScreenProps } from '../types';
import { signUpHooks } from './signup.hooks';
import { signUpComponent } from './signup.component';

export const SignUpScreen: FC<RootScreenProps<RootScreenName.SignUp>> = ({
  navigation,
}) => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChangeEmail = signUpHooks.useTextInputChangeEvent(setEmail);
  const onChangeName = signUpHooks.useTextInputChangeEvent(setName);
  const onChangePassword = signUpHooks.useTextInputChangeEvent(setPassword);

  const onSignUp = signUpHooks.useSubmitEvent(email, password, name);
  const onSignIn = signUpHooks.useToSignInEvent(navigation);

  return (
    <DismissKeyboardView>
      {signUpComponent.email({
        value: email,
        onChangeText: onChangeEmail,
      })}
      {signUpComponent.name({
        value: name,
        onChangeText: onChangeName,
      })}
      {signUpComponent.password({
        value: password,
        onChangeText: onChangePassword,
        onSubmitEditing: onSignUp,
      })}
      {signUpComponent.buttons({
        email,
        name,
        password,
        signUpEvent: onSignUp,
        signInEvent: onSignIn,
      })}
    </DismissKeyboardView>
  );
};
