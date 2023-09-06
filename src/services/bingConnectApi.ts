import { apiSlice } from 'services/apiSlice';
type GetBingManagersBody = {
  id_token: string;
  bing_email: string;
};
type BingCurrentAccountBody = {
  fulcrum_email: string;
  bing_email: string;
  bing_client_account_id: string;
  bing_manager_account_id: string;
  bing_client_account_name: string;
};
type bingGetCurrentAccountResponse = {
  bing_client_account_id: string;
  bing_client_account_name: string;
  bing_email: string;
  bing_manager_account_id: string;
  fulcrum_email: string;
};
export const bingConnectApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    bingManagerAccounts: builder.mutation<any, GetBingManagersBody>({
      query: ({ bing_email, id_token }) => ({
        url: `bing/bing_manager_account`,
        params: { bing_email, id_token },
        method: 'GET'
      })
    }),
    bingClients: builder.mutation<any, GetBingManagersBody>({
      query: ({ bing_email, id_token }) => ({
        url: `bing/bing_client_account`,
        params: { bing_email, id_token },
        method: 'GET'
      })
    }),
    bingCurrentAccount: builder.mutation<
      { message: string },
      BingCurrentAccountBody
    >({
      query: BingData => ({
        url: `bing/bing_current_account`,
        body: BingData,
        method: 'POST'
      })
    }),
    bingGetCurrentAccount: builder.mutation<
      bingGetCurrentAccountResponse,
      { id_token: string }
    >({
      query: ({ id_token }) => ({
        url: `bing/bing_current_account`,
        method: 'GET',
        params: { id_token }
      })
    })
  })
});

export const {
  useBingManagerAccountsMutation,
  useBingClientsMutation,
  useBingCurrentAccountMutation,
  useBingGetCurrentAccountMutation
} = bingConnectApi;
