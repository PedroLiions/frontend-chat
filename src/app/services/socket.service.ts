import {Injectable} from '@angular/core';
import * as socketIo from "socket.io-client";
import {Socket} from "socket.io-client/build/esm/socket";

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket!: Socket;

  constructor() {
    console.log("<string>localStorage.getItem('access_token')", <string>localStorage.getItem('access_token'));
    this.socket = socketIo.connect("localhost:3000", {
      transports: ['websocket'],
      query: {
        'token': <string>localStorage.getItem('access_token')
      }
    })
  }
}
