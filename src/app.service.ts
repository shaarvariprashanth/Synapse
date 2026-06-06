import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { project: string; status: string } {
    return { project: 'Synapse', status: 'Running' };
  }
}
