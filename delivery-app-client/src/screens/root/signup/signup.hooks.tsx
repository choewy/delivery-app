import { authApiService, storageService } from '@/core';
import { appStore } from '@/store';
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
    const setAuth = appStore.useSetAuth();

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

      try {
        const signOk = await authApiService.signUp({ email, password, name });
        await storageService.setToken(signOk.refreshToken);
        setAuth(signOk);
        Alert.alert('알림', '회원가입 되었습니다.');
      } catch (e) {
        const error = e as any;
        Alert.alert(error.message);
      }
    }, [email, password, name, setAuth]);
  }

  useToSignInEvent(
    navigation: NativeStackNavigationProp<
      RootScreenParamList,
      RootScreenName.SignUp,
      undefined
    >,
  ) {
    return useCallback(() => {
      navigation.navigate(RootScreenName.SignIn);
    }, [navigation]);
  }
}

export const signUpHooks = new SignUpHooks();
