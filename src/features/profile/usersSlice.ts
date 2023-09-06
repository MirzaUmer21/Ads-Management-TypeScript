import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ProfileState = {
  data: ProfileData | null;
};
interface ProfileData {
  first_name: string | null;
  fulcrum_email: string | null;
  last_name: string | null;
  profile_picture_url: string | null;
  username: string | null;
}
const profileSlice = createSlice({
  name: 'profile',
  initialState: { data: null } as ProfileState,
  reducers: {
    setProfile: (
      state,
      { payload: { data } }: PayloadAction<{ data: ProfileData }>
    ) => {
      state.data = data;
    }
  }
});

export const { setProfile } = profileSlice.actions;

export default profileSlice.reducer;
