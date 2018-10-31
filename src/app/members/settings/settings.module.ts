import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SettingsPage } from './settings.page';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'password',
    component: PasswordComponent
  },
  {
    path: 'picture',
    component: ProfilePictureComponent
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  providers: [Camera, File, WebView],
  declarations: [SettingsPage, ProfileComponent, PasswordComponent, ProfilePictureComponent]
})
export class SettingsPageModule {}
