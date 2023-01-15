import { BcryptService } from '@/core';
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInBody, SignOkResponse, SignUpBody } from './dtos';
import { AlreadyExistEmailException } from './exceptions';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly bcryptService: BcryptService,
  ) {}

  @Post('signin')
  async signIn(@Body() body: SignInBody): Promise<SignOkResponse> {
    const user = await this.authService.findByEmail(body.email);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!this.bcryptService.comparePassword(body.password, user.password)) {
      throw new UnauthorizedException();
    }

    return this.authService.issueTokens(user);
  }

  @Post('signup')
  async signUp(@Body() body: SignUpBody): Promise<SignOkResponse> {
    if (await this.authService.findByEmail(body.email)) {
      throw new AlreadyExistEmailException();
    }

    body.password = this.bcryptService.encodePassword(body.password);

    const user = await this.authService.insertUser(body);
    return this.authService.issueTokens(user);
  }
}
