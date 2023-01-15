import { ConfigService } from '@/core/config';
import { ApiService } from '../api.service';

export class OrderApiService extends ApiService {
  async updateToAccept(orderId: number, accessToken: string): Promise<void> {
    return this.request.patch(`order/${orderId}/accept`, undefined, {
      headers: { authorization: `Bearer ${accessToken}` },
    });
  }
}

export const orderApiService = new OrderApiService(new ConfigService());
