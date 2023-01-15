import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Socket } from 'socket.io';

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const httpRequest = ctx.switchToHttp().getRequest<Request>();
    const wsRequest = ctx.switchToWs().getClient<Socket>();

    return httpRequest['user'] || wsRequest.handshake.auth['user'];
  },
);
