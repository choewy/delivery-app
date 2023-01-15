export * from './enums';
export * from './types';

import server from './server.config';
import jwt from './jwt.config';

export const configs = [server, jwt];
