import { UserErrorHandlerService } from './../service/user-error-handler.service';
import { SnackbarService } from './../service/snackbar.service';
import { User } from './../models/user';
import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private snackBarService: SnackbarService,
    private userErrorHandlerService: UserErrorHandlerService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //TODO: check if user was verified
    const idToken = localStorage.getItem("id_token");
    if (!idToken) {
      this.userLogout('Please log in before accessing this page', state);
      return false;
    }
    return this.checkAuthentication().then((res: User) => {
      if (this.userErrorHandlerService.handle(res, route)) {
        return false
      }
      return true;
    }, err => {
      console.log(err);
      return false;
    });
  }

  async checkAuthentication() {
    const isAuthenticate = await this.authService.getUser().toPromise()
    return isAuthenticate;
  }

  userLogout(message, state) {
    this.snackBarService.display(message)
    this.authService.logout({ returnUrl: state.url });
    return false;
  }


}
