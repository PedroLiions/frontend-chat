import {Component, OnDestroy, OnInit} from '@angular/core';
import {SocketService} from "../../services/socket.service";
import {JwtHelperService} from "@auth0/angular-jwt";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  messages: any[] = [];

  users: any[] = [];

  constructor(
    private socketService: SocketService,
    private jwtHelper: JwtHelperService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.socketService.connect();
    this.listenerUserConnected();
    this.previousUserConnected();
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

  previousUserConnected() {
    this.socketService.socket.on("previousUserConnected", users => {
      console.log("prev users connected", users);
      this.setUsers(users)
    });
  }
  previousMessages() {
    this.socketService.socket.on("previousMessages", messages => {
      this.messages = messages
      setTimeout(() => this.scrollMessagesBottom(), 1);
    });
  }

  listenerUserConnected() {
    this.socketService.socket.on("usersConnected", users => this.setUsers(users))
  }

  listenerMessages() {
    this.socketService.socket.on("receivedMessage", message => {
      this.messages.push(message);
      this.scrollMessagesBottom();
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

  setUsers(users: any) {
    const token = localStorage.getItem("access_token");
    const decoded = this.jwtHelper.decodeToken(<string>token);
    users = users.filter((user: any) => user.user_id !== decoded.user_id);
    this.users = users;
  }

  getMyUser() {
    const token = localStorage.getItem("access_token");
    const decoded = this.jwtHelper.decodeToken(<string>token);
    return decoded;
  }

  sair() {
    localStorage.clear();
    this.router.navigateByUrl("/login");
    this.socketService.disconnect();
  }

  ngOnDestroy() {
    this.socketService.disconnect();
  }

}
