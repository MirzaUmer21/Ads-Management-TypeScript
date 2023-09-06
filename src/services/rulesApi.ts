import { apiSlice } from 'services/apiSlice';
type GetServiceRulesResponse = {
  service_name: string;
  rollup_budget: string;
  service_titan_id: string;
  crm_client_name: string;
  rollup_scalability: string;
  ad_account_id: string;
  rollup_cpa: string;
  rollup_campaigns: string;
};
type CreateServiceRuleBody = {
  crm_client_name: string;
  ad_account_id: string;
  service_titan_id: string;
  service_name: string;
  rollup_campaigns: string;
  rollup_budget: string;
  rollup_cpa: string;
  rollup_scalability: string;
};

type GetCampaignsRulesResponse = {
  crm_client_name: string;
  service_titan_id: string;
  campaign_name: string;
  campaign_id: string;
  budget: string;
  cpa: string;
  roas: string;
  scale: string;
  spend: string;
};

type CreateCampaignsRuleBody = {
  crm_client_name: string;
  service_titan_id: string;
  campaign_name: string;
  campaign_id: string;
  budget: string;
  cpa: string;
  roas: string;
  scale: string;
  spend: string;
};

type GetSegmentRulesResponse = {
  crm_client_name: string;
  service_titan_id: string;
  segment_name: string;
  rollup_budget: string;
  objective: string;
  rollup_team: 0;
  rollup_cpa: string;
  rollup_roas: string;
  rollup_jobs_or_daily_hours: string;
};
type CreateSegmentRuleBody = {
  crm_client_name: string;
  service_titan_id: string;
  segment_name: string;
  rollup_budget: string;
  objective: string;
  rollup_team: 0;
  rollup_cpa: string;
  rollup_roas: string;
  rollup_jobs_or_daily_hours: string;
}

export const rulesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    // Service Rules
    getServiceRules: builder.mutation<Array<GetServiceRulesResponse>, any>({
      query: client_name => ({
        url: `rules/service/get/${client_name}`,
        method: 'GET'
      })
    }),
    createServiceRule: builder.mutation<null, CreateServiceRuleBody>({
      query: data => ({
        url: `rules/serive/post`,
        body: data,
        method: 'POST'
      })
    }),
    // Campaigns Rules
    getCampaignsRules: builder.mutation<Array<GetCampaignsRulesResponse>, any>({
      query: client_name => ({
        url: `rules/campaigns/get/${client_name}`,
        method: 'GET'
      })
    }),
    createCampaignsRule: builder.mutation<null, CreateCampaignsRuleBody>({
      query: data => ({
        url: `rules/campaigns/post`,
        body: data,
        method: 'POST'
      })
    }),
    // Segment Rules
    getSegmentRules: builder.mutation<Array<GetSegmentRulesResponse>, any>({
      query: client_name => ({
        url: `rules/segment/get/${client_name}`,
        method: 'GET'
      })
    }),
    createSegmentRule: builder.mutation<null, CreateSegmentRuleBody>({
      query: data => ({
        url: `rules/segment/post`,
        body: data,
        method: 'POST'
      })
    })
  })
});
export const {
  useGetServiceRulesMutation,
  useCreateServiceRuleMutation,
  useGetCampaignsRulesMutation,
  useCreateCampaignsRuleMutation,
  useGetSegmentRulesMutation,
  useCreateSegmentRuleMutation
} = rulesApi;
