import { apiSlice } from 'services/apiSlice';

type loginBody = {
  username: string;
  password: string;
};
type loginResponse = {
  status: string;
  id_token: string;
  access_token: string;
  refresh_token: string;
};
type loginAccountResponse = {
  auth_url: string;
};
type initialPasswordChangeBody = {
  username: string;
  new_password: string;
  session: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    userLogin: builder.mutation<loginResponse, loginBody>({
      query: loginData => ({
        url: `oauth/tokens`,
        method: 'POST',
        body: loginData
      })
    }),
    googleLogin: builder.mutation<loginAccountResponse, void>({
      query: () => ({
        url: `google/google_login`,
        method: 'GET'
      })
    }),
    bingLogin: builder.mutation<loginAccountResponse, void>({
      query: () => ({
        url: `bing/bing_login`,
        method: 'GET'
      })
    }),
    facebookLogin: builder.mutation<loginAccountResponse, void>({
      query: () => ({
        url: `fb/fb_login`,
        method: 'GET'
      })
    }),
    yelpLogin: builder.mutation<loginAccountResponse, void>({
      query: () => ({
        url: `yelp/yelp_login`,
        method: 'GET'
      })
    }),

    initialPasswordChange: builder.mutation<any, initialPasswordChangeBody>({
      query: data => ({
        url: `initial_pwd_change`,
        method: 'POST',
        body: data
      })
    })
  })
});
export const {
  useUserLoginMutation,
  useInitialPasswordChangeMutation,
  useGoogleLoginMutation,
  useBingLoginMutation,
  useFacebookLoginMutation,
  useYelpLoginMutation
} = authApi;
