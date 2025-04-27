import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';
import {
  login,
  loginSuccess,
  loginFailure,
  uploadProfileImage,
  uploadProfileImageFailure,
  uploadProfileImageSuccess,
  logout,
} from './auth.actions';
import { Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';
import { JsonPipe } from '@angular/common';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.authService.login(action.username, action.password).pipe(
          map((response) =>
            loginSuccess({
              token: response.token,
              role: response.role,
              user: response.user,
            })
          ),
          catchError((error) =>
            of(loginFailure({ error: error.error?.message || 'Login failed' }))
          )
        )
      )
    )
  );

  uploadProfileImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(uploadProfileImage),
      mergeMap(({ formData }) =>
        this.authService.uploadProfileImage(formData).pipe(
          map((response) => uploadProfileImageSuccess({ user: response.user })),
          catchError((error) =>
            of(
              uploadProfileImageFailure({
                error: error.error?.message || 'Profile upload failed',
              })
            )
          )
        )
      )
    )
  );
  // Save updated user to localStorage
  uploadProfileImageSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(uploadProfileImageSuccess),
        tap((action) => {
          localStorage.setItem('user', JSON.stringify(action.user));
        })
      ),
    { dispatch: false }
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap((action) => {
          localStorage.setItem('token', action.token);
          localStorage.setItem('role', action.role);
          localStorage.setItem('user', JSON.stringify(action.user));
          this.router.navigate([
            action.role === 'admin' ? '/admin/dashboard' : '/home',
          ]);
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          localStorage.clear();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
