import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminLoginComponent } from './components/admin/admin-login/admin-login.component';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const routes: Routes = [  { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [() => inject(AuthService).isAuthenticated()] },
    { path: 'profile', component: ProfileComponent, canActivate: [() => inject(AuthService).isAuthenticated()] },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [() => inject(AuthService).isAdmin()] },
    { path: '', redirectTo: '/login', pathMatch: 'full' }];
