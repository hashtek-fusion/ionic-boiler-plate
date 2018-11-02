import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError } from 'rxjs/operators';
import { ErrorHandler } from '../../services/error-handler';

@Injectable({
  providedIn: 'root'
})
export class NotificationService extends ErrorHandler {

  constructor(private readonly http: HttpClient) {
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
