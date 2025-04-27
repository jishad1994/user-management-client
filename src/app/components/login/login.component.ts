import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  username = '';
  password = '';
  userProfile = '';

  constructor(private store: Store) {}

  onSubmit() {
    this.store.dispatch(
      login({ username: this.username, password: this.password })
    );
  }
}
