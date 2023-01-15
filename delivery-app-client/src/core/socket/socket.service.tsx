import { useCallback, useEffect } from 'react';
import SocketIoClient, { Socket } from 'socket.io-client';
import { ConfigService } from '../config';

export class SocketService {
  private socket: Socket | undefined;

  constructor(private readonly configService: ConfigService) {}

  useSocketConnect(signed: boolean): void {
    if (!this.socket && signed) {
      this.socket = SocketIoClient(this.configService.WS_URL, {
        transports: ['websocket'],
      });
      this.socket.connect();
    }

    const disconnect = useCallback(() => {
      if (this.socket && !signed) {
        this.socket.disconnect();
        this.socket = undefined;
      }
    }, [signed]);

    useEffect(() => {
      if (this.socket) {
        () => {
          disconnect();
        };
      }
    }, [disconnect]);
  }
}

export const socketService = new SocketService(new ConfigService());
