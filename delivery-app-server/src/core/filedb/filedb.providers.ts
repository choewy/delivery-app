import { Provider } from '@nestjs/common';
import { FileDBPRovideToken } from './enums';
import { FileDBService } from './filedb.service';

export const SessionRepositoryProvider: Provider = {
  provide: FileDBPRovideToken.Session,
  useFactory() {
    return new FileDBService('session');
  },
};

export const UserRepositoryProvider: Provider = {
  provide: FileDBPRovideToken.User,
  useFactory() {
    return new FileDBService('user');
  },
};

export const OrderRepositoryProvider: Provider = {
  provide: FileDBPRovideToken.Order,
  useFactory() {
    return new FileDBService('order');
  },
};
