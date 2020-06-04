import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registerUrl = 'http://localhost:3000/api/register';
  private loginUrl = 'http://localhost:3000/api/login';

  constructor(private http: HttpClient, private router: Router) { }

  registerUser(user): Observable<any> {
    return this.http.post<any>(this.registerUrl, user);
  }

  loginUser(user): Observable<any> {
    return this.http.post<any>(this.loginUrl, user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  logoutUser() {
    return localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

}
