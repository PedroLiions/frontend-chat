import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../guards/auth.guard";

import {LayoutComponent} from "../template/layout/layout.component";
import {HomeComponent} from "../views/home/home.component";
import {ChatComponent} from "../views/chat/chat.component";


const routes: Routes = [
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
  imports: [RouterModule.forChild(routes)],
  // exports: [RouterModule]
})
export class ChatRoutingModule {

}
