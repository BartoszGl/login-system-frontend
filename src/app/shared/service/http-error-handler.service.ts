import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  private err: HttpErrorResponse;
  private message = 'Undefined error happen, please contact us'
  constructor(
    private authService: AuthService,
    private snackBArService: SnackbarService,
    private route: ActivatedRoute
  ) { }

  public handle(err: HttpErrorResponse): void {
    this.err = err

    this.handleFailedLogin();
    this.handleBadRequest();
    this.handleServerError();

    this.finalizeErrorHandling();
  }

  private handleFailedLogin(): void {
    if ([401, 403].includes(this.err.status)) {
      this.message = this.err.error.message ? this.err.error.message : this.err.error;
    }
  }

  // Teoretycznie z tego względu, że error message wygląda podobnie
  // można by było dać poniższą funkcję do handle unauthorized, ale istnieje możliwość, że
  // kiedyś wraz z rozwojem aplikacji np będę chciał zmienić sposób obsługi tylko i wyłącznie bad request.
  private handleBadRequest(): void {
    if ([400].includes(this.err.status)) {
      this.message = this.err.error
    }
  }

  private handleServerError(): void {
    if ([500].includes(this.err.status)) {
      this.message = 'Internal server error, please contact us'
    }
  }

  private finalizeErrorHandling(): void {
    console.log('tu jestem')
    this.snackBArService.display(this.message);
    this.route.queryParams
      .subscribe(params => {
        console.log(params);
        this.authService.logout({ returnUrl: params.returnUrl });
      }
      );
  }

}
