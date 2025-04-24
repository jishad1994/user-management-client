import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../services/admin.service';
@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  users: any[] = [];
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
    this.adminService.getUsers(this.searchQuery).subscribe((users: any) => {
      this.users = users;
    });
  }

  searchUsers() {
    this.loadUsers();
  }

  editUser(user: any) {
    this.newUser = { ...user, password: '' };
    this.editingUserId = user._id;
  }

  deleteUser(id: string) {
    this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
  }

  saveUser() {
    if (this.editingUserId) {
      this.adminService
        .updateUser(this.editingUserId, this.newUser)
        .subscribe(() => {
          this.resetForm();
          this.loadUsers();
        });
    } else {
      this.adminService.createUser(this.newUser).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    }
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
}
