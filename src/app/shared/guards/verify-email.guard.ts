import { User } from './../models/user';
import { tap, map, catchError } from 'rxjs/operators';
import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';
import { getUrlScheme } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class VerifyEmailGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }


  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let params = new URLSearchParams();
    for (let key in route.queryParams) {
      params.set(key, route.queryParams[key])
    }
    return this.checkAuthentication(params).then(res => {
      return true;
    }, err => {
      return false;
    });
  }

  async checkAuthentication(params) {
    // Implement your authentication in authService
    const isAuthenticate = await this.authService.verifyEmail(params).toPromise()
    return isAuthenticate;
  }


}
