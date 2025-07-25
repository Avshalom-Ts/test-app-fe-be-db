import { Injectable } from '@nestjs/common';
import * as os from 'os';

@Injectable()
export class AppService {
  getData(): { message: string, databaseURL: string, hostname: string, containerHostname: string } {
    return {
      message: 'Back-End',
      databaseURL: process.env.DATABASE_URL || 'not set',
      hostname: process.env.DOCKER_HOST_HOSTNAME || os.hostname(), // Docker host hostname
      containerHostname: os.hostname() // Container hostname for comparison
    };
  }

  getHostname(): {
    hostname: string,
    containerHostname: string,
    platform: string,
    nodeVersion: string,
    dockerHost: string
  } {
    return {
      hostname: process.env.DOCKER_HOST_HOSTNAME || 'not set', // Docker host hostname
      containerHostname: os.hostname(), // Container hostname
      platform: os.platform(),
      nodeVersion: process.version,
      dockerHost: process.env.DOCKER_HOST_HOSTNAME ? 'Available' : 'Not set - using container hostname'
    };
  }
}
