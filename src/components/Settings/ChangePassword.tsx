import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react';
import styles from 'css/Settings.module.css';
import { Container } from 'react-bootstrap';
import * as Yup from 'yup';
import { useAppSelector } from 'app/hooks';
import {
  useChangePasswordMutation,
  useUserPasswordResetMutation
} from 'services/profileApi';
import Loading from 'shared/Loading';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function ChangePassword() {
  const getEmail = useAppSelector(state => state.authentication.email);
  const navigate = useNavigate();
  // const [userResetPasswordAction, { isLoading, isSuccess }] =
  //   useUserPasswordResetMutation();

  const [ChangePasswordAction, ChangePasswordResponse] =
    useChangePasswordMutation();

  const ChangePasswordSchema = Yup.object().shape({
    old_password: Yup.string().required('Old password is required'),
    new_password: Yup.string().required('New password is required')
    // .oneOf([Yup.ref('newPassword'), null], 'Password does not match')
  });
  const [errMessage, seterrMessage] = useState('');
  const initialData = {
    old_password: '',
    new_password: ''
  };
  const access_token = useAppSelector(
    state => state.authentication.access_token
  );
  const handleClick = async (values: any) => {
    const data = {
      access_token: access_token,
      old_password: values.old_password,
      new_password: values.new_password
    };

    try {
      const response: any = await ChangePasswordAction(data).unwrap();

      if (response.errorMessage) {
        if (response.errorType == 'NotAuthorizedException') {
          toast.error('Incorrect old password. Please enter correct password.');
        } else {
          toast.error(response.errorMessage);
        }
      } else if (response.ResponseMetadata.HTTPStatusCode == 200) {
        toast.success('Password has been updated successfully.');
      } else {
        toast.success(response);
      }
      // navigate('/settings');
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
    }
  };

  return (
    <div>
      <Container>
        <Formik
          enableReinitialize={true}
          initialValues={initialData}
          validationSchema={ChangePasswordSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            actions.resetForm({ values: initialData });
            handleClick(values);
            actions.setSubmitting(false);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <h3 className='mb-3'>Change Password</h3>

              <div className='form-group'>
                <label className='labelStyle'>
                  Old Password{' '}
                  {errors.old_password && touched.old_password ? (
                    <span>{errors.old_password}</span>
                  ) : null}
                </label>
                <Field
                  autoFocus={true}
                  className={`form-control h-38 ${styles.formField}`}
                  placeholder='Enter old password'
                  type='password'
                  name='old_password'
                />
              </div>
              <div className='form-group'>
                <label className='labelStyle'>
                  New Password{' '}
                  {errors.new_password && touched.new_password ? (
                    <span>{errors.new_password}</span>
                  ) : null}
                </label>
                <Field
                  autoFocus={true}
                  className={`form-control h-38 ${styles.formField}`}
                  placeholder='Enter new password'
                  type='password'
                  name='new_password'
                />
              </div>
              <button type='submit' className={styles.CRMSubmit}>
                {ChangePasswordResponse.isLoading ? (
                  <Loading loaderText='Please wait' />
                ) : (
                  <>Update Password</>
                )}
              </button>
            </Form>
          )}
        </Formik>
        {errMessage && <div className='error-msg'>{errMessage}</div>}
        {/* {isSuccess && (
          <div className='success-msg'>
            {isSuccess && 'Password changed successfully.'}
          </div>
        )} */}
      </Container>
    </div>
  );
}
