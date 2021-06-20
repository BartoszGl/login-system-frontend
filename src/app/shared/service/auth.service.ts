import { User } from './../models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { shareReplay, tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment'



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(credentials: User): Observable<any> {
    return this.http.post<User>(`${environment.apiUrl}/api/login_check`, credentials).pipe(
      tap(res => this.setSession(res)),
      shareReplay())
  }

  private setSession(authResult) {
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
