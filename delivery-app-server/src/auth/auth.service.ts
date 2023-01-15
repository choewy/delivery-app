import {
  ConfigKey,
  JwtConfig,
  FileDBService,
  FileDBPRovideToken,
  UserEntity,
} from '@/core';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SignOkResponse, SignUpBody } from './dtos';

@Injectable()
export class AuthService {
  private readonly JWT_SERCRET_KEY: string | Buffer;

  constructor(
    @Inject(FileDBPRovideToken.User)
    private readonly userRepository: FileDBService<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.JWT_SERCRET_KEY = this.configService.get<JwtConfig>(
      ConfigKey.Jwt,
    ).secret;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findAndBy({ email });
  }

  async insertUser(body: SignUpBody): Promise<UserEntity> {
    return this.userRepository.insert(body);
  }

  async issueTokens(user: UserEntity): Promise<SignOkResponse> {
    const res = new SignOkResponse();

    res.email = user.email;
    res.name = user.name;
    res.accessToken = this.jwtService.sign(
      { id: user.id },
      { secret: this.JWT_SERCRET_KEY, expiresIn: '1d' },
    );

    res.refreshTotken = this.jwtService.sign(
      {},
      { secret: this.JWT_SERCRET_KEY, expiresIn: '20d' },
    );

    return res;
  }
}
