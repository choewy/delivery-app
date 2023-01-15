import { registerAs } from '@nestjs/config';
import { ConfigKey } from './enums';
import { JwtConfig } from './types';

export default registerAs(
  ConfigKey.Jwt,
  (): JwtConfig => ({
    secret: process.env.JWT_SECRET_KEY,
  }),
);
