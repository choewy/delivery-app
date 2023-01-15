import { ConfigService } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { ConfigKey, ServerConfig } from './core';
import { HttpJwtGuard } from './core/guards';

export class Bootstrap {
  private readonly configService: ConfigService;

  constructor(private readonly app: NestApplication) {
    this.configService = this.app.get(ConfigService);

    this.app.useGlobalGuards(this.app.get(HttpJwtGuard));
  }

  async listen(): Promise<void> {
    const { port, host } = this.configService.get<ServerConfig>(
      ConfigKey.Server,
    );

    return this.app.listen(port, host);
  }
}
