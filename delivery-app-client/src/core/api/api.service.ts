import axios, { Axios } from 'axios';
import { ConfigService } from '../config';

export class ApiService {
  protected readonly request: Axios;

  constructor(private readonly configService: ConfigService) {
    this.request = axios.create({
      baseURL: this.configService.API_URL,
    });

    this.request.interceptors.response.use(
      response => response.data,
      error => Promise.reject(error.response.data),
    );
  }

  protected url() {}
}
