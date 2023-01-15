import { JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';

export type ServerConfig = {
  port: number;
  host: string;
};

export type JwtConfig = JwtSignOptions & JwtVerifyOptions;
