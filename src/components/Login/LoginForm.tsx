import React, { useState } from 'react';
import styles from 'css/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from 'app/hooks';
import { useUserLoginMutation } from 'services/authApi';
import { setCredentials } from 'features/auth/authSlice';
import Loading from 'shared/Loading';
import { setPreAuthCredentials } from 'features/auth/preAuthSlice';

export default function LoginForm() {
  const [userLoginAction, { isLoading }] = useUserLoginMutation();
  const [errMessage, seterrMessage] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = async (data: any) => {
    const authenticationdata = {
      isAuthenticated: true
    };
    try {
      const loginResponse: any = await userLoginAction(data).unwrap();
      if (loginResponse.ChallengeName === 'NEW_PASSWORD_REQUIRED') {
        const data = {
          Session: loginResponse.Session,
          USER_ID_FOR_SRP: loginResponse.ChallengeParameters.USER_ID_FOR_SRP
        };
        dispatch(setPreAuthCredentials({ ...data }));
        const path = '/initial-password-change';
        navigate(`${path}`);
      } else if (loginResponse.status === 'success') {
        dispatch(setCredentials({ ...loginResponse, ...authenticationdata }));
        navigate('/dashboard');
      } else if (loginResponse.status === 'fail') {
        seterrMessage(loginResponse.message);
      }
    } catch (err: any) {
      console.log(err);
      // seterrMessage(err.data.error);
    }
  };

  const forgotPasswordHandler = (e: any) => {
    const path = '/forgot-password';
    navigate(`${path}`);
  };
  const LoginSchema = Yup.object().shape({
    username: Yup.string().required('This field is required'),
    password: Yup.string().required('This field is required')
  });
  const initialFormdata = {
    username: '',
    password: ''
  };

  return (
    <>
      <Formik
        initialValues={initialFormdata}
        validationSchema={LoginSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          handleClick(values);
          actions.setSubmitting(false);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.loginInputs}>
              <div className='mb-3 col-lg-12 col-md-12 col-sm-12 col-12'>
                <div className='form-group'>
                  <label className={`labelStyle d-block mb-1`}>
                    Email Address{' '}
                    {errors.username && touched.username ? (
                      <span className='errorField'>{errors.username}</span>
                    ) : null}
                  </label>
                  <Field
                    autoFocus={true}
                    className={`form-control h-38 ${styles.formField}`}
                    placeholder='Enter email address'
                    type='username'
                    name='username'
                  />
                </div>
              </div>

              <div className='mb-3 col-lg-12 col-md-12 col-sm-12 col-12'>
                <div className='form-group'>
                  <label className={`labelStyle d-block mb-1`}>
                    Password
                    {errors.password && touched.password ? (
                      <span className='errorField'>{errors.password}</span>
                    ) : null}
                  </label>
                  <Field
                    autoFocus={true}
                    className={`form-control h-38 ${styles.formField}`}
                    placeholder='Enter password'
                    type='password'
                    name='password'
                  />
                </div>
              </div>
            </div>

            <div
              className={`${styles.customRememberMe} d-flex justify-content-between`}
            >
              <div className='mb-3'>
                <div className='form-check'>
                  <Field
                    name='remember_me'
                    className='form-check-input'
                    type='checkbox'
                  />
                  <label>Remember Me</label>
                </div>
              </div>

              {/* <p style={{ cursor: 'pointer' }} onClick={forgotPasswordHandler}> */}
              <p className='forgotPasswordLink'>
                <a
                  style={{ color: '#8992a3', textDecoration: 'none' }}
                  href='https://fulcrum.auth.us-east-1.amazoncognito.com/forgotPassword?client_id=4cal9s6mrol39muk0f15obelcr&response_type=token&scope=aws.cognito.signin.user.admin+email+openid+phone+profile&redirect_uri=https%3A%2F%2Fd1q8kiezyj0oy7.cloudfront.net%2F'
                >
                  Forgot Password?
                </a>
              </p>
            </div>

            <button
              id='loginButton'
              type='submit'
              className={styles.loginSubmit}
            >
              {isLoading ? <Loading loaderText='Please wait' /> : <>Sign in</>}
            </button>

            {errMessage && <p className='error-msg'>{errMessage}</p>}
          </Form>
        )}
      </Formik>
    </>
  );
}
