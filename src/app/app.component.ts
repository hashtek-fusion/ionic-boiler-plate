import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.scss'],
})
export class AppComponent {
  memberPages = [
    {
      title: 'Home',
      url: '/members/dashboard',
      icon: 'home'
    },
    {
      title: 'Notifications',
      url: '/members/notifications',
      icon: 'notifications'
    },
    {
      title: 'Settings',
      url: '/members/Settings',
      icon: 'settings'
    }
  ];

  isLoggedin = false;
  loggedinUser = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // Verify user authentication state
      this.authService.authState.subscribe(state => {
        if (state) {
          this.isLoggedin = true;
          this.getUserInfo();
          this.router.navigate(['members', 'dashboard']);
        } else {
          this.isLoggedin = false;
          this.router.navigate(['login']);
        }
      });
    });
  }

  async getUserInfo() {
    const user = await this.authService.getUser();
    this.loggedinUser = `${user.firstName} ${user.lastName}`;
  }

  logout() {
    this.authService.logout();
  }
}
