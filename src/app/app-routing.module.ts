import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {
  canActivate,
  redirectUnauthorizedTo,
  redirectLoggedInTo,
} from '@angular/fire/auth-guard';

const redirectToogin = () => redirectUnauthorizedTo(['/login']);


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home',
  },
  { path: 'home', component: HomeComponent, ...canActivate(redirectToogin) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
