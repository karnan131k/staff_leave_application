import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { SigninAndUpComponent } from './auth/signin-and-up/signin-and-up.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {path:'',component:SigninAndUpComponent},
  {path:'home',component:HomeComponent},
  // {path:'home',component:DashboardComponent},
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
