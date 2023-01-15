import { AuthModule } from '@/auth';
import { CoreModule } from '@/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';

@Module({
  imports: [CoreModule, AuthModule],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
