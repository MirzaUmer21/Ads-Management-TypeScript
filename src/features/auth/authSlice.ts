import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  id_token: string;
  access_token: string;
  refresh_token: string;
  email: string;
  googleEmail: string;
  bingEmail: string;
  facebookEmail: string;
  yelpEmail: string;
  isAuthenticated: boolean;
};

const slice = createSlice({
  name: 'auth',
  initialState: {
    id_token: '',
    access_token: '',
    refresh_token: '',
    email: '',
    googleEmail: '',
    bingEmail: '',
    facebookEmail: '',
    yelpEmail: '',
    isAuthenticated: false
  } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { id_token, access_token, refresh_token, isAuthenticated }
      }: PayloadAction<{
        id_token: string;
        access_token: string;
        refresh_token: string;

        isAuthenticated: boolean;
      }>
    ) => {
      state.id_token = id_token;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
      state.isAuthenticated = isAuthenticated;
    },
    setUserEmail: (state, { payload: email }: PayloadAction<string>) => {
      state.email = email;
    },
    setGoogleCredentials: (
      state,
      {
        payload: { googleEmail }
      }: PayloadAction<{
        googleEmail: string;
      }>
    ) => {
      state.googleEmail = googleEmail;
    },
    setFacebookCredentials: (
      state,
      {
        payload: { facebookEmail }
      }: PayloadAction<{
        facebookEmail: string;
      }>
    ) => {
      state.facebookEmail = facebookEmail;
    },
    setBingCredentials: (
      state,
      {
        payload: { bingEmail }
      }: PayloadAction<{
        bingEmail: string;
      }>
    ) => {
      state.bingEmail = bingEmail;
    },
    logout: state => {}
  }
});

export const {
  setCredentials,
  logout,
  setGoogleCredentials,
  setFacebookCredentials,
  setBingCredentials,
  setUserEmail
} = slice.actions;

export default slice.reducer;
