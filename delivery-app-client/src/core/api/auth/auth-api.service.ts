import { ConfigService } from '@/core/config';
import { ApiService } from '../api.service';
import { SignInBody, SignOkResponse, SignUpBody } from './types';

export class AuthApiService extends ApiService {
  async signIn(body: SignInBody): Promise<SignOkResponse> {
    return this.request.post('/auth/signin', body);
  }

  async signUp(body: SignUpBody): Promise<SignOkResponse> {
    return this.request.post('/auth/signup', body);
  }
}

export const authApiService = new AuthApiService(new ConfigService());
