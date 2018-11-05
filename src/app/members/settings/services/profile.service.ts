import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ErrorHandler } from '../../../utility/error-handler';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends ErrorHandler {

  constructor(private readonly http: HttpClient) {
    super();
   }

  uploadPicture(fileData) { // POST
    const uploadAPI = `${environment.api_server}/users/profile/picture`;
    return this.http
        .post(uploadAPI, fileData)
        .pipe(
          catchError(this.handleError<any>('UploadProfilePicture'))
        );
  }

  updateProfile(user) { // PUT
    const profileAPI = `${environment.api_server}/users/profile`;
    return this.http
          .put(profileAPI, user)
          .pipe(
            catchError(this.handleError<any>('ManageUserProfile'))
          );
  }

  changePassword(user) {
    const passwordAPI = `${environment.api_server}/users/profile/password`;
    return this.http
          .put(passwordAPI, user)
          .pipe(
            catchError(this.handleError<any>('ChangeUserPassword'))
          );
  }
}
