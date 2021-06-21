import { SnackbarService } from './../service/snackbar.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private snackBArService: SnackbarService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('okkkkkkkkkkkkkkkkkk');
    return next.handle(request).pipe(catchError((err, caught) => {
      if ([401, 403].includes(err.status)) {
        // auto logout if 401 or 403 response returned from api
        let errorMessage = err.error.message ? err.error.message : err.error;
        this.snackBArService.display(errorMessage);
        this.authService.logout();
      }
      return throwError("Error");

    }))
  }
}
