import { User } from './../models/user';
import { tap, map } from 'rxjs/operators';
import { AuthService } from './../service/auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | Observable<boolean> {
    const idToken = localStorage.getItem("id_token");

    if (!idToken) {
      this.authService.logout({ returnUrl: state.url });
      return false;
    }

    return this.authService.getUser().pipe(
      map((res: User) => {
        console.log(res.roles);
        console.log(route.data.roles);
        // console.log(route.data.roles.filter(value => res.roles.includes(value)))
        console.log(route.data.roles.filter(Set.prototype.has, new Set(res.roles)));

        console.log('ok');
        if (res && (route.data.roles.filter(Set.prototype.has, new Set(res.roles)).length > 0)) {
          return true;
        }
        this.authService.logout({ returnUrl: state.url });
        return false;
      }),
      tap({
        error: error => {
          this.authService.logout({ returnUrl: state.url });
          return false;
        }
      })
    );

  }

}
