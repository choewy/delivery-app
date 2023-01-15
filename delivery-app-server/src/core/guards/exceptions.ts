import { UnauthorizedException } from '@nestjs/common';

export class JwtExpiredException extends UnauthorizedException {}
