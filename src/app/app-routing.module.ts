import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthGuard } from './auth/auth.guard';
import { SigninAndUpComponent } from './auth/signin-and-up/signin-and-up.component';
import { UserComponent } from './auth/user/user.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { HomeComponent } from './home/home.component';
import { UserHomeComponent } from './user-home/user-home.component';


const routes: Routes = [
  {path:'',component:SigninAndUpComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard],data: {permittedRoles:['Admin']}, },
  {path:'users',component:UserComponent,canActivate:[AuthGuard],data: {permittedRoles:['Admin']},},
  {path:'forbidden',component:ForbiddenComponent},
  {path:'user-home',component:UserHomeComponent,canActivate:[AuthGuard],data: {permittedRoles:['User']}},
]; 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
