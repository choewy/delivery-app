import { authApiService, storageService } from '@/core';
import { appStore } from '@/store';
import { useCallback } from 'react';
import { Alert } from 'react-native';

export class SettingHooks {
  useSignOutEvent() {
    const initAppStoreValue = appStore.initValue();
    const [appStoreValue, setAppState] = appStore.useState();

    return useCallback(async () => {
      if (!appStoreValue.auth.accessToken) {
        return;
      }

      try {
        await authApiService.signOut(appStoreValue.auth.accessToken);
        await storageService.removeRefreshToken();

        Alert.alert('로그아웃 되었습니다.');

        setAppState(prev => ({
          ...prev,
          auth: initAppStoreValue.auth,
        }));
      } catch (e) {
        const error = e as any;
        Alert.alert(error.message);
      }
    }, [initAppStoreValue, appStoreValue, setAppState]);
  }
}

export const settingHooks = new SettingHooks();
