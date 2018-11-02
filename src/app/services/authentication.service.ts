import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ErrorHandler } from './error-handler';
import { UserProfileDto } from '../../dto/user.profile.dto';

const TOKEN_KEY = 'ionicv4-jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends ErrorHandler {

  authState = new BehaviorSubject(false);
  profilePictureState = new BehaviorSubject({img: ''});
  userProfileState = new BehaviorSubject<UserProfileDto>({});

  constructor(private readonly storage: Storage, private readonly platform: Platform, private readonly http: HttpClient) {
    super();
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

  login = (user) => {
    const loginAPI = `${environment.api_server}/auth/login`;
    return this.http
      .post(loginAPI, user)
      .pipe(
        catchError(this.handleError<any>('UserLogin'))
      );
  }

  register = (user) => {
    const registerAPI = `${environment.api_server}/auth/register`;
    return this.http
      .post(registerAPI, user)
      .pipe(
        catchError(this.handleError<any>('UserRegistration'))
      );
  }

  getDisplayPicture = () => {
    const pictureAPI = `${environment.api_server}/users/profile/picture`;
    this.http
      .get(pictureAPI)
      .pipe(
        catchError(this.handleError<any>('UserLogin'))
      )
      .subscribe(resp => {
        this.profilePictureState.next(resp);
      });
  }

  async setToken(token, user) {
    await this.storage.set(TOKEN_KEY, token);
    this.authState.next(true);
    this.userProfileState.next(user);
  }

  getToken() {
    return this.storage.get(TOKEN_KEY);
  }

  async logout() {
    await this.storage.remove(TOKEN_KEY);
    this.authState.next(false);
    this.profilePictureState.next({img: ''});
    this.userProfileState.next({});
  }

}
