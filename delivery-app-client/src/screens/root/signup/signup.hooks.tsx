import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { Alert } from 'react-native';
import { RootScreenName } from '../enums';
import { RootScreenParamList } from '../types';

export class SignUpHooks {
  useTextInputChangeEvent(setState: Dispatch<SetStateAction<string>>) {
    return useCallback(
      (text: string) => {
        setState(text.trim().toLowerCase());
      },
      [setState],
    );
  }

  useSubmitEvent(email: string, password: string, name: string) {
    return useCallback(async () => {
      if (!email || !email.trim()) {
        return Alert.alert('알림', '이메일을 입력하세요.');
      }

      if (!password || !password.trim()) {
        return Alert.alert('알림', '비밀번호를 입력하세요.');
      }

      if (!name || !name.trim()) {
        return Alert.alert('알림', '이름을 입력하세요.');
      }

      Alert.alert('알림', '회원가입 되었습니다.');
    }, [email, password, name]);
  }

  useToSignInEvent(
    navigation: NativeStackNavigationProp<
      RootScreenParamList,
      RootScreenName.SignUp,
      undefined
    >,
  ) {
    return useCallback(() => {
      navigation.navigate(RootScreenName.SignUp);
    }, [navigation]);
  }
}

export const signUpHooks = new SignUpHooks();
