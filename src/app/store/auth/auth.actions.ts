import { createAction, props } from '@ngrx/store';
import { User } from './auth.reducer';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ token: string; role: string; user: User }>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

//for profile pic upload
export const uploadProfileImage = createAction(
  '[auth] upload profile',
  props<{ formData: FormData }>()
);

export const uploadProfileImageSuccess = createAction(
  '[Auth] Upload Profile Image Success',
  props<{ user: User }>()
);

export const uploadProfileImageFailure = createAction(
  '[Auth] Upload Profile Image Failure',
  props<{ error: string }>()
);
export const logout = createAction('[Auth] Logout');
