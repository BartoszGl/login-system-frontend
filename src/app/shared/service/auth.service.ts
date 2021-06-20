import { UserAccountService } from './user-account.service';
import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private userAccountService: UserAccountService) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user_data')));
    this.user = this.userSubject.asObservable();
  }

  login(credentials: User): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}/api/login_check`, credentials).pipe(
      tap(res => this.setUser(res)),
      shareReplay())
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  public setUser(authResult) {
    this.userSubject.next(authResult.userData);
    localStorage.setItem('user_data', JSON.stringify(authResult.userData))
    localStorage.setItem('id_token', authResult.token);
  }

  logout() {
    localStorage.removeItem("id_token");
  }

  public isLoggedIn() {
    // return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    // return !this.isLoggedIn();
  }

  getExpiration() {
    // const expiration = localStorage.getItem("expires_at");
    // const expiresAt = JSON.parse(expiration);
    // return moment(expiresAt);
  }
}
