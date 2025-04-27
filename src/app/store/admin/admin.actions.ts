import { createAction, props } from '@ngrx/store';
import { User } from '../auth/auth.reducer';

export const loadUsers = createAction(
  '[admin] load users',
  props<{ search: string }>()
);

export const loadUsersSuccess = createAction(
  '[admin] load users success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[admin] load users failure',
  props<{ error: any }>()
);

export const createUser = createAction(
  '[admin] create user',
  props<{ user: User }>()
);
export const updateUser = createAction(
  '[admin] update user',
  props<{ id: string; user: User }>()
);
export const deleteUser = createAction(
  '[admin] delete user',
  props<{ id: string }>()
);
