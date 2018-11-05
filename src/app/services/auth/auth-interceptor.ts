import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable, from } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private readonly authService: AuthenticationService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.authService.getToken()).pipe(switchMap(token => {
            if (token) {
                const authReq = req.clone({setHeaders: {Authorization: `Bearer ${token}`}});
                // send cloned request with auth header to the next handler.
                return next.handle(authReq);
            } else {
                return next.handle(req);
            }
        }));
    }

}
