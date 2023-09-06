import { Col, Container, Row } from 'react-bootstrap';
import styles from 'css/Accounts.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import SelectFieldFormik from 'shared/SelectFieldFormik';
import * as Yup from 'yup';

export default function AccountCRMLoginForm({
  dataHandler,
  data
}: AccountFormProps) {
  const SignupSchema = Yup.object().shape({
    appKey: Yup.string().required('This field is required'),
    clientId: Yup.string().required('This field is required'),
    clientSecret: Yup.string().required('This field is required'),
    tenantId: Yup.string().required('This field is required')
  });

  return (
    <div className='customCrmLogin'>
      <Container>
        <Row>
          <Col className={'stepperHeading'} lg={12}>
            <h3 className={styles.addsConnectivityHead}>CRM Login</h3>
          </Col>
          <div className={`${styles.formContainer} mb-4`}>
            <Col className='mx-auto' lg={7}>
              <Formik
                initialValues={data}
                validationSchema={SignupSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, actions) => {
                  dataHandler(values);
                  actions.setSubmitting(false);
                }}
              >
                <Form>
                  <Row className='mb-3'>
                    <Col lg={5}>
                      <div className={styles.crnImg}>
                        <img
                          className='w-100'
                          height='96px'
                          src='/images/accounts/crmImg.png'
                          alt='description'
                        />
                      </div>
                    </Col>
                    <Col className={styles.crmFromStyle} lg={7}>
                      <div className='w-100 crmLoginForm'>
                        <SelectFieldFormik
                          fieldSelect
                          col={12}
                          fieldName='segmentName'
                          fields={[{ label: 'Service Titan', value: '1' }]}
                          label='SELECT YOUR CRM'
                        />
                      </div>
                    </Col>
                  </Row>
                  <div className='form-group mb-4'>
                    <label className={styles.labelStyle}>
                      SERVICETITAN APP KEY
                      <ErrorMessage component='span' name='appKey' />
                    </label>
                    <Field
                      autoFocus={true}
                      className={`form-control h-38 ${styles.formField}`}
                      type='text'
                      name='appKey'
                    />
                  </div>
                  <div className='form-group mb-4'>
                    <label className={styles.labelStyle}>
                      SERVICETITAN Client ID
                      <ErrorMessage component='span' name='clientId' />
                    </label>
                    <Field
                      autoFocus={true}
                      className={`form-control h-38 ${styles.formField}`}
                      type='text'
                      name='clientId'
                    />
                  </div>
                  <div className='form-group mb-4'>
                    <label className={styles.labelStyle}>
                      SERVICETITAN Client Secret
                      <ErrorMessage component='span' name='clientSecret' />
                    </label>
                    <Field
                      autoFocus={true}
                      className={`form-control h-38 ${styles.formField}`}
                      type='text'
                      name='clientSecret'
                    />
                  </div>
                  <div className='form-group mb-4'>
                    <label className={styles.labelStyle}>
                      SERVICETITAN Tenant ID
                      <ErrorMessage component='span' name='tenantId' />
                    </label>
                    <Field
                      autoFocus={true}
                      className={`form-control h-38 ${styles.formField}`}
                      type='text'
                      name='tenantId'
                    />
                  </div>
                  <button type='submit' className={styles.CRMSubmit}>
                    Connect
                  </button>
                  <p className={styles.formInfo}>
                    By proceeding you agree to our terms of service
                  </p>
                </Form>
              </Formik>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}
interface AccountFormProps {
  dataHandler: any;
  data: any;
}
