import React, { useEffect, useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import styles from 'css/Accounts.module.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  useGetAllDefaultClientsMutation,
  useGetCRMBingClientsMappingMutation,
  useGetCRMFBClientsMappingMutation,
  useGetCRMGoogleClientsMappingMutation,
  useGetCRMYelpClientsMappingMutation,
  useGetCRMMappingByEmailMutation,
  usePostCRMMappingMutation
} from 'services/crmApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { toast } from 'react-toastify';
import Loading from 'shared/Loading';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import { PropagateLoader } from 'react-spinners';
import { setClientsStateData } from 'features/clients/clientsSlice';
import { useNavigate } from 'react-router-dom';

export default function CRMConnectForm() {
  const dispatch = useAppDispatch();

  const fulcrumEmail = useAppSelector(state => state.authentication.email);
  const [formData, setFormData] = useState({
    crm_client_name: '',
    fulcrum_email: fulcrumEmail,
    google_client_id: '',
    fb_client_id: '',
    service_titan_client_id: '',
    bing_client_id: '',
    yelp_client_id: ''
  });

  let googleOptions: Array<options> = [];
  let fbOptions: Array<options> = [];
  let bingOptions: Array<options> = [];
  let yelpOptions: Array<options> = [];

  let clientsOptions: Array<options> = [];

  const [CRMGoogleMappingClients, setCRMGoogleMappingClients] = useState<
    Array<GetCRMGoogleClientsMappingResponse>
  >([]);
  const [CRMFBMappingClients, setCRMFBMappingClients] = useState<
    Array<GetCRMFBClientsMappingResponse>
  >([]);
  const [CRMBingMappingClients, setCRMBingMappingClients] = useState<
    Array<GetCRMBingClientsMappingResponse>
  >([]);
  const [CRMYelpMappingClients, setCRMYelpMappingClients] = useState<
    Array<GetCRMYelpClientsMappingResponse>
  >([]);
  const [CRMDefaultClients, setCRMDefaultClients] = useState<
    Array<GetAllDefaultClientsResData>
  >([]);
  const navigate = useNavigate();
  const connectFromSchema = Yup.object().shape({
    crm_client_name: Yup.string().required('Please Select Client'),
    fb_client_id: Yup.string().required('Please Select Facebook Client'),
    bing_client_id: Yup.string().required('Please Select Bing Client'),
    google_client_id: Yup.string().required('Please Select Google Client'),
    service_titan_client_id: Yup.string().required('This field is required'),
    yelp_client_id: Yup.string().required('Please Select Yelp Client'),
    fulcrum_email: Yup.string().required('This field is required')
  });

  //Mutations
  const [getCRMGoogleClientsMappingAction, getCRMGoogleClientsMappingResponse] =
    useGetCRMGoogleClientsMappingMutation();

  const [getCRMFBClientsMappingAction, getCRMFBClientsMappingResponse] =
    useGetCRMFBClientsMappingMutation();
  const [getCRMBingClientsMappingAction, getCRMBingClientsMappingResponse] =
    useGetCRMBingClientsMappingMutation();

  const [postCRMMappingAction, postCRMMappingResponse] =
    usePostCRMMappingMutation();
  const [getAllDefaultClientsAction, getAllDefaultClientsResponse] =
    useGetAllDefaultClientsMutation();
  const [getCRMMappingByEmailAction] = useGetCRMMappingByEmailMutation();
  const [getCRMYelpClientsMappingAction, getCRMYelpClientsMappingResponse] =
    useGetCRMYelpClientsMappingMutation();

  const getCRMGoogleClientsMappingData = async () => {
    try {
      const response: Array<GetCRMGoogleClientsMappingResponse> =
        await getCRMGoogleClientsMappingAction({
          fulcrum_email: fulcrumEmail
        }).unwrap();
      if (response) {
        setCRMGoogleMappingClients(response);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const getCRMFBClientsMappingData = async () => {
    try {
      const response: Array<GetCRMFBClientsMappingResponse> =
        await getCRMFBClientsMappingAction({
          fulcrum_email: fulcrumEmail
        }).unwrap();
      if (response) {
        setCRMFBMappingClients(response);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const getCRMBingClientsMappingData = async () => {
    try {
      const response: Array<GetCRMBingClientsMappingResponse> =
        await getCRMBingClientsMappingAction({
          fulcrum_email: fulcrumEmail
        }).unwrap();
      if (response) {
        setCRMBingMappingClients(response);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const getCRMYelpClientsMappingData = async () => {
    try {
      const response: Array<GetCRMYelpClientsMappingResponse> =
        await getCRMYelpClientsMappingAction({
          fulcrum_email: fulcrumEmail
        }).unwrap();
      if (response) {
        setCRMYelpMappingClients(response);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const GetAllDefaultClients = async () => {
    try {
      const response: any = await getAllDefaultClientsAction(null).unwrap();
      if (response) {
        setCRMDefaultClients(response.data);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const postCRMMapping = async data => {
    try {
      const response: any = await postCRMMappingAction(data).unwrap();
      if (response) {
        toast.success(response);

        try {
          const response: any = await getCRMMappingByEmailAction(
            fulcrumEmail
          ).unwrap();
          if (response) {
            dispatch(setClientsStateData({ AllClients: response }));
            navigate('/dashboard');
          }
        } catch (err: any) {
          console.log(err);
        }
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  useEffect(() => {
    getCRMGoogleClientsMappingData();
    getCRMFBClientsMappingData();
    getCRMBingClientsMappingData();
    getCRMYelpClientsMappingData();
    GetAllDefaultClients();
  }, []);

  return (
    <>
      {getCRMGoogleClientsMappingResponse.isLoading ||
      getCRMFBClientsMappingResponse.isLoading ||
      getAllDefaultClientsResponse.isLoading ||
      getCRMBingClientsMappingResponse.isLoading ||
      getCRMYelpClientsMappingResponse.isLoading ? (
        <div
          style={{
            display: 'flex',
            height: '30px',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <PropagateLoader color='#5600d6' />
        </div>
      ) : (
        <Container>
          <Formik
            enableReinitialize={true}
            initialValues={formData}
            validationSchema={connectFromSchema}
            validateOnChange={false}
            validateOnBlur={false}
            onSubmit={(values, actions) => {
              actions.resetForm({ values: formData });
              postCRMMapping(values);
              actions.setSubmitting(false);
            }}
          >
            {props => {
              const { setFieldValue, errors } = props;
              googleOptions = [];
              fbOptions = [];
              bingOptions = [];
              yelpOptions = [];

              clientsOptions = [];
              CRMGoogleMappingClients &&
                CRMGoogleMappingClients.map((elem, index) => {
                  const temp = {
                    value: elem.google_client_account_id,
                    label: elem.google_client_account_name
                  };
                  googleOptions.push(temp);

                  return null;
                });
              CRMFBMappingClients &&
                CRMFBMappingClients.map((elem, index) => {
                  const temp = {
                    value: elem.fb_client_account_id,
                    label: elem.fb_client_account_name
                  };
                  fbOptions.push(temp);

                  return null;
                });
              CRMBingMappingClients &&
                CRMBingMappingClients.map((elem, index) => {
                  const temp = {
                    value: elem.bing_client_account_id,
                    label: elem.bing_client_account_name
                  };
                  bingOptions.push(temp);

                  return null;
                });

              CRMYelpMappingClients &&
                CRMYelpMappingClients.map((elem, index) => {
                  const temp = {
                    value: elem.yelp_business_id,
                    label: elem.yelp_business_name
                  };
                  yelpOptions.push(temp);

                  return null;
                });

              CRMDefaultClients &&
                CRMDefaultClients.map((elem, index) => {
                  const temp = {
                    value: elem.db_name,
                    label: elem.db_name,
                    id: elem.tenantid
                  };
                  clientsOptions.push(temp);
                  return null;
                });
              return (
                <Form>
                  <h3
                    className='mb-3 text-center'
                    style={{ marginTop: '30px' }}
                  >
                    Connect to CRM
                  </h3>

                  <ReactSelectFormik
                    fields={clientsOptions}
                    fieldName='crm_client_name'
                    label='CLIENT NAME'
                    stateChange={setFieldValue}
                    hasError={errors.crm_client_name}
                  />

                  <ReactSelectFormik
                    fields={googleOptions}
                    fieldName='google_client_id'
                    label='GOOGLE ACCOUNT ID'
                    hasError={errors.google_client_id}
                  />
                  <ReactSelectFormik
                    fields={bingOptions}
                    fieldName='bing_client_id'
                    label='BING ACCOUNT ID'
                    hasError={errors.bing_client_id}
                  />
                  <ReactSelectFormik
                    fields={fbOptions}
                    fieldName='fb_client_id'
                    label='FACEBOOK ACCOUNT ID'
                    hasError={errors.fb_client_id}
                  />
                  <ReactSelectFormik
                    fields={yelpOptions}
                    fieldName='yelp_client_id'
                    label='YELP BUSINESS ACCOUNT ID'
                    hasError={errors.yelp_client_id}
                  />
                  <div className='form-group mb-4'>
                    <label className={styles.labelStyle}>
                      EMAIL
                      <ErrorMessage component='span' name='fulcrum_email' />
                    </label>
                    <Field
                      autoFocus={true}
                      className={`form-control h-38 ${styles.formField}`}
                      type='text'
                      name='fulcrum_email'
                      value={fulcrumEmail}
                      disabled
                    />
                  </div>

                  <div className='form-group mb-4'>
                    <label className={styles.labelStyle}>
                      SERVICE TITAN ACCOUNT ID
                      <ErrorMessage
                        component='span'
                        name='service_titan_client_id'
                      />
                    </label>
                    <Field
                      autoFocus={true}
                      className={`form-control h-38 ${styles.formField}`}
                      type='text'
                      name='service_titan_client_id'
                      placeholder='Service Titan Account Id'
                      disabled
                    />
                  </div>

                  <button type='submit' className={styles.CRMSubmit}>
                    {postCRMMappingResponse.isLoading ? (
                      <Loading loaderText='Please wait' />
                    ) : (
                      <>Submit</>
                    )}
                  </button>
                  <p className={styles.formInfo}>
                    By proceeding you agree to our terms of service
                  </p>
                </Form>
              );
            }}
          </Formik>
        </Container>
      )}
    </>
  );
}
type GetCRMGoogleClientsMappingResponse = {
  google_client_account_id: string;
  google_client_account_name: string;
  google_manager_account_id: string;
  fulcrum_email: string;
  google_email: string;
};

type GetGoogleCRMMappingByClientResponse = {
  google_client_id: string;
  crm_client_name: string;
  fulcrum_email: string;
  fb_client_id: string;
  service_titan_client_id: string;
};

type GetCRMFBClientsMappingResponse = {
  fulcrum_email: string;
  fb_email: string;
  fb_client_account_id: string;
  fb_manager_account_id: string;
  fb_client_account_name: string;
};
type GetAllDefaultClientsResponse = {
  data: Array<GetAllDefaultClientsResData>;
};
type GetAllDefaultClientsResData = {
  tenantid: number;
  clientname: string;
  db_name: string;
};
type options = {
  value: string | number;
  label: string | number;
};
type GetCRMBingClientsMappingResponse = {
  bing_client_account_id: string;
  bing_client_account_name: string;
  bing_manager_account_id: string;
  fulcrum_email: string;
  bing_email: string;
};
type GetCRMYelpClientsMappingResponse = {
  yelp_business_name: string;
  yelp_business_id: string;
  fulcrum_email: string;
};
