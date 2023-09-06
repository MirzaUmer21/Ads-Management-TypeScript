import { apiSlice } from 'services/apiSlice';
interface assignObjectiveBody {
  fulcrum_email: string;
  client_name: string;
  segment: string;
  account: string;
  ad_account_id: string;
  campaign_id: string;
  cpa: string;
  budget_shift: string;
  objective: string;
}
interface GetObjectivesResponse {
  date_added: string;
  cpa: string;
  budget_shift: string;
  segment: string;
  account: string;
  objective: string;
  client_name: string;
  campaign_id: string;
  ad_account_id: string;
  fulcrum_email: string;
}
export const objectivesApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getObjectives: builder.mutation<GetObjectivesResponse, any>({
      query: ({ id_token, client_name }) => ({
        url: `objectives/getObjective`,
        method: 'GET',
        params: { id_token, client_name }
      })
    }),
    assignObjectives: builder.mutation<any, assignObjectiveBody>({
      query: data => ({
        url: `objectives/createObjective`,
        method: 'POST',
        body: data
      })
    })
  })
});
export const { useAssignObjectivesMutation, useGetObjectivesMutation } =
  objectivesApi;
