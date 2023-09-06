import { apiEast2Slice, apiSlice, apiWest2Slice } from 'services/apiSlice';
type GetCRMGoogleClientsMappingResponse = {
  google_client_account_id: string;
  google_client_account_name: string;
  google_manager_account_id: string;
  fulcrum_email: string;
  google_email: string;
};
type GetCRMGoogleClientsMappingBody = {
  fulcrum_email: string;
};
type GetCRMBingClientsMappingBody = {
  fulcrum_email: string;
};
type GetCRMMappingByFulcrumEmailResponse = {
  google_client_id: string;
  crm_client_name: string;
  fulcrum_email: string;
  fb_client_id: string;
  service_titan_client_id: string;
};

type GetCRMFBClientsMappingResponse = {
  fulcrum_email: string;
  fb_email: string;
  fb_client_account_id: string;
  fb_manager_account_id: string;
  fb_client_account_name: string;
};
type GetCRMBingClientsMappingResponse = {
  bing_client_account_id: string;
  bing_client_account_name: string;
  bing_manager_account_id: string;
  fulcrum_email: string;
  bing_email: string;
};
type GetCRMYelpClientsMappingResponse = {
  yelp_business_name: string;
  yelp_business_id: string;
  fulcrum_email: string;
};
type GetCRMFBClientsMappingBody = {
  fulcrum_email: string;
};

type PostCRMMappingBody = {
  crm_client_name: string;
  fulcrum_email: string;
  google_client_id: string;
  fb_client_id: string;
  service_titan_client_id: string;
};
type PostCRMMappingResponse = {
  crm_client_name: string;
  fulcrum_email: string;
  google_client_id: string;
  fb_client_id: string;
  service_titan_client_id: string;
};

type GetAllDefaultClientsResponse = {
  data: Array<GetAllDefaultClientsResData>;
};
type GetAllDefaultClientsResData = {
  tenantid: number;
  clientname: string;
  db_name: string;
};

export const crmApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getCRMGoogleClientsMapping: builder.mutation<
      Array<GetCRMGoogleClientsMappingResponse>,
      GetCRMGoogleClientsMappingBody
    >({
      query: ({ fulcrum_email }) => ({
        url: `crm_mapping/google_client_accounts`,
        params: { fulcrum_email },
        method: 'GET'
      })
    }),
    getCRMFBClientsMapping: builder.mutation<
      Array<GetCRMFBClientsMappingResponse>,
      GetCRMFBClientsMappingBody
    >({
      query: ({ fulcrum_email }) => ({
        url: `crm_mapping/fb_client_accounts`,
        params: { fulcrum_email },
        method: 'GET'
      })
    }),
    getCRMBingClientsMapping: builder.mutation<
      Array<GetCRMBingClientsMappingResponse>,
      GetCRMBingClientsMappingBody
    >({
      query: ({ fulcrum_email }) => ({
        url: `crm_mapping/bing_client_accounts`,
        params: { fulcrum_email },
        method: 'GET'
      })
    }),
    getCRMYelpClientsMapping: builder.mutation<
      Array<GetCRMYelpClientsMappingResponse>,
      GetCRMBingClientsMappingBody
    >({
      query: ({ fulcrum_email }) => ({
        url: `crm_mapping/yelp_client_accounts`,
        params: { fulcrum_email },
        method: 'GET'
      })
    }),
    postCRMMapping: builder.mutation<
      PostCRMMappingResponse,
      PostCRMMappingBody
    >({
      query: data => ({
        url: `crm_mapping/post`,
        body: data,
        method: 'POST'
      })
    }),
    getCRMMappingByEmail: builder.mutation<
      Array<GetCRMMappingByFulcrumEmailResponse>,
      string
    >({
      query: fulcrum_email => ({
        url: `crm_mapping/mappings_by_fulcrum_email`,
        params: { fulcrum_email },
        method: 'GET'
      })
    })
  })
});

export const crmWest2Api = apiWest2Slice.injectEndpoints({
  endpoints: builder => ({
    getAllDefaultClients: builder.mutation<
      Array<GetAllDefaultClientsResponse>,
      null
    >({
      query: () => ({
        url: `fulcrum/all-active-clients`,
        body: { dynamo_name: 'GoogleAdsSTLastRun_v2' },
        method: 'POST'
      })
    })
  })
});

export const {
  useGetCRMGoogleClientsMappingMutation,
  useGetCRMMappingByEmailMutation,
  useGetCRMFBClientsMappingMutation,
  usePostCRMMappingMutation,
  useGetCRMBingClientsMappingMutation,
  useGetCRMYelpClientsMappingMutation
} = crmApi;
export const { useGetAllDefaultClientsMutation } = crmWest2Api;
