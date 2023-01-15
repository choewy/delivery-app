import { Public } from '@/core';
import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Public()
  @Get('health')
  async healthCheck(): Promise<string> {
    return 'complete';
  }
}
