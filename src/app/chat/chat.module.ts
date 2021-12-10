import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatRoutingModule} from "./chat-routing.module";
import {LayoutComponent} from "../template/layout/layout.component";
import {HomeComponent} from "../views/home/home.component";
import {ChatComponent} from "../views/chat/chat.component";



@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    ChatComponent
  ],
  imports: [
    CommonModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
