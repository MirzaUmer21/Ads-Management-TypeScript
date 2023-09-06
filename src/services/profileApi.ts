import { apiSlice } from 'services/apiSlice';

interface apiBody {
  email: string | null;
}

type getProfileResponse = {
  updated_at: string;
  created_at: string;
  last_name: string;
  profile_picture_url: string;
  first_name: string;
  username: string;
  fulcrum_email: string;
};

interface updateUserPictureResponse {
  s3_signed_url: string;
  image_url: string;
}
interface updateUserPictureResponseold {
  s3_signed_url: string;
  image_url: string;
}
interface profilePictureData {
  photo: string;
}
interface userPasswordResetResponse {
  message: string;
}
interface apiuserPasswordResetBody {
  email: string | null;
  new_password: string;
}
interface updateUserNamesDataBody {
  id_token: string;
  data: updateUserNamesBody;
}
interface updateUserNamesBody {
  first_name: string;
  last_name: string;
}

interface ChangePasswordBody {
  old_password: string;
  new_password: string;
  access_token: string;
}

export const profileApi = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUserProfile: builder.mutation<getProfileResponse, string>({
      query: id_token => ({
        url: `profile/data`,
        method: 'GET',
        params: { id_token }
      })
      // invalidatesTags: ['Auth']
    }),
    updateProfileNames: builder.mutation<any, updateUserNamesDataBody>({
      query: ({ data, id_token }) => ({
        url: `profile/update_name`,
        method: 'PUT',
        params: { id_token },
        body: data
      })
    }),
    getUpdateUserProfilePictureURL: builder.mutation<
      updateUserPictureResponse,
      string
    >({
      query: id_token => ({
        url: `profile/upload_profile_picture`,
        method: 'GET',
        params: { id_token }
      })
    }),

    updateuserprofilepicture: builder.mutation<
      updateUserPictureResponseold,
      FormData
    >({
      query: data => ({
        url: `/users/profile/new-photo`,
        method: 'POST',
        body: data
      })
    }),
    userPasswordReset: builder.mutation<
      userPasswordResetResponse,
      apiuserPasswordResetBody
    >({
      query: data => ({
        url: `/users/reset-password`,
        method: 'POST',
        body: data
      })
    }),
    ChangePassword: builder.mutation<null, ChangePasswordBody>({
      query: data => ({
        url: `profile/change_password`,
        method: 'POST',
        body: data
      })
    })
  })
});
export const {
  useGetUserProfileMutation,
  useUserPasswordResetMutation,
  useUpdateProfileNamesMutation,
  useUpdateuserprofilepictureMutation,
  useChangePasswordMutation,
  useGetUpdateUserProfilePictureURLMutation
} = profileApi;
