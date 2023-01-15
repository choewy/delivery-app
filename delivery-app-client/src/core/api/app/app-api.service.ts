import { ConfigService } from '@/core/config';
import { ApiService } from '../api.service';

export class AppApiService extends ApiService {
  async healthCheck(): Promise<string> {
    return this.request.get('/health');
  }
}

export const appApiService = new AppApiService(new ConfigService());
