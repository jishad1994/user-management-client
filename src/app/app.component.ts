import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { loginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,loginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'user-management-client';
}
