import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { configs } from './config';
import { FileDBService, UserRepositoryProvider } from './filedb';
import { HttpJwtGuard } from './guards';
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
    HttpJwtGuard,
    BcryptService,
    JwtService,
    FileDBService,
    UserRepositoryProvider,
  ],
  exports: [
    HttpJwtGuard,
    BcryptService,
    JwtService,
    FileDBService,
    UserRepositoryProvider,
  ],
})
export class CoreModule {}
