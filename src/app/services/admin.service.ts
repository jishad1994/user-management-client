import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  private apiUrl = 'http://localhost:5000/api/admin';
  constructor(private http: HttpClient, private auth: AuthService) {}
  private getAuthHeaders() {
    const token = this.auth.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`, {
      headers: this.getAuthHeaders(),
    });
  }

  searchUsers(keyword: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users?search=${keyword}`, {
      headers: this.getAuthHeaders(),
    });
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${id}`, {
      headers: this.getAuthHeaders(),
    });
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${id}`, data, {
      headers: this.getAuthHeaders(),
    });
  }

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, data, {
      headers: this.getAuthHeaders(),
    });
  }
}
