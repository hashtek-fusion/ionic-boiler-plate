import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/auth/authentication.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

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
      url: '/members/settings',
      icon: 'settings'
    }
  ];

  isLoggedin = false;
  loggedinUser: any;
  chosenPicture: any = 'assets/img/avatar/girl-avatar.png';

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private router: Router,
    private domSanitizer: DomSanitizer,
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
    this.authService.getDisplayPicture();
    this.authService.userProfileState
        .subscribe(resp => {
          this.loggedinUser = `${resp.firstName} ${resp.lastName}`;
        });
    this.authService.profilePictureState
        .subscribe(resp => {
          const santizeResp = this.domSanitizer.bypassSecurityTrustUrl(resp.img);
          this.chosenPicture = santizeResp;
        });
  }

  logout() {
    this.authService.logout();
  }
}
