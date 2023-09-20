import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectoToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    ...canActivate(redirectoToHome)
  },
  {
    path: 'register',
    component: RegisterComponent,
    ...canActivate(redirectoToHome)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
