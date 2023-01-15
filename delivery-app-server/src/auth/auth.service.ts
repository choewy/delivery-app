import { FileDBService } from '@/core';
import { UserEntity } from '@/core/entities/user.entity';
import { FileDBPRovideToken } from '@/core/filedb/enums';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SignOkResponse, SignUpBody } from './dtos';

@Injectable()
export class AuthService {
  constructor(
    @Inject(FileDBPRovideToken.User)
    private readonly userRepository: FileDBService<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

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
      { secret: 'DEILIVERY_APP_SECRET', expiresIn: '1d' },
    );

    res.refreshTotken = this.jwtService.sign(
      {},
      { secret: 'DEILIVERY_APP_SECRET', expiresIn: '20d' },
    );

    return res;
  }
}
