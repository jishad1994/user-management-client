import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from './auth.actions';

export interface AuthState {
  token: string | null;
  role: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  token: null,
  role: null,
  error: null
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { token, role }) => ({ ...state, token, role, error: null })),
  on(loginFailure, (state, { error }) => ({ ...state, error, token: null, role: null })),
  on(logout, () => initialState)
);