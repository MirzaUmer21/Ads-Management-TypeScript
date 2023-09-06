import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type PreAuthState = {
  Session: string;
  USER_ID_FOR_SRP: string;
};

const slice = createSlice({
  name: 'preAuth',
  initialState: {
    Session: '',
    USER_ID_FOR_SRP: ''
  } as PreAuthState,

  reducers: {
    setPreAuthCredentials: (
      state,
      {
        payload: { Session, USER_ID_FOR_SRP }
      }: PayloadAction<{
        Session: string;
        USER_ID_FOR_SRP: string;
      }>
    ) => {
      state.Session = Session;
      state.USER_ID_FOR_SRP = USER_ID_FOR_SRP;
    }
  }
});
export const { setPreAuthCredentials } = slice.actions;
export default slice.reducer;
