import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';

import { usePostAssignCampaignsMutation } from 'services/campaignsApi';

import { toast } from 'react-toastify';
import { useAppSelector } from 'app/hooks';
import Loading from 'shared/Loading';

export default function AssignCampaigns({
  fbCampaigns,
  googleCampaigns,
  bingCampaigns
}: AssignCampaignsProps) {
  const navigate = useNavigate();
  const [activeAccountName, setactiveAccountName] = useState('');
  let allCampaignsOptions: Array<options> = [];
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );

  const campaignsAssignSchema = Yup.object().shape({
    segments: Yup.string().nullable().required('Field is required'),
    // ad_account_id: Yup.string().nullable().required('Field is required'),
    // campaign_name: Yup.string().nullable().required('Field is required'),
    account: Yup.string().nullable().required('Field is required')
  });

  const [formData, setFormData] = useState({
    client_name: '',
    campaign_id: '',
    campaign_name: '',
    segments: '',
    account: '',
    ad_account_id: ''
  });

  const [assignCampaignsAction, AssignCampaignResponse] =
    usePostAssignCampaignsMutation();

  const id_token = useAppSelector(state => state.authentication.id_token);
  const activeGoogleClient = useAppSelector(
    state => state.googleAccount.ActiveClient
  );
  const activeFbClient = useAppSelector(
    state => state.facebookAccount.ActiveClient
  );
  const activeBingClient = useAppSelector(
    state => state.bingAccount.ActiveClient
  );
  const activeYelpClient = useAppSelector(
    state => state.yelpAccount.activeProgram
  );

  const [ActiveAccount, setActiveAccount] = useState<Array<any> | null>(null);
  const [campaignsDisable, setcampaignsDisable] = useState(false);

  const createCampaignsEntry = async data => {
    let temp = data;
    if (temp.account === 'google') {
      temp = data;
      temp.ad_account_id = activeGoogleClient;
      temp.client_name = activeCRMClient?.crm_client_name;
      createCampaignsReq(temp);
    } else if (temp.account === 'fb') {
      temp = data;
      temp.ad_account_id = activeFbClient;
      temp.client_name = activeCRMClient?.crm_client_name;
      createCampaignsReq(temp);
    } else if (temp.account === 'bing') {
      temp = data;
      temp.ad_account_id = activeBingClient;
      temp.client_name = activeCRMClient?.crm_client_name;
      createCampaignsReq(temp);
    } else if (temp.account === 'yelp') {
      temp = data;
      if (activeYelpClient) {
        temp.ad_account_id = activeYelpClient.campaign_id;
        temp.client_name = activeCRMClient?.crm_client_name;
        temp.campaign_name = activeYelpClient.yelp_business_name;
        temp.campaign_id = activeYelpClient.campaign_id;
        createCampaignsReq(temp);
      } else {
        toast.error('Please connect to a program.');
      }
    }
  };
  const createCampaignsReq = async (reqData: any) => {
    try {
      const response: any = await assignCampaignsAction({
        data: reqData,
        id_token: id_token
      }).unwrap();

      if (response) {
        toast.success(response);
        navigate('/campaigns');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  useEffect(() => {
    if (activeAccountName === 'fb') {
      setcampaignsDisable(false);
      setActiveAccount(fbCampaigns);
    } else if (activeAccountName === 'google') {
      setcampaignsDisable(false);
      setActiveAccount(googleCampaigns);
    } else if (activeAccountName === 'bing') {
      setcampaignsDisable(false);
      setActiveAccount(bingCampaigns);
    } else if (activeAccountName === 'yelp') {
      setcampaignsDisable(true);
    }
  }, [activeAccountName]);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={formData}
        validationSchema={campaignsAssignSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          actions.resetForm({ values: formData });
          createCampaignsEntry(values);
          actions.setSubmitting(false);
        }}
      >
        {props => {
          const { setFieldValue, errors } = props;
          allCampaignsOptions = [];
          ActiveAccount &&
            ActiveAccount.map((elem, index) => {
              const name: string | number = !elem.name
                ? elem.campaign_name
                : elem.name;
              const campaign_id: string | number = !elem.campaignid
                ? elem.campaign_id
                : elem.campaignid;
              if (campaign_id) {
                const temp = {
                  value: name,
                  label: name,
                  id: campaign_id
                };
                allCampaignsOptions.push(temp);
              }
              return null;
            });
          return (
            <Form>
              <Container>
                <Row className='mb-4'>
                  <Col lg={12} className='mt-5 mb-5'>
                    <div className={styles.AdsContainer}>
                      <h3 className={styles.addsConnectivityHead}>
                        Assign Campaigns
                      </h3>
                    </div>
                  </Col>
                  <div className={styles.formContainer}>
                    <Col className='mx-auto' lg={8}>
                      <Col lg={12} className={styles.fieldContainer}>
                        <Row>
                          <ReactSelectFormik
                            fields={[
                              { label: 'Service', value: 'service' },
                              { label: 'Sales', value: 'sales' },
                              { label: 'Install', value: 'install' },
                              { label: 'Ignore', value: 'ignore' }
                            ]}
                            fieldName='segments'
                            label='Segments'
                            col={6}
                            hasError={errors.segments}
                          />
                          <ReactSelectFormik
                            fields={[
                              { label: 'Facebook', value: 'fb' },
                              { label: 'Google', value: 'google' },
                              { label: 'Bing', value: 'bing' },
                              { label: 'Yelp', value: 'yelp' }
                            ]}
                            fieldName='account'
                            label='account'
                            col={6}
                            hasError={errors.account}
                            onChange={choice => {
                              setactiveAccountName(choice.value);
                            }}
                          />

                          {!campaignsDisable && (
                            <ReactSelectFormik
                              fields={allCampaignsOptions}
                              fieldName='campaign_name'
                              label='Campaigns'
                              col={12}
                              hasError={errors.campaign_name}
                              stateCampaignChange={setFieldValue}
                            />
                          )}

                          <Field
                            autoFocus={true}
                            className={`form-control h-38 ${styles.formField}`}
                            type='hidden'
                            name='campaign_id'
                          />
                        </Row>
                      </Col>

                      <Col lg={12} className={styles.fieldContainer}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {AssignCampaignResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : (
                            <>Assign Campaign</>
                          )}
                        </Button>
                      </Col>
                    </Col>
                  </div>
                </Row>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

type options = {
  value: string | number;
  label: string | number;
};
interface AssignCampaignsProps {
  fbCampaigns: Array<any>;
  googleCampaigns: Array<any>;
  bingCampaigns: Array<any>;
}
