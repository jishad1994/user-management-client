import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AdminService } from '../../services/admin.service';
import {
  loadUsers,
  loadUsersFailure,
  loadUsersSuccess,
  createUser,
  deleteUser,
  updateUser,
} from './admin.actions';
import { catchError, map, mergeMap, of } from 'rxjs'; // <-- include 'of'!

@Injectable()
export class AdminEffects {
  private actions$ = inject(Actions);
  private adminService = inject(AdminService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      mergeMap(({ search }) =>
        this.adminService.getUsers(search).pipe(
          map((users) => loadUsersSuccess({ users })),
          catchError((error) => of(loadUsersFailure({ error: {
            message: error?.error?.message || 'Something went wrong',
            status: error?.status || 500,
          }, })))
        )
      )
    )
  );

  // Create User
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createUser),
      mergeMap(({ user }) =>
        this.adminService.createUser(user).pipe(
          map(() => loadUsers({ search: '' })), // refresh users
          catchError((error) => of(loadUsersFailure({ error: {
            message: error?.error?.message || 'Something went wrong',
            status: error?.status || 500,
          }, })))
        )
      )
    )
  );

  // Update User
  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateUser),
      mergeMap(({ id, user }) =>
        this.adminService.updateUser(id, user).pipe(
          map(() => loadUsers({ search: '' })), // refresh users
          catchError((error) => of(loadUsersFailure({ error: {
            message: error?.error?.message || 'Something went wrong',
            status: error?.status || 500,
          }, })))
        )
      )
    )
  );

  // Delete User
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteUser),
      mergeMap(({ id }) =>
        this.adminService.deleteUser(id).pipe(
          map(() => loadUsers({ search: '' })), // refresh users
          catchError((error) => of(loadUsersFailure({ error: {
            message: error?.error?.message || 'Something went wrong',
            status: error?.status || 500,
          }, })))
        )
      )
    )
  );
}
