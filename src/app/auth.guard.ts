import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn() && authService.isAdmin()) {
    return true;
  }else{

    router.navigate(['/admin/login'])
    return false;
  }

};
