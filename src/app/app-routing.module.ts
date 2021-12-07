import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LayoutComponent} from "./template/layout/layout.component";
import {HomeComponent} from "./views/home/home.component";
import {ChatComponent} from "./views/chat/chat.component";
import {LoginComponent} from "./views/login/login.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: ':id',
        component: ChatComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
