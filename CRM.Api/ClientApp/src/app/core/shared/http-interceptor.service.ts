import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

import { NotifierService } from 'angular-notifier';

export class HttpInterceptorService implements HttpInterceptor {
  constructor(private notifierService: NotifierService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 500) {
          this.notifierService.notify('error', 'An Error Occured');
        } else if (response.status === 400) {
          if (typeof response.error === 'string') {
            this.notifierService.notify('error', response.error);
          } else {
            this.mapValidationErrors(response.error);
          }
        }
        let errorMessage = '';
        if (response.error instanceof ErrorEvent) {
          errorMessage = `Error: ${response.error.message}`;
        } else {
          errorMessage = `Error Code: ${response.status}\nMessage: ${response.message}`;
        }
        return throwError(errorMessage);
      })
    );
  }
  mapValidationErrors(error: any) {
    if (typeof error.errors === 'object') {
      const array: string[] = Object.values(error.errors);
      this.notifierService.notify('error', array[0]);
    }
  }
}
