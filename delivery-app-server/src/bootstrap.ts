import { ConfigService } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import {
  ConfigKey,
  ServerConfig,
  HttpJwtGuard,
  HttpSessionGuard,
} from './core';

export class Bootstrap {
  private readonly configService: ConfigService;

  constructor(private readonly app: NestApplication) {
    this.configService = this.app.get(ConfigService);

    this.app.useGlobalGuards(
      this.app.get(HttpSessionGuard),
      this.app.get(HttpJwtGuard),
    );
  }

  async listen(): Promise<void> {
    const { port, host } = this.configService.get<ServerConfig>(
      ConfigKey.Server,
    );

    return this.app.listen(port, host);
  }
}
