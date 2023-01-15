import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app';
import { Bootstrap } from '@/bootstrap';

(async () => {
  const bootstrap = new Bootstrap(await NestFactory.create(AppModule));
  await bootstrap.listen();
})();
