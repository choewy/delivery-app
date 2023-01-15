import { ConfigService } from '@/core/config';
import { ApiService } from '../api.service';
import { SignInBody, SignOkResponse, SignUpBody } from './types';

export class AuthApiService extends ApiService {
  async auth(refreshToken: string): Promise<SignOkResponse> {
    return this.request.get('/auth', {
      headers: { authorization: `Refresh ${refreshToken}` },
    });
  }

  async signIn(body: SignInBody): Promise<SignOkResponse> {
    return this.request.post('/auth/signin', body);
  }

  async signUp(body: SignUpBody): Promise<SignOkResponse> {
    return this.request.post('/auth/signup', body);
  }

  async signOut(accessToken: string): Promise<void> {
    return this.request.post('/auth/signout', undefined, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  }
}

export const authApiService = new AuthApiService(new ConfigService());
