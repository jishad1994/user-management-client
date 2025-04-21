import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = 'http://localhost:5000/api/auth';
  constructor(private http: HttpClient) {}

  //signup service
  regitser(data: any): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  //login service

  login(data: any): Observable<any> {
    return this.http.post(`${this.api}/login`, data);
  }

  //logout
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  saveSession(token: string, user: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }
}
