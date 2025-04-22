import { Routes } from '@angular/router';
import { provideRouter } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.loginComponent),
  //   { path: 'register', loadComponent: () => import('./auth/register.component').then(m => m.RegisterComponent) },
  //   { path: 'user', canActivate: [AuthGuard], loadComponent: () => import('./user/home.component').then(m => m.HomeComponent) },
  //   { path: 'user/profile', canActivate: [AuthGuard], loadComponent: () => import('./user/profile.component').then(m => m.ProfileComponent) },
  //   { path: 'admin', canActivate: [AdminGuard], loadComponent: () => import('./admin/dashboard.component').then(m => m.DashboardComponent) },
  },
];
