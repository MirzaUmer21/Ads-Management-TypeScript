import { apiSlice } from 'services/apiSlice';
export const accountsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    socialLoginStatus: builder.mutation<socialLoginStatusResponse, string>({
      query: id_token => ({
        url: `status/check_social_login_status`,
        params: { id_token },
        method: 'GET'
      })
    }),
    googleConnect: builder.mutation<connectGoogleResponse, connectBody>({
      query: ({ code, id_token }) => ({
        url: `google/google_auth_code`,
        params: { code, id_token },
        method: 'GET'
      })
    }),
    googleDisconnect: builder.mutation<any, disconnectBody>({
      query: ({ google_email, id_token }) => ({
        url: `google/google_logout`,
        params: { id_token, google_email },
        method: 'GET'
      })
    }),

    bingEmailVerify: builder.mutation<connectResponse, connectBody>({
      query: ({ code, id_token }) => ({
        url: `bing/bing_email_auth_code`,
        params: { code, id_token },
        method: 'GET'
      })
    }),
    bingConnect: builder.mutation<connectResponse, connectBingBody>({
      query: ({ code, id_token, bing_email }) => ({
        url: `bing/bing_auth_code`,
        params: { code, id_token, bing_email },
        method: 'GET'
      })
    }),
    bingDisconnect: builder.mutation<any, disconnectBingBody>({
      query: ({ bing_email, id_token }) => ({
        url: `/bing/bing_logout`,
        params: { id_token, bing_email },
        method: 'GET'
      })
    }),
    facebookConnect: builder.mutation<connectFacebookResponse, connectBody>({
      query: ({ code, id_token }) => ({
        url: `fb/fb_auth_code`,
        params: { code, id_token },
        method: 'GET'
      })
    }),
    facebookDisconnect: builder.mutation<any, disconnectFbBody>({
      query: ({ fb_email, id_token }) => ({
        url: `fb/fb_logout`,
        params: { id_token, fb_email },
        method: 'GET'
      })
    }),
    yelpConnect: builder.mutation<connectResponse, connectBody>({
      query: ({ code, id_token }) => ({
        url: `yelp/yelp_auth_code`,
        params: { code, id_token },
        method: 'GET'
      })
    })
  })
});
export const {
  useSocialLoginStatusMutation,
  useBingConnectMutation,
  useFacebookConnectMutation,
  useGoogleConnectMutation,
  useYelpConnectMutation,
  useGoogleDisconnectMutation,
  useBingEmailVerifyMutation,
  useBingDisconnectMutation,
  useFacebookDisconnectMutation
} = accountsApi;
type socialLoginStatusResponse = {
  google: string;
  bing: string;
  fb: string;
  yelp: string;
};
type connectResponse = {
  message: string;
};
type connectGoogleResponse = {
  message: string;
  google_email: string;
};

type connectFacebookResponse = {
  message: string;
  fb_email: string;
};
type connectBingBody = {
  id_token: string;
  code: string;
  bing_email: string;
};
type connectBody = {
  id_token: string;
  code: string;
};
type GetGoogleManagersBody = {
  id_token: string;
  google_email: string;
};
type GetGoogleClientsBody = {
  id_token: string;
  google_email: string;
  manager_account_id: string;
};
type disconnectBody = {
  id_token: string;
  google_email: string;
};
type disconnectBingBody = {
  id_token: string;
  bing_email: string;
};
type disconnectFbBody = {
  id_token: string;
  fb_email: string;
};
