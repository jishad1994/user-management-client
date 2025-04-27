import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AdminService } from '../../../services/admin.service';
import { createUser, deleteUser, loadUsers, updateUser } from '../../../store/admin/admin.actions';
import { selectAllUsers } from '../../../store/admin/admin.selectors';
import { logout } from '../../../store/auth/auth.actions';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
})
export class AdminDashboardComponent implements OnInit {
  private store = inject(Store);
  users$: Observable<any[]> = this.store.select(selectAllUsers);
  searchQuery = '';
  userForm: FormGroup;
  editingUserId: string | null = null;

  constructor(private fb: FormBuilder, private adminService: AdminService) {
    this.userForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.minLength(8)]], // password required only for new users
        role: ['user', Validators.required],
      }
    );
  }

  ngOnInit() {
    this.loadUsers();
  }

  get f() {
    return this.userForm.controls;
  }

  loadUsers() {
    this.store.dispatch(loadUsers({ search: this.searchQuery }));
  }

  searchUsers() {
    this.loadUsers();
  }

  editUser(user: any) {
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      phone: user.phone,
      role: user.role,
    });
    this.f['password'].clearValidators(); // Don't force password while editing
    this.f['password'].updateValueAndValidity();
    this.editingUserId = user._id;
  }

  deleteUser(id: string) {
    this.store.dispatch(deleteUser({ id }));
  }

  saveUser() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const userData = { ...this.userForm.value };
    if (!userData.password) {
      delete userData.password; // Don't send empty password if not entered
    }

    if (this.editingUserId) {
      this.store.dispatch(updateUser({ id: this.editingUserId, user: userData }));
    } else {
      if (!userData.password) {
        alert("Password is required for new user creation.");
        return;
      }
      this.store.dispatch(createUser({ user: userData }));
    }

    this.resetForm();
  }

  resetForm() {
    this.userForm.reset({
      role: 'user',
    });
    this.editingUserId = null;
    this.f['password'].setValidators([Validators.minLength(8)]); // Reset password rules
    this.f['password'].updateValueAndValidity();
  }

  logout() {
    this.store.dispatch(logout());
  }

  getProfileImageUrl(imagePath: string): string {
    return `${environment.apiUrl}/${imagePath.replace(/\\/g, '/')}`;
  }
}
