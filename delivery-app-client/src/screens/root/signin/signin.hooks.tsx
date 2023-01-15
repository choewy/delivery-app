import { authApiService, storageService } from '@/core';
import { appStore } from '@/store';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { Alert } from 'react-native';
import { RootScreenName } from '../enums';
import { RootScreenParamList } from '../types';

export class SignInHooks {
  useTextInputChangeEvent(setState: Dispatch<SetStateAction<string>>) {
    return useCallback(
      (text: string) => {
        setState(text.trim().toLowerCase());
      },
      [setState],
    );
  }

  useSubmitEvent(email: string, password: string) {
    const setAuth = appStore.useSetAuth();

    return useCallback(async () => {
      if (!email || !email.trim()) {
        return Alert.alert('알림', '이메일을 입력하세요.');
      }

      if (!password || !password.trim()) {
        return Alert.alert('알림', '비밀번호를 입력하세요.');
      }

      try {
        const signOk = await authApiService.signIn({ email, password });
        await storageService.setToken(signOk.refreshToken);
        setAuth(signOk);
        Alert.alert('알림', '로그인되었습니다.');
      } catch (e) {
        const error = e as any;
        Alert.alert(error.message);
      }
    }, [email, password, setAuth]);
  }

  useToSignUpEvent(
    navigation: NativeStackNavigationProp<
      RootScreenParamList,
      RootScreenName.SignIn,
      undefined
    >,
  ) {
    return useCallback(() => {
      navigation.navigate(RootScreenName.SignUp);
    }, [navigation]);
  }
}

export const signInHooks = new SignInHooks();
