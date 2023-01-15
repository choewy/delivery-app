import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { configs } from './config';
import {
  FileDBService,
  OrderRepositoryProvider,
  SessionRepositoryProvider,
  UserRepositoryProvider,
} from './filedb';
import { HttpJwtGuard, HttpSessionGuard } from './guards';
import { BcryptService } from './utils';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
    }),
  ],
  providers: [
    HttpSessionGuard,
    HttpJwtGuard,

    BcryptService,
    JwtService,
    FileDBService,
    SessionRepositoryProvider,
    UserRepositoryProvider,
    OrderRepositoryProvider,
  ],
  exports: [
    HttpSessionGuard,
    HttpJwtGuard,
    BcryptService,
    JwtService,
    FileDBService,
    SessionRepositoryProvider,
    UserRepositoryProvider,
    OrderRepositoryProvider,
  ],
})
export class CoreModule {}
