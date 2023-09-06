import { apiWest2Slice } from './apiSlice';

type GetCapacityMembersResponse = {
  data: Array<CapacityMembers>;
};
type CapacityMembers = {
  userid: number;
  user_name: string;
  user_image: string;
  max: string | number | null;
  unit: string | number | null;
  time: string | number | null;
  segment: string | number | null;
};
type GetCapacityMembersBody = {
  db: string | number;
  page: string | number;
};
type UpdateCapacityMembersResponse = {
  message: string;
  rowcount: string;
};
type UpdateCapacityMembersBody = {
  db: string;
  bodyData: Array<UpdateCapacityMembersBodyData>;
};
type UpdateCapacityMembersBodyData = {
  userid: number;
  max: string | number | null;
  unit: string | number | null;
  time: string | number | null;
  segment: string | number | null;
};

export const capacityApi = apiWest2Slice.injectEndpoints({
  endpoints: builder => ({
    getCapacityMembers: builder.mutation<
      GetCapacityMembersResponse,
      GetCapacityMembersBody
    >({
      query: ({ db, page }) => ({
        url: `fulcrum/slides-user-status`,
        params: { db, page },

        method: 'GET'
      })
    }),
    updateCapacityMembers: builder.mutation<
      UpdateCapacityMembersResponse,
      UpdateCapacityMembersBody
    >({
      query: ({ db, bodyData }) => ({
        url: `fulcrum/slides-user-status`,
        params: { db },
        body: bodyData,
        method: 'POST'
      })
    })
  })
});
export const {
  useGetCapacityMembersMutation,
  useUpdateCapacityMembersMutation
} = capacityApi;
