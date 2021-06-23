import { UserErrorHandlerService } from './../service/user-error-handler.service';
import { SnackbarService } from './../service/snackbar.service';
import { User } from './../models/user';
import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private errorHandler: UserErrorHandlerService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    return this.checkAuthentication().then((res: User) => {
      if (this.errorHandler.handle(res, route)) {
        return false;
      }
      return true;
    }, err => {
      return false;
    });
  }

  async checkAuthentication() {
    const isAuthenticate = await this.authService.getUser().toPromise()
    return isAuthenticate;
  }



}
