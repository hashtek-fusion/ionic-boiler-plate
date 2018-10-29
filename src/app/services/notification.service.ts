import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorHandler } from './error-handler';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ErrorHandler {

  constructor(private readonly http: HttpClient, private readonly authService: AuthenticationService) {
    super();
  }

  getUserNotifications() {
    const notificationListAPI = `${environment.api_server}/notifications/user`;
    return this.http
        .get(notificationListAPI)
        .pipe(
          catchError(this.handleError<any>('GetUserNotifications'))
        );
  }
}
