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
import { UserEntity } from '../entities';
import { FileDBService, FileDBPRovideToken } from '../filedb';

@Injectable()
export class HttpJwtGuard implements CanActivate {
  private readonly JWT_SECRET_KEY: string | Buffer;

  constructor(
    @Inject(FileDBPRovideToken.User)
    private readonly userRepository: FileDBService<UserEntity>,
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

    return this.checkAuthorization(context);
  }

  async checkPublicRequest(context: ExecutionContext): Promise<boolean> {
    return this.reflector.get('public', context.getHandler()) === true;
  }

  async checkAuthorization(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const bearerToken = (request.headers.authorization || '').replace(
      'Bearer ',
      '',
    );

    if (!bearerToken) {
      throw new UnauthorizedException();
    }

    try {
      const payload = this.jwtService.verify(bearerToken, {
        secret: this.JWT_SECRET_KEY,
      });

      request['user'] = await this.userRepository.findAndBy({
        id: payload.id,
      });

      return true;
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException();
    }
  }
}
