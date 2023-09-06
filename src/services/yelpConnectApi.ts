import { apiSlice } from 'services/apiSlice';

export const yelpConnectApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getYelpBusinesses: builder.mutation<Array<any>, null>({
      query: () => ({
        url: `yelp/businesses/getAllBusinesses`,
        method: 'GET'
      })
    }),
    setYelpActiveBusinesses: builder.mutation<any, any>({
      query: ({ id_token, bodyData }) => ({
        url: `yelp/businesses/selectBusiness`,
        params: { id_token },
        body: bodyData,
        method: 'POST'
      })
    }),
    getYelpPrograms: builder.mutation<any, string>({
      query: business_id => ({
        url: `yelp/programs/getAllPrograms`,
        params: { business_id },
        method: 'GET'
      })
    }),
    setYelpActiveProgram: builder.mutation<any, any>({
      query: ({ id_token, bodyData }) => ({
        url: `yelp/programs/selectProgram`,
        params: { id_token },
        body: bodyData,
        method: 'POST'
      })
    }),
    getYelpActiveProgram: builder.mutation<any, any>({
      query: id_token => ({
        url: `yelp/getCurrentAccount`,
        params: { id_token },
        method: 'GET'
      })
    })
  })
});
export const {
  useGetYelpBusinessesMutation,
  useSetYelpActiveBusinessesMutation,
  useGetYelpProgramsMutation,
  useSetYelpActiveProgramMutation,
  useGetYelpActiveProgramMutation
} = yelpConnectApi;
