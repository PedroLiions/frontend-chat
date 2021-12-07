import {Component, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {SocketService} from "./services/socket.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'frontend-chat';

  constructor(
    private socketService: SocketService
  ) {
  }

  ngOnInit() {

  }
}
