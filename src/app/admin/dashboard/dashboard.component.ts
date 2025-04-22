import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  keyword = '';
  editUserId: string | null = null;

  userForm: FormGroup;

  constructor(private adminService: AdminService, private fb: FormBuilder) {
    // this.userForm = this.fb.group({
    //   username: [''],
    //   email: [''],
    //   phone: [''],
    //   profileImage: [''],
    //   password: [''], // needed for create only
    //   role: ['user'],
    // });

    this.userForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      profileImage: [''],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
      role: ['user'],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.adminService.getAllUsers().subscribe((res) => (this.users = res));
  }

  searchUsers() {
    if (this.keyword.trim()) {
      this.adminService
        .searchUsers(this.keyword)
        .subscribe((res) => (this.users = res));
    } else {
      this.loadUsers();
    }
  }

  deleteUser(id: string) {
    if (confirm('Delete this user?')) {
      this.adminService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  editUser(user: any) {
    this.editUserId = user._id;
    this.userForm.patchValue({
      username: user.username,
      email: user.email,
      role: user.role,
    });
  }

  saveUser() {
    const formValue = this.userForm.value;
    if (this.editUserId) {
      this.adminService.updateUser(this.editUserId, formValue).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    } else {
      this.adminService.createUser(formValue).subscribe(() => {
        this.resetForm();
        this.loadUsers();
      });
    }
  }

  resetForm() {
    this.userForm.reset({ role: 'user' });
    this.editUserId = null;
  }
}
