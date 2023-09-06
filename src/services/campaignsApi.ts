import { apiSlice, apiWest2Slice } from 'services/apiSlice';
type postAssignCampaignsBody = {
  id_token: string;
  data: postAssignCampaignsBodyData;
};
type postAssignCampaignsBodyData = {
  client_name: string;
  campaign_id: string;
  campaign_name: string;
  segments: string;
  account: string;
  ad_account_id: string;
};
type getAssignedCampaignsBody = {
  id_token: string;
  client_name: string;
};

export const campaignsWest2Api = apiWest2Slice.injectEndpoints({
  endpoints: builder => ({
    getGoogleUpdatedCampaigns: builder.mutation<any, any>({
      query: ({ db, page_size, page }) => ({
        url: `fulcrum/googleads-performance/campaigns/unique`,
        params: { db, page_size, page },
        method: 'GET'
      })
    })
  })
});

export const campaignsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getGoogleCampaigns: builder.mutation<any, string>({
      query: client_account_id => ({
        url: `google/campaigns/${client_account_id}`,
        method: 'GET'
      })
    }),
    getFacebookCampaigns: builder.mutation<any, string>({
      query: client_account_id => ({
        url: `fb/campaigns`,
        params: { client_account_id },
        method: 'GET'
      })
    }),
    getBingCampaigns: builder.mutation<any, string>({
      query: bing_client_account_id => ({
        url: `bing_campaigns/campaigns`,
        params: { bing_client_account_id },
        method: 'GET'
      })
    }),
    getAssignCampaigns: builder.mutation<any, getAssignedCampaignsBody>({
      query: ({ id_token, client_name }) => ({
        url: `assign_campaigns/get`,
        params: { id_token, client_name },
        method: 'GET'
      })
    }),
    postAssignCampaigns: builder.mutation<null, postAssignCampaignsBody>({
      query: ({ data, id_token }) => ({
        url: `assign_campaigns/post`,
        params: { id_token },
        method: 'POST',
        body: data
      })
    })
  })
});
export const {
  useGetGoogleCampaignsMutation,
  useGetFacebookCampaignsMutation,
  useGetAssignCampaignsMutation,
  usePostAssignCampaignsMutation,
  useGetBingCampaignsMutation
} = campaignsApi;
export const { useGetGoogleUpdatedCampaignsMutation } = campaignsWest2Api;
