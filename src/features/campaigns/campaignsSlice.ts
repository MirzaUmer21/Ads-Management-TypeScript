import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CampaignsState = {
  GoogleCampaigns: Array<GoogleCampaignsType>;
  GoogleUpdatedCampaigns: Array<GoogleUpdatedCampaignsType>;
  FacebookCampaigns: Array<FacebookCampaignsType>;
  BingCampaigns: Array<BingCampaignsType>;
  AssignedCampaigns: Array<any>;
};
type BingCampaignsType = {
  bing_client_account_id: string;
  budget: string;
  campaign_id: string;
  campaign_name: string;
  status: string;
};
type FacebookCampaignsType = {
  campaign_name: string | null;
  updated_time: string | null;
  budget: string | null;
  status: string | null;
  objective: string | null;
  daily_budget: string | null;
  campaign_id: number;
  created_time: string | null;
  fb_client_account_id: string | null;
  budget_remaining: string | null;
};
type GoogleCampaignsType = {
  campaign_id: number;
  campaign_name: string;
  google_client_account_id: string;
  clicks: string;
  conversions: string;
  impressions: string;
};
type GoogleUpdatedCampaignsType = {
  name: string;
  campaignid: string;
};
const slice = createSlice({
  name: 'campaigns',
  initialState: {
    GoogleCampaigns: [],
    GoogleUpdatedCampaigns: [],
    FacebookCampaigns: [],
    BingCampaigns: [],
    AssignedCampaigns: []
  } as CampaignsState,
  reducers: {
    setGoogleCampaignsData: (
      state,
      {
        payload: { GoogleCampaigns }
      }: PayloadAction<{ GoogleCampaigns: Array<GoogleCampaignsType> }>
    ) => {
      state.GoogleCampaigns = [...GoogleCampaigns];
    },
    setGoogleUpdatedCampaignsData: (
      state,
      {
        payload: { GoogleUpdatedCampaigns }
      }: PayloadAction<{
        GoogleUpdatedCampaigns: Array<GoogleUpdatedCampaignsType>;
      }>
    ) => {
      state.GoogleUpdatedCampaigns = [...GoogleUpdatedCampaigns];
    },
    setFacebookCampaignsData: (
      state,
      {
        payload: { FacebookCampaigns }
      }: PayloadAction<{ FacebookCampaigns: Array<FacebookCampaignsType> }>
    ) => {
      state.FacebookCampaigns = [...FacebookCampaigns];
    },
    setBingCampaignsData: (
      state,
      {
        payload: { BingCampaigns }
      }: PayloadAction<{ BingCampaigns: Array<BingCampaignsType> }>
    ) => {
      state.BingCampaigns = [...BingCampaigns];
    },
    setAssignedCampaignsData: (
      state,
      {
        payload: { AssignedCampaigns }
      }: PayloadAction<{ AssignedCampaigns: Array<any> }>
    ) => {
      state.AssignedCampaigns = [...AssignedCampaigns];
    }
  }
});
export const {
  setGoogleCampaignsData,
  setFacebookCampaignsData,
  setAssignedCampaignsData,
  setGoogleUpdatedCampaignsData,
  setBingCampaignsData
} = slice.actions;
export default slice.reducer;
