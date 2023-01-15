import { useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import { appApiService, SignOkResponse } from '@/core';
import { Store } from '@/utils';
import { AppStoreType } from './types';

export class AppStore extends Store<AppStoreType> {
  useSigned(): boolean {
    return !!this.useValue().auth.email;
  }

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
