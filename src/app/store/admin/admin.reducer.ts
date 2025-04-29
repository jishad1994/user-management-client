import { createReducer, on } from '@ngrx/store';
import {
  createUser,
  deleteUser,
  loadUsersSuccess,
  loadUsers,
  updateUser,
  loadUsersFailure,
} from './admin.actions';
import { User } from '../auth/auth.reducer';

export interface AdminState {
  users: User[];
  loading: boolean;
  error: any;
}

export const initialState: AdminState = {
  users: [],
  loading: false,
  error: null,
};

export const adminReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({ ...state, loading: true })),
  on(loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    error: null,
    loading: false,
  })),
  on(loadUsersFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(createUser, updateUser, deleteUser, (state) => ({
    ...state,
    loading: true,
    error: null,
  }))
);
