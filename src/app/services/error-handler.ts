import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable()
export abstract class ErrorHandler {
    constructor() { }

    public handleError<T>(operation = 'operation', result?: T) {// To:DO: Need to modify based on logging mechanism for audit
        return (errorResp: any): Observable<T> => {
          const error = errorResp.error ? errorResp.error.message : errorResp.statusText || 'An error ocurred';
          return throwError(errorResp);
          // return of(result as T);
        };
      }
}
