import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ClientsData = {
  ActiveClient: ClientsDataState | null;
  AllClients: Array<ClientsDataState>;
};
type ClientsDataState = {
  crm_client_name: string;
  fb_client_id: string;
  fulcrum_email: string;
  google_client_id: string;
  bing_client_id: string;
  service_titan_client_id: string;
};
const slice = createSlice({
  name: 'clientsData',

  initialState: {
    ActiveClient: null,
    AllClients: []
  } as ClientsData,

  reducers: {
    setClientsStateData: (
      state,
      {
        payload: { AllClients }
      }: PayloadAction<{ AllClients: Array<ClientsDataState> }>
    ) => {
      state.AllClients = [...AllClients];
    },
    setActiveClientStateData: (
      state,
      {
        payload: { ActiveClient }
      }: PayloadAction<{ ActiveClient: ClientsDataState }>
    ) => {
      state.ActiveClient = ActiveClient;
    },
    resetActiveClientStateData: state => {
      state.ActiveClient = null;
    }
  }
});
export const {
  setClientsStateData,
  setActiveClientStateData,
  resetActiveClientStateData
} = slice.actions;
export default slice.reducer;
