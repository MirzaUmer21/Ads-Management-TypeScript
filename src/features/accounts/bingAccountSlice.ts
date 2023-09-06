import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type AccountsState = {
  AccountTitle: string;
  ActiveUser: string;
  ManagerAccounts: bingManagersType | null;
  BingClients: Array<any>;
  ActiveClient: string;
  ActiveClientName: string;
  ActiveManager: string;
};
type bingManagersType = {
  bing_email: string;
  bing_id: string;
  bing_name: string;
};
type setAllBingAccountDataPayload = {
  fulcrum_email: string;
  bing_email: string;
  bing_manager_account_id: string;
  bing_client_account_id: string;
  bing_client_account_name: string;
};
const bingslice = createSlice({
  name: 'bingAccount',
  initialState: {
    AccountTitle: 'Microsoft Bing Ads',
    ActiveUser: '',
    ManagerAccounts: null,
    BingClients: [],
    ActiveClient: '',
    ActiveClientName: '',
    ActiveManager: ''
  } as AccountsState,
  reducers: {
    setBingManagerAccountsData: (
      state,
      {
        payload: { ActiveUser, ManagerAccounts }
      }: PayloadAction<{
        ActiveUser: string;
        ManagerAccounts: bingManagersType | null;
      }>
    ) => {
      state.ActiveUser = ActiveUser;
      state.ManagerAccounts = ManagerAccounts;
    },
    setBingClientsData: (
      state,
      {
        payload: { BingClients }
      }: PayloadAction<{ BingClients: Array<clientsData> }>
    ) => {
      state.BingClients = [...BingClients];
    },
    setBingActiveManager: (
      state,
      { payload: { ActiveManager } }: PayloadAction<{ ActiveManager: string }>
    ) => {
      state.ActiveManager = ActiveManager;
    },
    setBingActiveClient: (
      state,
      {
        payload: { ActiveClient, ActiveClientName }
      }: PayloadAction<{ ActiveClient: string; ActiveClientName: string }>
    ) => {
      state.ActiveClient = ActiveClient;
      state.ActiveClientName = ActiveClientName;
    },
    setAllBingAccountData: (
      state,
      {
        payload: {
          bing_client_account_id,
          bing_client_account_name,
          bing_email,
          bing_manager_account_id,
          fulcrum_email
        }
      }: PayloadAction<setAllBingAccountDataPayload>
    ) => {
      state.ActiveUser = bing_email;
      state.ActiveClient = bing_client_account_id;
      state.ActiveClientName = bing_client_account_name;
      state.ActiveManager = bing_manager_account_id;
    },
    resetBingAccountData: state => {
      state.ActiveUser = '';
      state.ActiveClient = '';
      state.ActiveClientName = '';
      state.ActiveManager = '';
    }
  }
});

export const {
  setBingManagerAccountsData,
  setBingActiveManager,
  setBingClientsData,
  setBingActiveClient,
  setAllBingAccountData,
  resetBingAccountData
} = bingslice.actions;
export default bingslice.reducer;
interface clientsData {
  id: string;
  name: string;
}
