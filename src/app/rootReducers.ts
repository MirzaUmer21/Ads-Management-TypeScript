import { combineReducers } from '@reduxjs/toolkit';
import authReducer from 'features/auth/authSlice';
import preAuthReducer from 'features/auth/preAuthSlice';
import profileReducer from 'features/profile/usersSlice';
import accountsReducer from 'features/accounts/accountsSlice';
import googleAccountReducer from 'features/accounts/googleAccountSlice';
import facebookAccountReducer from 'features/accounts/facebookAccountSlice';
import bingAccountReducer from 'features/accounts/bingAccountSlice';
import yelpAccountReducer from 'features/accounts/yelpAccountSlice';
import campaignsReducer from 'features/campaigns/campaignsSlice';
import clientsDataReducer from 'features/clients/clientsSlice';
import capacityReducer from 'features/capacity/capacitySlice';
import budgetsReducer from 'features/budget/budgetSlice';
import dashboardReducer from 'features/dashboard/dashboardSlice';

import { apiSlice } from 'services/apiSlice';
import { apiEast2Slice, apiWest2Slice } from 'services/apiSlice';

const combinedReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  [apiEast2Slice.reducerPath]: apiEast2Slice.reducer,
  [apiWest2Slice.reducerPath]: apiWest2Slice.reducer,
  preAuthentication: preAuthReducer,
  dashboard: dashboardReducer,
  authentication: authReducer,
  accounts: accountsReducer,
  googleAccount: googleAccountReducer,
  facebookAccount: facebookAccountReducer,
  bingAccount: bingAccountReducer,
  yelpAccount: yelpAccountReducer,
  profile: profileReducer,
  campaigns: campaignsReducer,
  clientsData: clientsDataReducer,
  capacity: capacityReducer,
  budgets: budgetsReducer
});

export const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};
