import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { configs } from './config';
import { FileDBService } from './filedb';
import { BcryptService } from './utils';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: configs,
      isGlobal: true,
    }),
    JwtModule.register({
      secret: 'DEILIVERY_APP_SECRET',
    }),
  ],
  providers: [BcryptService, JwtService, FileDBService],
  exports: [BcryptService, JwtService, FileDBService],
})
export class CoreModule {}
