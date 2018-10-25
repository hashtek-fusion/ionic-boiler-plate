import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';

const TOKEN_KEY = 'ionicv4-jwt-token';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(private readonly storage: Storage, private readonly platform: Platform) {
    this.platform.ready().then(() => {// In case of valid token available then no need to load login page
      this.verifyJWTToken();
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }

  verifyJWTToken() {
    this.storage.get(TOKEN_KEY).then(res => {// TO-DO:: Need to check JWT Token expiry
      if (res) {
        this.authState.next(true);
      }
    });
  }

  async login() {
    return await this.storage.set(TOKEN_KEY, 'Bearer 1234567').then(() => { // To-DO: Need to call Login API end point
      this.authState.next(true);
    });
  }

  async logout() {
    return await this.storage.remove(TOKEN_KEY).then(() => {
      this.authState.next(false);
    });
  }
}
