import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
import { Store } from '@ngrx/store';
import {
  createUser,
  deleteUser,
  loadUsers,
  updateUser,
} from '../../../store/admin/admin.actions';
import { Observable } from 'rxjs';
import { selectAllUsers } from '../../../store/admin/admin.selectors';
import { logout } from '../../../store/auth/auth.actions';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  private store = inject(Store);
  users$: Observable<any[]> = this.store.select(selectAllUsers);
  searchQuery = '';
  newUser: any = {
    username: '',
    email: '',
    phone: '',
    password: '',
    role: 'user',
  };
  editingUserId: string | null = null;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.store.dispatch(loadUsers({ search: this.searchQuery }));
  }

  searchUsers() {
    this.loadUsers();
  }

  editUser(user: any) {
    this.newUser = { ...user, password: '' };
    this.editingUserId = user._id;
  }

  deleteUser(id: string) {
    // this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
    this.store.dispatch(deleteUser({ id }));
  }

  
  
  saveUser() {
    if (this.editingUserId) {
    
      this.store.dispatch(
        updateUser({ id: this.editingUserId, user: this.newUser })
      );
    } else {
   
      this.store.dispatch(createUser({ user: this.newUser }));
    }
    this.resetForm();
  }

  resetForm() {
    this.newUser = {
      username: '',
      email: '',
      phone: '',
      password: '',
      role: 'user',
    };
    this.editingUserId = null;
  }
  logout() {
    this.store.dispatch(logout());
  }
  getProfileImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/${imagePath.replace(/\\/g, '/')}`;
  }
  
}
