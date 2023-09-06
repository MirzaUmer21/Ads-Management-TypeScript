import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AccountsState = {
  MarketingAccounts: Array<MarketingAccounts>;
  isAccountsSet: boolean;
  clientsPopupAction: string;
  isActiveAccountsfetched: boolean;
};
type MarketingAccounts = {
  slug: string;
  heading: string;
  description: string;
  imageUrl: string;
  connected_emails: Array<string>;
};
const slice = createSlice({
  name: 'accounts',
  initialState: {
    MarketingAccounts: [],
    isAccountsSet: false,
    clientsPopupAction: '',
    isActiveAccountsfetched: false
  } as AccountsState,
  reducers: {
    setMarketingAccountsData: (
      state,
      {
        payload: { MarketingAccounts }
      }: PayloadAction<{ MarketingAccounts: Array<any> }>
    ) => {
      state.MarketingAccounts = [...MarketingAccounts];
      state.isAccountsSet = true;
    },
    setIsAccountSet: (
      state,
      { payload: { isAccountsSet } }: PayloadAction<{ isAccountsSet: boolean }>
    ) => {
      state.isAccountsSet = isAccountsSet;
    },
    setIsActiveAccountsfetched: (
      state,
      {
        payload: { isActiveAccountsfetched }
      }: PayloadAction<{ isActiveAccountsfetched: boolean }>
    ) => {
      state.isActiveAccountsfetched = isActiveAccountsfetched;
    },

    setClientsPopupAction: (
      state,
      {
        payload: { clientsPopupAction }
      }: PayloadAction<{ clientsPopupAction: string }>
    ) => {
      state.clientsPopupAction = clientsPopupAction;
    }
  }
});
export const {
  setMarketingAccountsData,
  setIsAccountSet,
  setClientsPopupAction,
  setIsActiveAccountsfetched
} = slice.actions;
export default slice.reducer;
