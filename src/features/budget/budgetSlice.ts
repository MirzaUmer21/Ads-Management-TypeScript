import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type CampaignsState = {
  AllBudgets: Array<budgetsData> | null;
  serviceBudgets: Array<budgetsData>;
  salesBudgets: Array<budgetsData>;
  installBudgets: Array<budgetsData>;
};
type budgetsData = {
  campaign_name: string;
  updated_at: string;
  segments: string;
  created_at: string;
  account: string;
  client_name: string;
  ad_account_id: string;
  campaign_id: string;
  fulcrum_email: string;
  budget: string | number;
  cpa: string;
  estimated_scalability: string;
};
const budgetsSlice = createSlice({
  name: 'budgets',
  initialState: {
    AllBudgets: [],
    serviceBudgets: [],
    salesBudgets: [],
    installBudgets: []
  } as CampaignsState,
  reducers: {
    setAllBudgetsData: (
      state,
      {
        payload: { AllBudgets }
      }: PayloadAction<{ AllBudgets: Array<budgetsData> }>
    ) => {
      state.AllBudgets = [...AllBudgets];
    },
    setServiceBudgetsData: (
      state,
      {
        payload: { serviceBudgets }
      }: PayloadAction<{ serviceBudgets: Array<budgetsData> }>
    ) => {
      state.serviceBudgets = [...serviceBudgets];
    },
    setSalesBudgetsData: (
      state,
      {
        payload: { salesBudgets }
      }: PayloadAction<{ salesBudgets: Array<budgetsData> }>
    ) => {
      state.salesBudgets = [...salesBudgets];
    },
    setInstallBudgetsData: (
      state,
      {
        payload: { installBudgets }
      }: PayloadAction<{ installBudgets: Array<budgetsData> }>
    ) => {
      state.installBudgets = [...installBudgets];
    }
  }
});
export const {
  setAllBudgetsData,
  setServiceBudgetsData,
  setSalesBudgetsData,
  setInstallBudgetsData
} = budgetsSlice.actions;
export default budgetsSlice.reducer;
