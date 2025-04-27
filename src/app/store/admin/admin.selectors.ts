import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AdminState } from './admin.reducer';

export const selectAdminState = createFeatureSelector<AdminState>('admin');
export const selectAllUsers = createSelector(
  selectAdminState,
  (state) => state.users
);

export const selectAdminLoading = createSelector(
  selectAdminState,
  (state) => state.loading
);
export const selectAdminError = createSelector(
  selectAdminState,
  (state) => state.error
);
