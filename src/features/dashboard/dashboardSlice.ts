import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type ProfileState = {
  todayDashboardLogs: Array<GetDashboardLogsResponse>;
  earlierDashboardLogs: Array<GetDashboardLogsResponse>;
  dashboardStats: DashboardStatsType | null;
};
type DashboardStatsType = {
  service: number;
  sales: number;
  install: number;
  maintenance: number;
};
interface GetDashboardLogsResponse {
  on: string;
  service_titan_id: string;
  action_taken: string;
  segment: string;
  agree: string;
  of: string;
  condition_date: string;
  metric: string;
  had_condition: string;
}

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    todayDashboardLogs: [],
    earlierDashboardLogs: [],
    dashboardStats: null
  } as ProfileState,
  reducers: {
    setTodayDashboardLogs: (
      state,
      {
        payload: { todayDashboardLogs }
      }: PayloadAction<{ todayDashboardLogs: Array<GetDashboardLogsResponse> }>
    ) => {
      state.todayDashboardLogs = [...todayDashboardLogs];
    },
    setEarlierDashboardLogs: (
      state,
      {
        payload: { earlierDashboardLogs }
      }: PayloadAction<{
        earlierDashboardLogs: Array<GetDashboardLogsResponse>;
      }>
    ) => {
      state.earlierDashboardLogs = [...earlierDashboardLogs];
    },
    setDashboardStats: (
      state,
      {
        payload: { dashboardStats }
      }: PayloadAction<{
        dashboardStats: DashboardStatsType;
      }>
    ) => {
      state.dashboardStats = dashboardStats;
    }
  }
});

export const {
  setTodayDashboardLogs,
  setEarlierDashboardLogs,
  setDashboardStats
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
