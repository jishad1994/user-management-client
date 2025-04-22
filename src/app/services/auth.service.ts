import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface RegisterPayload {
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword?: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    _id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    profileImage?: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private BASE_URL = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}

  register(data: RegisterPayload): Observable<any> {
    return this.http.post(`${this.BASE_URL}/register`, data);
  }

  login(data: LoginPayload): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.BASE_URL}/login`, data).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}
