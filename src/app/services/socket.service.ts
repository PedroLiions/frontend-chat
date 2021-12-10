import {Injectable} from '@angular/core';
import * as socketIo from "socket.io-client";
import {Socket} from "socket.io-client/build/esm/socket";
import {ChatModule} from "../chat/chat.module";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket!: Socket;

  constructor() {

  }

  connect() {
    this.socket = socketIo.connect("localhost:3000", {
      transports: ['websocket'],
      query: {
        'token': <string>localStorage.getItem('access_token')
      }
    })
  }

  disconnect() {
    this.socket.disconnect();
  }
}
