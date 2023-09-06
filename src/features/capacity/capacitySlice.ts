import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CampaignsState = {
  capacityMembers: Array<CapacityTableData>;
  activeCapacityPage: number;
};
interface CapacityTableData {
  userid: number;
  user_name: string;
  user_image: string;
  max: number | null;
  unit: string | number | null;
  time: string | number | null;
  segment: string | number | null;
}

const slice = createSlice({
  name: 'capacity',
  initialState: {
    capacityMembers: [],
    activeCapacityPage: 1
  } as CampaignsState,
  reducers: {
    setCapacityMembersdata: (
      state,
      {
        payload: { capacityMembers }
      }: PayloadAction<{ capacityMembers: Array<CapacityTableData> }>
    ) => {
      state.capacityMembers = [...capacityMembers];
    },
    setActiveCapacityPage: (
      state,
      { payload: page }: PayloadAction<number>
    ) => {
      state.activeCapacityPage = page;
    }
  }
});
export const { setCapacityMembersdata, setActiveCapacityPage } = slice.actions;
export default slice.reducer;
