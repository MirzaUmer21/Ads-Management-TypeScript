import { apiSlice } from 'services/apiSlice';
type GetGoogleManagersBody = {
  id_token: string;
  google_email: string;
};
type GetGoogleClientsBody = {
  id_token: string;
  google_email: string;
  manager_account_id: string;
};
type GoogleCurrentAccountBody = {
  fulcrum_email: string;
  google_email: string;
  google_client_account_id: string;
  google_manager_account_id: string;
  google_client_account_name: string;
};
type GetGoogleManagersResponse = {
  google_manager_accounts: Array<string>;
};
type GetGoogleClientsResponse = {
  google_client_accounts: Array<googleClientsRes>;
};
type googleClientsRes = {
  google_client_account_id: string;
  google_client_account_name: string;
};
type googleGetCurrentAccountResponse = {
  fulcrum_email: string;
  google_email: string;
  google_client_account_id: string;
  google_manager_account_id: string;
};
export const googleConnectApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    googleManagerAccounts: builder.mutation<
      GetGoogleManagersResponse,
      GetGoogleManagersBody
    >({
      query: ({ google_email, id_token }) => ({
        url: `google/managers_accounts`,
        params: { google_email, id_token },
        method: 'GET'
      })
    }),
    googleClients: builder.mutation<
      GetGoogleClientsResponse,
      GetGoogleClientsBody
    >({
      query: ({ google_email, id_token, manager_account_id }) => ({
        url: `google/client_accounts`,
        params: { google_email, id_token, manager_account_id },
        method: 'GET'
      })
    }),
    googleCurrentAccount: builder.mutation<
      { message: string },
      GoogleCurrentAccountBody
    >({
      query: GoogleData => ({
        url: `google/user_current_account`,
        body: GoogleData,
        method: 'POST'
      })
    }),
    googleGetCurrentAccount: builder.mutation<
      googleGetCurrentAccountResponse,
      { id_token: string }
    >({
      query: ({ id_token }) => ({
        url: `google/current_account`,
        method: 'GET',
        params: { id_token }
      })
    })
  })
});
export const {
  useGoogleManagerAccountsMutation,
  useGoogleClientsMutation,
  useGoogleCurrentAccountMutation,
  useGoogleGetCurrentAccountMutation
} = googleConnectApi;
