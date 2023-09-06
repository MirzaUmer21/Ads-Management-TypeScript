import { apiSlice } from 'services/apiSlice';

type facebookManagersData = {
  fb_email: string;
  name: string;
  picture: string;
  account_id: string;
};
type GetFacebookManagersBody = {
  id_token: string;
  fb_email: string;
};
type GetFacebookClientsBody = {
  id_token: string;
  fb_email: string;
};
type FbClientsData = {
  name: string;
  account_id: string;
  currency: string;
  timezone_id: number;
  id: string;
};
type GetFacebookClientsResponse = {
  accounts: Array<FbClientsData>;
};
type FacebookCurrentAccountBody = {
  fulcrum_email: string;
  fb_email: string;
  fb_client_account_id: string;
  fb_manager_account_id: string;
  fb_client_account_name: string;
};
type facebookGetCurrentAccountResponse = {
  fulcrum_email: string;
  fb_email: string;
  fb_client_account_id: string;
  fb_manager_account_id: string;
  fb_client_account_name: string;
};
export const facebookConnectApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    facebookManagerAccounts: builder.mutation<
      Array<facebookManagersData>,
      GetFacebookManagersBody
    >({
      query: ({ fb_email, id_token }) => ({
        url: `fb/fb_manager_account`,
        params: { fb_email, id_token },
        method: 'GET'
      })
    }),
    facebookClients: builder.mutation<
      GetFacebookClientsResponse,
      GetFacebookClientsBody
    >({
      query: ({ fb_email, id_token }) => ({
        url: `fb/fb_client_accounts`,
        params: { fb_email, id_token },
        method: 'GET'
      })
    }),
    facebookCurrentAccount: builder.mutation<
      { message: string },
      FacebookCurrentAccountBody
    >({
      query: FacebookData => ({
        url: `fb/user_current_account`,
        body: FacebookData,
        method: 'POST'
      })
    }),
    facebookGetCurrentAccount: builder.mutation<
      facebookGetCurrentAccountResponse,
      { id_token: string }
    >({
      query: ({ id_token }) => ({
        url: `fb/current_account`,
        method: 'GET',
        params: { id_token }
      })
    })
  })
});
export const {
  useFacebookManagerAccountsMutation,
  useFacebookClientsMutation,
  useFacebookCurrentAccountMutation,
  useFacebookGetCurrentAccountMutation
} = facebookConnectApi;
