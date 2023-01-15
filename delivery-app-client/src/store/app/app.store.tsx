import { Store } from '@/utils';
import { AppStoreType } from './types';

export class AppStore extends Store<AppStoreType> {
  useSigned(): boolean {
    return !!this.useValue().auth.email;
  }
}

export const appStore = new AppStore(AppStore.name, {
  auth: {
    email: '',
    name: '',
  },
});
