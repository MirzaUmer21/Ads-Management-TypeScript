import React from 'react';
import styles from 'css/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useAppSelector } from 'app/hooks';
import { useInitialPasswordChangeMutation } from 'services/authApi';
import { setCredentials } from 'features/auth/authSlice';
import { useAppDispatch } from 'app/hooks';
import Loading from 'shared/Loading';
export default function InitialPasswordResetForm() {
  const [userInitialPasswordChangeAction, { isLoading, isSuccess }] =
    useInitialPasswordChangeMutation();
  const navigate = useNavigate();
  const ChangePasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .required('Password is required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        'Must contain 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character'
      ),
    repeatPassword: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Password does not match')
  });
  const dispatch = useAppDispatch();
  const initialData = {
    newPassword: '',
    repeatPassword: ''
  };
  const session_token = useAppSelector(
    state => state.preAuthentication.Session
  );
  const USER_ID_FOR_SRP = useAppSelector(
    state => state.preAuthentication.USER_ID_FOR_SRP
  );
  const handleClick = async (data: any) => {
    const changePasswordData = {
      username: USER_ID_FOR_SRP,
      new_password: data,
      session: session_token
    };
    try {
      const response = await userInitialPasswordChangeAction(
        changePasswordData
      ).unwrap();

      if (response.AuthenticationResult) {
        const dataToStore = {
          status: 'success',
          id_token: response.AuthenticationResult.IdToken,
          access_token: response.AuthenticationResult.AccessToken,
          refresh_token: response.AuthenticationResult.RefreshToken,

          isAuthenticated: true
        };
        dispatch(setCredentials({ ...dataToStore }));
        navigate('/dashboard');
      }
    } catch (err: any) {
      console.log(err);
      // seterrMessage(err.data.error);
    }
  };
  return (
    <Formik
      initialValues={initialData}
      validationSchema={ChangePasswordSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, actions) => {
        handleClick(values.newPassword);
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className={styles.loginInputs}>
            <label className={`labelStyle d-block mb-1`}>
              Password
              {errors.newPassword && touched.newPassword ? (
                <span className='errorField'>{errors.newPassword}</span>
              ) : null}
            </label>
            <Field
              autoFocus={true}
              className={`form-control h-38 ${styles.formField}`}
              placeholder='Enter new password'
              type='password'
              name='newPassword'
            />
          </div>
          <div className={styles.loginInputs}>
            <label className={`labelStyle d-block mb-1`}>
              Confirm Password
              {errors.repeatPassword && touched.repeatPassword ? (
                <span className='errorField'>{errors.repeatPassword}</span>
              ) : null}
            </label>
            <Field
              autoFocus={true}
              className={`form-control h-38 ${styles.formField}`}
              placeholder='Enter new password'
              type='password'
              name='repeatPassword'
            />
          </div>

          <div className={`${styles.customRememberMe} d-flex `}>
            <p onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
              <i className='fa fa-arrow-left ' aria-hidden='true'></i>
              &nbsp;Back To Login
            </p>
          </div>

          <button id='loginButton' type='submit' className={styles.loginSubmit}>
            {isLoading ? <Loading loaderText='Please wait' /> : <>Update</>}
          </button>
        </Form>
      )}
    </Formik>
  );
}
