import React, { ChangeEvent, useState, useEffect } from 'react';
import styles from 'css/Settings.module.css';
import { Container } from 'react-bootstrap';
import * as Yup from 'yup';
import { Field, Form, Formik } from 'formik';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import ReactLoading from 'react-loading';
import {
  useGetUpdateUserProfilePictureURLMutation,
  useGetUserProfileMutation,
  useUpdateProfileNamesMutation,
  useUpdateuserprofilepictureMutation
} from 'services/profileApi';
import Loading from 'shared/Loading';
import { setProfile } from 'features/profile/usersSlice';
import axios from 'axios';

export default function UserDetails() {
  const [errMessage, seterrMessage] = useState('');
  const [imageUpdateMsg, setimageUpdateMsg] = useState('');

  const profileData = useAppSelector(state => state.profile.data);
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);
  const [updateUserProfileAction, { isLoading, isSuccess }] =
    useUpdateProfileNamesMutation();
  const [updateUserProfilePictureAction, pictureStatus] =
    useUpdateuserprofilepictureMutation();

  const dispatch = useAppDispatch();
  const [getUserprofileAction, getUserprofileResponse] =
    useGetUserProfileMutation();
  const [
    getUpdateUserProfilePictureURLAction,
    getUpdateUserProfilePictureURLResponse
  ] = useGetUpdateUserProfilePictureURLMutation();

  const initialData = {
    first_name: '',
    last_name: ''
  };
  //Schemas
  const UpdateProfileSchema = Yup.object().shape({
    first_name: Yup.string().required('This field is required'),
    last_name: Yup.string().required('This field is required')
  });
  //Profile functions
  const id_token = useAppSelector(state => state.authentication.id_token);
  const handleSubmit = async (data: any) => {
    try {
      const res = await updateUserProfileAction({
        data: data,
        id_token: id_token
      });
      if (res) {
        getUserprofileDate();
      }
    } catch (err: any) {
      seterrMessage(err.data.detail);
    }
  };

  const getUserprofileDate = async () => {
    try {
      const response: any = await getUserprofileAction(id_token).unwrap();
      if (response) {
        const ProfileData = {
          first_name: response.first_name,
          fulcrum_email: response.fulcrum_email,
          last_name: response.last_name,
          profile_picture_url: response.profile_picture_url,
          username: response.username
        };
        dispatch(setProfile({ data: ProfileData }));
      }
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const profileImage: any = event.target.files;

    const file = profileImage[0];
    try {
      const res: any = await getUpdateUserProfilePictureURLAction(id_token);
      if (res) {
        fetch(`${res.data.s3_signed_url}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'image/PNG'
          },
          body: file
        }).then(response => {
          if (response.status === 200)
            setimageUpdateMsg('Image Updated Successfully');
        });
        getUserprofileDate();
      }
    } catch (err: any) {
      seterrMessage(err.data.detail);
    }
  };

  return (
    <div>
      <Container>
        <div className='form-group mb-3'>
          <label className='labelStyle'>Edit Profile Picture:</label>
          <div>
            {pictureStatus.isLoading ? (
              <div
                className='d-flex justify-content-center align-items-center'
                style={{ height: '200px', width: '200px' }}
              >
                <ReactLoading
                  type='bubbles'
                  color='#5600d6'
                  height={80}
                  width={80}
                />
              </div>
            ) : (
              profileData?.profile_picture_url && (
                <div className={styles.imageEditComponent}>
                  <img
                    className={styles.userProfileImage}
                    src={profileData?.profile_picture_url!}
                    alt='profile'
                  />
                  <button
                    className={styles.customImageUploadButton}
                    onClick={() => {
                      if (hiddenFileInput.current != null)
                        hiddenFileInput.current.click();
                    }}
                  >
                    <i className='fa-solid fa-camera'></i>
                  </button>
                </div>
              )
            )}
            <input
              type='file'
              ref={hiddenFileInput}
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
          </div>
        </div>
        {errMessage && <div className='loading-msg'>{errMessage}</div>}

        {imageUpdateMsg && <div className='success-msg'>{imageUpdateMsg}</div>}
        <Formik
          enableReinitialize={true}
          initialValues={initialData}
          validationSchema={UpdateProfileSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            // console.log(values);
            handleSubmit(values);
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form className='mb-3'>
              <div className='form-group'>
                <label className='labelStyle'>
                  First Name:
                  {errors.first_name && touched.first_name ? (
                    <span>{errors.first_name}</span>
                  ) : null}
                </label>
                <Field
                  autoFocus={true}
                  className={`form-control h-38 ${styles.formField}`}
                  placeholder={profileData?.first_name}
                  type='text'
                  name='first_name'
                />
              </div>
              <div className='form-group'>
                <label className='labelStyle'>
                  Last Name:
                  {errors.last_name && touched.last_name ? (
                    <span>{errors.last_name}</span>
                  ) : null}
                </label>
                <Field
                  autoFocus={true}
                  className={`form-control h-38 ${styles.formField}`}
                  placeholder={profileData?.last_name}
                  type='text'
                  name='last_name'
                />
              </div>
              <div className='form-group'>
                <label className='labelStyle'>Email:</label>
                <Field
                  autoFocus={true}
                  className={`form-control h-38 ${styles.formField}`}
                  disabled
                  placeholder={profileData?.fulcrum_email}
                  type='email'
                  name='email'
                />
              </div>
              <button type='submit' className={styles.CRMSubmit}>
                {isLoading ? (
                  <Loading loaderText='Please wait' />
                ) : (
                  <>Update Profile</>
                )}
              </button>
            </Form>
          )}
        </Formik>
        {errMessage && <div className='error-msg'>{errMessage}</div>}
        {isSuccess && (
          <div className='success-msg'>
            {isSuccess && 'Profile updated successfully.'}
          </div>
        )}
      </Container>
    </div>
  );
}
