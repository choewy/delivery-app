import { ConfigService } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { ConfigKey, ServerConfig } from './core';

export class Bootstrap {
  private readonly configService: ConfigService;

  constructor(private readonly app: NestApplication) {
    this.configService = this.app.get(ConfigService);
  }

  async listen(): Promise<void> {
    const { port, host } = this.configService.get<ServerConfig>(
      ConfigKey.Server,
    );

    return this.app.listen(port, host);
  }
}
