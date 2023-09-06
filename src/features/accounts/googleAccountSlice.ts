import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AccountsState = {
  AccountTitle: string;
  ActiveUser: string;
  ManagerAccounts: Array<string>;
  GoogleClients: Array<clientsData>;
  ActiveClient: string;
  ActiveClientName: string;
  ActiveManager: string;
};
type setAllGoogleAccountDataPayload = {
  fulcrum_email: string;
  google_email: string;
  google_manager_account_id: string;
  google_client_account_id: string;
  google_client_account_name: string;
};

const slice = createSlice({
  name: 'googleAccount',
  initialState: {
    AccountTitle: 'Google Ads',
    ActiveUser: '',
    ManagerAccounts: [],
    GoogleClients: [],
    ActiveClient: '',
    ActiveClientName: '',
    ActiveManager: ''
  } as AccountsState,
  reducers: {
    setGoogleManagerAccountsData: (
      state,
      {
        payload: { ActiveUser, ManagerAccounts }
      }: PayloadAction<{ ActiveUser: string; ManagerAccounts: Array<string> }>
    ) => {
      state.ActiveUser = ActiveUser;
      state.ManagerAccounts = [...ManagerAccounts];
    },
    setGoogleClientsData: (
      state,
      {
        payload: { GoogleClients }
      }: PayloadAction<{ GoogleClients: Array<clientsData> }>
    ) => {
      state.GoogleClients = [...GoogleClients];
    },
    setGoogleActiveClient: (
      state,
      {
        payload: { ActiveClient, ActiveClientName }
      }: PayloadAction<{ ActiveClient: string; ActiveClientName: string }>
    ) => {
      state.ActiveClient = ActiveClient;
      state.ActiveClientName = ActiveClientName;
    },
    setGoogleActiveManager: (
      state,
      { payload: { ActiveManager } }: PayloadAction<{ ActiveManager: string }>
    ) => {
      state.ActiveManager = ActiveManager;
    },
    setAllGoogleAccountData: (
      state,
      {
        payload: {
          fulcrum_email,
          google_email,
          google_manager_account_id,
          google_client_account_id,
          google_client_account_name
        }
      }: PayloadAction<setAllGoogleAccountDataPayload>
    ) => {
      state.ActiveUser = google_email;
      state.ActiveClient = google_client_account_id;
      state.ActiveClientName = google_client_account_name;
      state.ActiveManager = google_manager_account_id;
    },
    resetGoogleAccountData: state => {
      state.ActiveUser = '';
      state.ActiveClient = '';
      state.ActiveClientName = '';
      state.ActiveManager = '';
    }
  }
});

export const {
  setGoogleManagerAccountsData,
  setGoogleClientsData,
  setGoogleActiveClient,
  setGoogleActiveManager,
  setAllGoogleAccountData,
  resetGoogleAccountData
} = slice.actions;
export default slice.reducer;
interface clientsData {
  google_client_account_id: string;
  google_client_account_name: string;
}
