import { createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export interface AppState {
  auth: AuthState;
}

export const selectAuth = (state: AppState) => state.auth;

export const selectToken = createSelector(
  selectAuth,
  (state: AuthState) => state.token
);
export const selectRole = createSelector(
  selectAuth,
  (state: AuthState) => state.role
);
export const selectError = createSelector(
  selectAuth,
  (state: AuthState) => state.error
);
export const selectProfilePic = createSelector(
  selectAuth,
  (state: AuthState) => state?.user?.profileImage
);
