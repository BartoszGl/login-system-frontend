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
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const idToken = localStorage.getItem("id_token");
    console.log('okkk');
    if (!idToken) {
      this.authService.logout({ returnUrl: state.url });
      return false;
    }
    return this.checkAuthentication().then((res: User) => {
      if (res && (route.data.roles.filter(Set.prototype.has, new Set(res.roles)).length > 0)) {
        return true;
      }
      this.authService.logout({ returnUrl: state.url });
      return false;
    }, err => {
      return false;
    });
  }

  async checkAuthentication() {
    const isAuthenticate = await this.authService.getUser().toPromise()
    return isAuthenticate;
  }

}
