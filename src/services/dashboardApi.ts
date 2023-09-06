import { apiSlice, apiWest2Slice } from 'services/apiSlice';
type GetDashboardLogsResponse = {
  on: string;
  service_titan_id: string;
  action_taken: string;
  segment: string;
  agree: string;
  of: string;
  condition_date: string;
  metric: string;
  had_condition: string;
};
type DashboardStatsResponse = {
  data: DashboardStatsType;
};
type DashboardStatsType = {
  service: number;
  sales: number;
  install: number;
  maintenance: number;
};
type UpdateDashboardLogsBody = {
  on: string;
  metric: string;
  segment: string;
  had_condition: string;
  of: string;
  condition_date: string;
  action_taken: string;
  agree: string;
  service_titan_id: string;
};
export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getDashboardLogs: builder.mutation<Array<GetDashboardLogsResponse>, any>({
      query: service_titan_id => ({
        url: `dashboard_logs/get_logs`,
        params: { service_titan_id },
        method: 'GET'
      })
    }),
    getDashboardLogsByDate: builder.mutation<
      Array<GetDashboardLogsResponse>,
      any
    >({
      query: ({ service_titan_id, start_date, end_date }) => ({
        url: `dashboard_logs/get_logs_by_date_range`,
        params: { service_titan_id, start_date, end_date },
        method: 'GET'
      })
    }),
    updateDashboardLogs: builder.mutation<null, UpdateDashboardLogsBody>({
      query: data => ({
        url: `dashboard_logs/post_logs`,
        body: data,
        method: 'POST'
      })
    })
  })
});

export const dashboardWest2Api = apiWest2Slice.injectEndpoints({
  endpoints: builder => ({
    getDashboardStats: builder.mutation<DashboardStatsResponse, any>({
      query: ({ db, page_size, page }) => ({
        url: `fulcrum/stats/capacity`,
        params: { db, page_size, page },
        method: 'GET'
      })
    })
  })
});
export const {
  useGetDashboardLogsMutation,
  useUpdateDashboardLogsMutation,
  useGetDashboardLogsByDateMutation
} = dashboardApi;
export const { useGetDashboardStatsMutation } = dashboardWest2Api;
