import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AccountsState = {
  AccountTitle: string;
  ActiveUser: string;
  ManagerAccounts: Array<facebookManagersData>;
  FacebookClients: Array<facebookClientsData>;
  ActiveClient: string;
  ActiveClientName: string;
  ActiveManager: string;
};
type facebookManagersData = {
  fb_email: string;
  name: string;
  picture: string;
  account_id: string;
};
type facebookClientsData = {
  name: string;
  account_id: string;
  currency: string;
  timezone_id: string;
  id: string;
};
const slice = createSlice({
  name: 'facebookAccount',
  initialState: {
    AccountTitle: 'Facebook Ads',
    ActiveUser: '',
    ManagerAccounts: [],
    FacebookClients: [],
    ActiveClient: '',
    ActiveClientName: '',
    ActiveManager: ''
  } as AccountsState,
  reducers: {
    setFacebookManagerAccountsData: (
      state,
      {
        payload: { ActiveUser, ManagerAccounts }
      }: PayloadAction<{
        ActiveUser: string;
        ManagerAccounts: Array<facebookManagersData>;
      }>
    ) => {
      state.ActiveUser = ActiveUser;
      state.ManagerAccounts = [...ManagerAccounts];
    },
    setFacebookActiveManager: (
      state,
      { payload: { ActiveManager } }: PayloadAction<{ ActiveManager: string }>
    ) => {
      state.ActiveManager = ActiveManager;
    },
    setFacebookClientsData: (
      state,
      {
        payload: { FacebookClients }
      }: PayloadAction<{ FacebookClients: Array<facebookClientsData> }>
    ) => {
      state.FacebookClients = [...FacebookClients];
    },
    setFacebookActiveClient: (
      state,
      {
        payload: { ActiveClient, ActiveClientName }
      }: PayloadAction<{ ActiveClient: string; ActiveClientName: string }>
    ) => {
      state.ActiveClient = ActiveClient;
      state.ActiveClientName = ActiveClientName;
    },
    setAllFacebookAccountData: (
      state,
      {
        payload: {
          fulcrum_email,
          fb_email,
          fb_client_account_id,
          fb_manager_account_id,
          fb_client_account_name
        }
      }: PayloadAction<any>
    ) => {
      state.ActiveUser = fb_email;
      state.ActiveClient = fb_client_account_id;
      state.ActiveClientName = fb_client_account_name;
      state.ActiveManager = fb_manager_account_id;
    },
    resetFacebookAccountData: state => {
      state.ActiveUser = '';
      state.ActiveClient = '';
      state.ActiveClientName = '';
      state.ActiveManager = '';
    }
  }
});

export const {
  setFacebookManagerAccountsData,
  setFacebookActiveManager,
  setFacebookClientsData,
  setFacebookActiveClient,
  setAllFacebookAccountData,
  resetFacebookAccountData
} = slice.actions;
export default slice.reducer;
