import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInBody {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}

export class SignUpBody extends SignInBody {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class SignOkResponse {
  email: string;
  name: string;
  accessToken: string;
  refreshTotken: string;
}
