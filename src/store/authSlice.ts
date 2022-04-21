import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeItem, setItem } from 'storagedotjs';
import { tokenKey } from '../config/storage';
import { UserModel } from '../types/models';

export interface AuthState {
  isAuthenticating: boolean;
  isLoggedIn: boolean;
  isReady: boolean;
  token?: string;
  user?: UserModel;
}

const initialState: AuthState = {
  isAuthenticating: false,
  isLoggedIn: false,
  isReady: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    activate: (state) => {
      state.isReady = true;
    },
    deactivate: (state) => {
      state.isReady = false;
    },
    setLoadingStatus: (
      state,
      { payload: isAuthenticating }: PayloadAction<boolean>
    ) => {
      state.isAuthenticating = isAuthenticating;
    },
    clearUser: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      state.user = null;
      removeItem(tokenKey);
    },
    storeUser: (
      state,
      {
        payload: { token, user },
      }: PayloadAction<{ token: string; user: UserModel }>
    ) => {
      state.token = token || state.token;
      state.user = user || state.user;
      state.isLoggedIn = !!user;

      setItem(tokenKey, token, '30d');
    },
  },
});

export const { activate, clearUser, deactivate, setLoadingStatus, storeUser } = authSlice.actions;

export default authSlice.reducer;
