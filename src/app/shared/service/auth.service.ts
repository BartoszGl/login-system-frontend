import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from "rxjs";
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Params, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    console.log(localStorage.getItem('user_data'));
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user_data')));
    this.user = this.userSubject.asObservable();
  }

  login(credentials: User): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}/api/login_check`, credentials).pipe(
      tap(res => this.setUserToken(res)),
      shareReplay());
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  setUserToken(authResult) {
    localStorage.setItem('id_token', authResult.token);
  }

  setUser(userData) {
    this.userSubject.next(userData);
    localStorage.setItem('user_data', JSON.stringify(userData));
  }

  getUser() {
    return this.http.get(`${environment.apiUrl}/api/user/current`).pipe(
      tap(res => this.setUser(res)),
      shareReplay());
  }

  verifyEmail(params) {
    return this.http.post(`${environment.apiUrl}/api/verify/email?${params.toString()}`, '');
  }

  logout(queryParams?: Params, navigateToLogin: boolean = true) {
    this.userSubject.next(null);
    localStorage.removeItem("id_token");
    localStorage.removeItem("user_data");
    if (navigateToLogin) {
      this.router.navigate(['/login'], { queryParams });
    }
  }

}
