import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';
@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private authService: AuthService, private store: Store) {}
  logout() {
    this.store.dispatch(logout());
  }
}
