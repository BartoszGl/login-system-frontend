import { HttpErrorHandlerService } from './../service/http-error-handler.service';
import { SnackbarService } from './../service/snackbar.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../service/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorHandler: HttpErrorHandlerService) { }

  // Globalna obsługa błędów 401 i 403 pochodzących z backendu
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError((err: HttpErrorResponse, caught) => {
      this.errorHandler.handle(err)
      return throwError("Error");
    }))
  }
}
