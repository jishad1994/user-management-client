import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  username = '';
  email = '';
  phone = '';
  password = '';

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.register({ username: this.username, email: this.email, phone: this.phone, password: this.password })
      .subscribe({
        next: () => alert('Registration successful'),
        error: (err) => alert(err.message)
      });
  }

}
