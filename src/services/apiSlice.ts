import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setProfile } from 'features/profile/usersSlice';
import { RootState } from '../app/store';

const baseQueryEast1 = fetchBaseQuery({
  baseUrl: 'https://wbh0zadzgl.execute-api.us-east-1.amazonaws.com/v1/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).authentication.id_token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});
const baseQueryEast2 = fetchBaseQuery({
  // baseUrl: 'https://vm7i94jxji.execute-api.us-east-2.amazonaws.com/'
  baseUrl: 'https://z9r844z4j2.execute-api.us-west-2.amazonaws.com/prod/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    headers.set(
      'authorization',
      `Basic ZnVsY3J1bTo4Sm5rYnA0ajMyZnVWOE8wVGU5dFN1akJyT1NHZHVIMA==`
    );
    return headers;
  }
});
const baseQueryWest2 = fetchBaseQuery({
  baseUrl:
    'https://z9r844z4j2.execute-api.us-west-2.amazonaws.com/prod/api/v1/',
  prepareHeaders: (headers, { getState }) => {
    headers.set(
      'authorization',
      `Basic ZnVsY3J1bTo4Sm5rYnA0ajMyZnVWOE8wVGU5dFN1akJyT1NHZHVIMA==`
    );

    return headers;
  }
});
const baseQueryEast1WithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result: any = await baseQueryEast1(args, api, extraOptions);
  // if (args.url.includes('_logout')) {
  //   const id_token = (api.getState() as RootState).authentication.id_token;
  //   const accountsStatusBody = {
  //     method: 'GET',
  //     url: 'status/check_social_login_status',
  //     params: { id_token }
  //   };
  //   const { data }: any = await baseQueryEast1(
  //     accountsStatusBody,
  //     api,
  //     extraOptions
  //   );

  // }
  if (result?.error?.status === 401 && !args.url.includes('auth')) {
    const refreshTokenBody = {
      body: {
        username: (api.getState() as RootState).authentication.email,
        refresh_token: (api.getState() as RootState).authentication
          .refresh_token
      },
      method: 'POST',
      url: 'oauth/tokens'
    };
    const { data }: any = await baseQueryEast1(
      refreshTokenBody,
      api,
      extraOptions
    );
    // if (data && data.status === 'success') {
    //   console.log(data)
    //   // const token: string = data.token;
    //   // const refresh_token: string = data.refresh_token;
    //   // const email = (api.getState() as RootState).authentication.email;
    //   // const isAuthenticated = (api.getState() as RootState).authentication
    //   //   .isAuthenticated;

    //   // const setNewTokenData = {
    //   //   refresh_token: refresh_token,
    //   //   token: token,
    //   //   email: email,
    //   //   isAuthenticated: isAuthenticated,
    //   //   message: 'OK'
    //   // };

    //   // api.dispatch(setCredentials({ ...setNewTokenData }));
    //   result = await baseQueryEast1(args, api, extraOptions);
    // } else {
    //   api.dispatch(logout());
    // }
  }
  if (
    (args.url === '/users/profile' && args.method === 'POST') ||
    args.url === '/users/profile/new-photo'
  ) {
    const getProfileArgs = {
      method: 'GET',
      url: '/users/profile'
    };
    const { data }: any = await baseQueryEast1(
      getProfileArgs,
      api,
      extraOptions
    );

    api.dispatch(setProfile(data));
  }

  return result;
};
const baseQueryEast2WithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result: any = await baseQueryEast2(args, api, extraOptions);
  // if (args.url.includes('_logout')) {
  //   const id_token = (api.getState() as RootState).authentication.id_token;
  //   const accountsStatusBody = {
  //     method: 'GET',
  //     url: 'status/check_social_login_status',
  //     params: { id_token }
  //   };
  //   const { data }: any = await baseQueryEast1(
  //     accountsStatusBody,
  //     api,
  //     extraOptions
  //   );

  // }
  if (result?.error?.status === 401 && !args.url.includes('auth')) {
    const refreshTokenBody = {
      body: {
        username: (api.getState() as RootState).authentication.email,
        refresh_token: (api.getState() as RootState).authentication
          .refresh_token
      },
      method: 'POST',
      url: 'oauth/tokens'
    };
    const { data }: any = await baseQueryEast1(
      refreshTokenBody,
      api,
      extraOptions
    );
    // if (data && data.status === 'success') {
    //   console.log(data)
    //   // const token: string = data.token;
    //   // const refresh_token: string = data.refresh_token;
    //   // const email = (api.getState() as RootState).authentication.email;
    //   // const isAuthenticated = (api.getState() as RootState).authentication
    //   //   .isAuthenticated;

    //   // const setNewTokenData = {
    //   //   refresh_token: refresh_token,
    //   //   token: token,
    //   //   email: email,
    //   //   isAuthenticated: isAuthenticated,
    //   //   message: 'OK'
    //   // };

    //   // api.dispatch(setCredentials({ ...setNewTokenData }));
    //   result = await baseQueryEast1(args, api, extraOptions);
    // } else {
    //   api.dispatch(logout());
    // }
  }
  if (
    (args.url === '/users/profile' && args.method === 'POST') ||
    args.url === '/users/profile/new-photo'
  ) {
    const getProfileArgs = {
      method: 'GET',
      url: '/users/profile'
    };
    const { data }: any = await baseQueryEast1(
      getProfileArgs,
      api,
      extraOptions
    );

    api.dispatch(setProfile(data));
  }

  return result;
};

