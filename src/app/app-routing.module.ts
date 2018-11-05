import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/auth/auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './public/register/register.module#RegisterPageModule' },
  { path: 'members',
    loadChildren: './members/member-routing.module#MemberRoutingModule',
    canActivate: [AuthGuard]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
