import { Server } from 'http';

declare global {
  namespace NodeJS {
    interface Global {
      testServer: Server;
    }
  }
}