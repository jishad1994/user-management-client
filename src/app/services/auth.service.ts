import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, user);
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, { username, password });
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );
    return this.http.post(`${this.apiUrl}/auth/profile/upload`, formData, {
      headers,
    });
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // or any other logic you have
  }

  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;
    const role = localStorage.getItem('role');
    return role === 'admin';
  }
  getProfile() {
    const header = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get(`${environment.apiUrl}/auth/getUserData`, {
      headers: {
        Authorization: `Bearer ${this.getToken()}`,
      },
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
