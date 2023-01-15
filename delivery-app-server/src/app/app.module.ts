import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppGateway } from './app.gateway';
import { AuthModule } from '@/auth';
import { CoreModule } from '@/core';
import { OrderModule } from '@/order';

@Module({
  imports: [CoreModule, AuthModule, OrderModule],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
