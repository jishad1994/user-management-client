import { createReducer, on } from '@ngrx/store';
import {
  loginSuccess,
  loginFailure,
  logout,
  uploadProfileImageSuccess,
  uploadProfileImageFailure,
} from './auth.actions';

export interface User {
  username: string;
  email: string;
  phone: string;
  profileImage: string;
  [key: string]: any;
}

export interface AuthState {
  token: string | null;
  role: string | null;
  error: string | null;
  user: User | null;
}

export const initialState: AuthState = {
  token: null,
  role: null,
  error: null,
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token, role, user }) => ({
    ...state,
    token,
    role,
    user,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    token: null,
    role: null,
    user: null,
  })),
  on(uploadProfileImageSuccess, (state, { user }) => ({
    ...state,
    user, // 🔥 update user object after uploading profile pic
  })),
  on(uploadProfileImageFailure, (state, { error }) => ({ ...state, error })),
  on(logout, () => initialState)
);
