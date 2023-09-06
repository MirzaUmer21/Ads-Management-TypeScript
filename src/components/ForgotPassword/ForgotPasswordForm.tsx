import React, { useState } from 'react';
import styles from 'css/Login.module.css';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import Loading from 'shared/Loading';

export default function ForgotPasswordForm() {
  const navigate = useNavigate();
  const [errMessage, seterrMessage] = useState('');
  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email')
      .required('This field is required')
  });
  const initialFormdata = {
    email: ''
  };
  // const [forgotPasswordAction, { isLoading, isSuccess }] =
  // useForgotPasswordMutation();
  // const handleClick = async (data: any) => {
  //   try {
  //     const res = await forgotPasswordAction(data).unwrap();
  //     //console.log(res);
  //     if (res.detail) navigate('/login');
  //   } catch (err: any) {
  //     //console.log(err);
  //     err.data.detail
  //       ? seterrMessage(err.data.detail)
  //       : seterrMessage(err.data.error);
  //   }
  // };
  return (
    <Formik
      initialValues={initialFormdata}
      validationSchema={LoginSchema}
      validateOnChange={false}
      validateOnBlur={false}
      onSubmit={(values, actions) => {
        // handleClick(values);
        console.log('Forgot Password');
        actions.setSubmitting(false);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className={styles.loginInputs}>
            <label className={`labelStyle d-block mb-1`}>
              Email Address{' '}
              {errors.email && touched.email ? (
                <span className='errorField'>{errors.email}</span>
              ) : null}
            </label>
            <Field
              autoFocus={true}
              className={`form-control h-38 ${styles.formField}`}
              placeholder='Enter email address'
              type='email'
              name='email'
            />
          </div>

          <div className={`${styles.customRememberMe} d-flex `}>
            <p onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
              <i className='fa fa-arrow-left ' aria-hidden='true'></i>
              &nbsp;Back To Login
            </p>
          </div>

          <button type='submit' className={styles.loginSubmit}>
            {<>Submit</>}
          </button>
          {/* {errMessage && <p className='error-msg'>{errMessage}</p>}
          {isSuccess && (
            <div className='success-msg'>
              {isSuccess &&
                'Please check your email as we have sent email to reset your password.'}
            </div> */}
          {/* )} */}
        </Form>
      )}
    </Formik>
  );
}
