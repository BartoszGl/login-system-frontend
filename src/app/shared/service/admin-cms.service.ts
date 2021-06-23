import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AdminCmsService {

  constructor(private http: HttpClient) { }

  //  Pobiera dane dotyczące maili i uprawnień wszystkich użytkowników.
  getUsers() {
    return this.http.get(`${environment.apiUrl}/api/admin/users`)
  }
}
