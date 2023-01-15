import { useEffect } from 'react';
import { io, Socket } from 'socket.io-client';
import { ConfigService } from '../config';

export class SocketService {
  private socket: Socket | undefined;
  private orderSocket: Socket | undefined;

  constructor(private readonly configService: ConfigService) {}

  useOrderSocket(accessToken: string): Socket | undefined {
    if (!this.orderSocket && accessToken) {
      this.orderSocket = io(this.configService.WS_URL + '/order', {
        transports: ['websocket'],
      });
      this.orderSocket.connect();
    }

    useEffect(() => {
      if (this.orderSocket && !accessToken) {
        this.orderSocket.disconnect();
        this.orderSocket = undefined;
      }
    }, [accessToken]);

    return this.orderSocket;
  }

  useSocketConnect(signed: boolean): void {
    if (!this.socket && signed) {
      this.socket = io(this.configService.WS_URL + '/order', {
        transports: ['websocket'],
      });
      this.socket.connect();
    }

    useEffect(() => {
      if (this.socket && !signed) {
        this.socket.disconnect();
        this.socket = undefined;
      }
    }, [signed]);
  }
}

export const socketService = new SocketService(new ConfigService());
