import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const memberRoutes: Routes = [
  { path: '', redirectTo: 'dashboard' },
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule' },
  { path: 'notifications', loadChildren: './notification/notification.module#NotificationPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(memberRoutes)],
  exports: [RouterModule]
})
export class MemberRoutingModule { }