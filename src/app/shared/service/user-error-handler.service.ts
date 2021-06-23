import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { SnackbarService } from './snackbar.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserErrorHandlerService {

  private user: User;
  private route: ActivatedRouteSnapshot;
  private message: string;

  constructor(private snackBarService: SnackbarService, private authService: AuthService) { }

  handle(user: User, route: ActivatedRouteSnapshot) {
    this.user = user;
    this.route = route

    this.handleInternalServerError();
    this.handleUnsufficientPrivileges();
    this.handleUserNotVerified();

    console.log(this.message);
    if (this.message) {
      this.userLogout();
      return true;
    }
    return false;
  }


  private handleInternalServerError(): void {
    if (!this.user) {
      this.message = 'Internal server error, please contact us';
    }
  }

  private handleUserNotVerified(): void {
    if (!this.route.data.mustBeAuthenticated.includes(this.user.isVerified)) {
      this.message = "Please confirm your email before accessing this page, confirmation link was send to you via email";
    }
  }

  private handleUnsufficientPrivileges(): void {
    if (!(this.route.data.roles.filter(Set.prototype.has, new Set(this.user.roles)).length > 0)) {
      this.message = "You have unsufficient privileges to access this page";
    }
  }

  public userLogout(): void {
    this.snackBarService.display(this.message)
    this.authService.logout();
  }

}