const baseQueryWest2WithReauth = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result: any = await baseQueryWest2(args, api, extraOptions);
  // if (args.url.includes('_logout')) {
  //   const id_token = (api.getState() as RootState).authentication.id_token;
  //   const accountsStatusBody = {
  //     method: 'GET',
  //     url: 'status/check_social_login_status',
  //     params: { id_token }
  //   };
  //   const { data }: any = await baseQueryEast1(
  //     accountsStatusBody,
  //     api,
  //     extraOptions
  //   );

  // }
  if (result?.error?.status === 401 && !args.url.includes('auth')) {
    const refreshTokenBody = {
      body: {
        username: (api.getState() as RootState).authentication.email,
        refresh_token: (api.getState() as RootState).authentication
          .refresh_token
      },
      method: 'POST',
      url: 'oauth/tokens'
    };
    const { data }: any = await baseQueryEast1(
      refreshTokenBody,
      api,
      extraOptions
    );
    // if (data && data.status === 'success') {
    //   console.log(data)
    //   // const token: string = data.token;
    //   // const refresh_token: string = data.refresh_token;
    //   // const email = (api.getState() as RootState).authentication.email;
    //   // const isAuthenticated = (api.getState() as RootState).authentication
    //   //   .isAuthenticated;

    //   // const setNewTokenData = {
    //   //   refresh_token: refresh_token,
    //   //   token: token,
    //   //   email: email,
    //   //   isAuthenticated: isAuthenticated,
    //   //   message: 'OK'
    //   // };

    //   // api.dispatch(setCredentials({ ...setNewTokenData }));
    //   result = await baseQueryEast1(args, api, extraOptions);
    // } else {
    //   api.dispatch(logout());
    // }
  }
  if (
    (args.url === '/users/profile' && args.method === 'POST') ||
    args.url === '/users/profile/new-photo'
  ) {
    const getProfileArgs = {
      method: 'GET',
      url: '/users/profile'
    };
    const { data }: any = await baseQueryEast1(
      getProfileArgs,
      api,
      extraOptions
    );

    api.dispatch(setProfile(data));
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryEast1WithReauth,
  endpoints: builder => ({})
});

export const apiEast2Slice = createApi({
  reducerPath: 'apiEast2Slice',
  baseQuery: baseQueryEast2WithReauth,
  endpoints: builder => ({})
});

export const apiWest2Slice = createApi({
  reducerPath: 'apiWest2Slice',
  baseQuery: baseQueryWest2WithReauth,
  endpoints: builder => ({})
});
