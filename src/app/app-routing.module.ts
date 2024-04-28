import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule) // Lazy load the HomePageModule when the root route is accessed
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup-page/signup-page.module').then(m => m.SignupPageModule) // Lazy load the SignupPageModule when /signup route is accessed
  },
  {
    path: 'login',
    loadChildren: () => import('./login-page/login-page.module').then(m => m.LoginPageModule) // Lazy load the LoginPageModule when /login route is accessed
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
