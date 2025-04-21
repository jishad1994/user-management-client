import { createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';

export interface AuthState {
  user: any;
  token: string;
  error: string | null;
}

const initalState: AuthState = {
  user: null,
  token: '',
  error: null,
};

export const authReducer = createReducer(
  initalState,
  on(AuthActions.loginSuccess, (state, { user, token }) => ({
    ...state,
    user,
    token,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({ ...state, error })),
  on(AuthActions.logout, () => initalState)
);
