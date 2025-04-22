import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  standalone: true,
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  error = '';
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  register() {
    if (
      this.form.invalid ||
      this.form.value.password !== this.form.value.confirmPassword
    ) {
      this.error = 'Form is invalid or passwords do not match';
      return;
    }

    this.auth.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) =>
        (this.error = err.error?.message || 'Registration failed'),
    });
  }
}
