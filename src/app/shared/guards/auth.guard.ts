import { SnackbarService } from './../service/snackbar.service';
import { User } from './../models/user';
import { tap, map, catchError } from 'rxjs/operators';
import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
    private snackBarService: SnackbarService

  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //TODO: check if user was verified
    const idToken = localStorage.getItem("id_token");
    if (!idToken) {
      this.authService.logout({ returnUrl: state.url });
      return false;
    }
    return this.checkAuthentication().then((res: User) => {
      if (!res) {
        this.userLogout('There was a problem with communicating with database');
      }
      console.log(res.isVerified);
      if (!route.data.mustBeAuthenticated.includes(res.isVerified)) {
        this.userLogout("Please confirm your email before accessing this page, confirmation link was send to you via email");
      }
      if (!(route.data.roles.filter(Set.prototype.has, new Set(res.roles)).length > 0)) {
        this.userLogout("You have unsufficient privileges to access this page");
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

  userLogout(message) {
    this.snackBarService.display(message)
    this.authService.logout();
    return false;
  }


}
