import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigKey, JwtConfig } from '../config';
import { SessionEntity } from '../entities';
import { FileDBService, FileDBPRovideToken } from '../filedb';

@Injectable()
export class HttpSessionGuard implements CanActivate {
  private readonly JWT_SECRET_KEY: string | Buffer;

  constructor(
    @Inject(FileDBPRovideToken.Session)
    private readonly sessionRespository: FileDBService<SessionEntity>,
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_SECRET_KEY = this.configService.get<JwtConfig>(
      ConfigKey.Jwt,
    ).secret;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (await this.checkPublicRequest(context)) {
      return true;
    }

    return this.checkRefreshToken(context);
  }

  async checkPublicRequest(context: ExecutionContext): Promise<boolean> {
    return this.reflector.get('public', context.getHandler()) === true;
  }

  async checkRefreshToken(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const authorization = request.headers.authorization;

    if (!authorization.startsWith('Refresh')) {
      return true;
    }

    const refreshToken = authorization.replace('Refresh ', '');

    if (!refreshToken) {
      throw new UnauthorizedException();
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: this.JWT_SECRET_KEY,
      });
    } catch (e) {
      await this.sessionRespository.deleteAndBy({ refreshToken });
      throw new UnauthorizedException();
    }

    return this.checkSession(request, refreshToken);
  }

  async checkSession(request: Request, refreshToken: string): Promise<boolean> {
    const session = await this.sessionRespository.findAndBy({ refreshToken });

    if (!session) {
      throw new UnauthorizedException();
    }

    request.headers.refresh = refreshToken;
    request.headers.authorization = `Bearer ${session.accessToken}`;

    return true;
  }
}
