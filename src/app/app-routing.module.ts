import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'',redirectTo:'homepage',pathMatch:'full'},
  {path:'homepage',component:HomePageComponent},
  {path:'dashboard',component:DashBoardComponent},
  {path:'profile',component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
