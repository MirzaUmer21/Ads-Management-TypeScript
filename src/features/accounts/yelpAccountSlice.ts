import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AccountsState = {
  AccountTitle: string;
  yelpBusinesses: Array<Array<string>>;
  yelpPrograms: Array<Array<string>>;

  activeBusinesses: Array<string>;
  activeProgram: null | ActiveProgramType;
};
type ActiveProgramType = {
  yelp_business_id: string;
  yelp_business_name: string;
  fulcrum_email: string;
  yelp_program_status: string;
  yelp_program_type: string;
  yelp_program_budget: string;
  yelp_program_start_date: string;
  yelp_program_pause_status: string;
  campaign_id: string;
};
const slice = createSlice({
  name: 'yelpAccount',
  initialState: {
    AccountTitle: 'Yelp Ads',
    yelpBusinesses: [],
    activeBusinesses: [],
    yelpPrograms: [],
    activeProgram: null
  } as AccountsState,
  reducers: {
    setYelpBusinessesData: (
      state,
      {
        payload: { yelpBusinesses }
      }: PayloadAction<{ yelpBusinesses: Array<Array<string>> }>
    ) => {
      state.yelpBusinesses = [...yelpBusinesses];
    },
    setYelpProgramsData: (
      state,
      {
        payload: { yelpPrograms }
      }: PayloadAction<{ yelpPrograms: Array<Array<string>> }>
    ) => {
      state.yelpPrograms = [...yelpPrograms];
    },
    setActiveYelpBusinessData: (
      state,
      {
        payload: { activeBusinesses }
      }: PayloadAction<{ activeBusinesses: Array<string> }>
    ) => {
      state.activeBusinesses = [...activeBusinesses];
    },
    setActiveYelpProgramData: (
      state,
      {
        payload: { activeProgram }
      }: PayloadAction<{ activeProgram: null | ActiveProgramType }>
    ) => {
      state.activeProgram = activeProgram;
    }
  }
});

export const {
  setYelpBusinessesData,
  setActiveYelpBusinessData,
  setYelpProgramsData,
  setActiveYelpProgramData
} = slice.actions;
export default slice.reducer;
