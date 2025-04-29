import { Component, inject } from '@angular/core';
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
import { AlertService } from '../../services/alert.service';

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
    private router: Router,
    private sweetAlert: AlertService
  ) {
    this.registerForm = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(8),this.noSpaceValidator]],
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
  //check if any spaces in the username
  private noSpaceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';

    // Check if value has any spaces
    if (/\s/.test(value)) {
      return { noSpace: true };
    }

    return null;
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.sweetAlert.error('please enter valid details');
      return;
    }

    const { confirmPassword, ...payload } = this.registerForm.value;
    this.authService.register(payload).subscribe({
      next: () => {
        this.sweetAlert.success('Registration successful');
        this.registerForm.reset();
      },
      error: (err) => {
        this.sweetAlert.error(err.error.message);
      },
    });
  }

  goToLogin() {
    this.router.navigate(['']);
  }
}
