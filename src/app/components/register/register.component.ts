import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(8)]],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required],
      },
      {
        validators: this.passwordsMatch,
      }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  // Check if passwords match
  private passwordsMatch(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      alert("Form validation error");
      return;
    }

    const { confirmPassword, ...payload } = this.registerForm.value;
    this.authService.register(payload).subscribe({
      next: () => {
        alert('Registration successful');
        this.registerForm.reset(); 
      },
      error: (err) => alert(err.message),
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
