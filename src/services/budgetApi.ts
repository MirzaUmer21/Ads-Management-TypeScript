import { apiSlice } from 'services/apiSlice';
interface getBudgets {
  id_token: string;
  crm_client_name: string;
}
interface getBudgetsResponse {
  sales: Array<any>;
  service: Array<any>;
  installs: Array<any>;
}

interface updateBudgets {
  account: string;
  ad_account_id: string;
  budget: string;
  cpa: string;
  crm_client_name: string;
  estimated_scalability: string;
  fulcrum_email: string;
  segments: string;
}
export const budgetsApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getAllBudgets: builder.mutation<getBudgetsResponse, getBudgets>({
      query: ({ crm_client_name, id_token }) => ({
        url: `budgets/getAllBudgets`,
        method: 'GET',
        params: { crm_client_name, id_token }
      })
    }),
    updateBudgets: builder.mutation<any, updateBudgets>({
      query: data => ({
        url: `budgets/updateBudgets`,
        method: 'POST',
        body: data
      })
    })
  })
});
export const { useGetAllBudgetsMutation, useUpdateBudgetsMutation } =
  budgetsApi;
