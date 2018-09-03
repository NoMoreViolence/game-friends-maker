import * as socketIO from 'socket.io';
import { Server } from 'http';

export class SocketServer {
  public io: socketIO.Server;

  constructor(httpServer: Server) {
    this.io = socketIO(httpServer);

    this.io.on('connection', (socket: socketIO.Socket) => {
      //
    });
  }
}
