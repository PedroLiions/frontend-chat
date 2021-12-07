import {Component, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  messages: any[] = [];

  users: any[] = [];

  // @ts-ignore
  test;

  constructor(
    private socketService: SocketService,
    private jwtHelper: JwtHelperService
  ) {
  }

  ngOnInit(): void {
    this.listenerUserConnected();
    this.previousMessages();
    this.listenerMessages();
  }

  sendMessage(event: any) {
    event.preventDefault();
    const input = <any>document.querySelector("#message");
    const message = input.value

    const payload = {
      message: message
    }

    this.socketService.socket.emit("sendMessage", payload);

    input.value = "";
    this.scrollMessagesBottom();
  }

  previousMessages() {
    this.socketService.socket.on("previousMessages", messages => {
      this.messages = messages
      setTimeout(() => this.scrollMessagesBottom(), 1);
    });
  }

  listenerUserConnected() {
    this.socketService.socket.on("usersConnected", user => {
      this.users = user;
    })
  }

  listenerMessages() {
    this.socketService.socket.on("receivedMessage", message => {
      this.messages.push(message);
    })

    this.socketService.socket.on("receivedMyMessage", myMessage => this.messages.push(myMessage));
  }

  isMyMessage(message: any): boolean {
    const tokenDecoded = this.jwtHelper.decodeToken(<string>localStorage.getItem('access_token'));
    return (tokenDecoded.user_id === message.author.id)
  }


  scrollMessagesBottom() {
    const wrapperMessageEnviable = <HTMLElement>document.querySelector(".message-container");
    wrapperMessageEnviable.scrollTop = wrapperMessageEnviable.scrollHeight;
  }

}
