import { Provider } from '@nestjs/common';
import { FileDBPRovideToken } from './enums';
import { FileDBService } from './filedb.service';

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
