import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import {
  appApiService,
  authApiService,
  SignOkResponse,
  storageService,
} from '@/core';
import { Store } from '@/utils';
import { AppStoreType } from './types';

export class AppStore extends Store<AppStoreType> {
  useHealthCheck() {
    const callApi = useCallback(async () => {
      const result = ['health-check'];
      try {
        result.push(await appApiService.healthCheck());
        console.log(result.join(' : '));
      } catch (e) {
        Alert.alert(result.join(' : '));
      }
    }, []);

    useEffect(() => {
      callApi();
    }, [callApi]);
  }

  useAuthEffect() {
    const initValue = this.initValue();
    const setState = this.useSetState();
    const setAuth = this.useSetAuth();

    const callApi = useCallback(async () => {
      const refreshToken = await storageService.getRefreshToken();

      if (!refreshToken) {
        setState(prev => ({ ...prev, auth: initValue.auth }));
        return;
      }

      try {
        const signOk = await authApiService.auth(refreshToken);
        await storageService.setToken(signOk.refreshToken);
        setAuth(signOk);
      } catch (e) {
        console.log(e);
      }
    }, [initValue, setAuth, setState]);

    useEffect(() => {
      callApi();
    }, [callApi]);
  }

  useSigned(): boolean {
    return !!this.useValue().auth.accessToken;
  }

  useSetAuth() {
    const setState = this.useSetState();

    return useCallback(
      (sign: SignOkResponse) => {
        setState(prev => ({
          ...prev,
          auth: {
            name: sign.name,
            email: sign.email,
            accessToken: sign.accessToken,
          },
        }));
      },
      [setState],
    );
  }
}

export const appStore = new AppStore(AppStore.name, {
  auth: {
    email: '',
    name: '',
    accessToken: '',
  },
});
