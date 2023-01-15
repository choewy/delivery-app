import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
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
    EventEmitterModule.forRoot(),
  ],
  providers: [
    EventEmitter2,
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
    EventEmitter2,
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
