import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';

import ReactSelectFormik from 'shared/ReactSelectFormik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { toast } from 'react-toastify';
import { useAppSelector } from 'app/hooks';
import Loading from 'shared/Loading';
import { useAssignObjectivesMutation } from 'services/objectivesApi';

export default function AssignObjectives({
  fbCampaigns,
  googleCampaigns,
  bingCampaigns
}: AssignObjectivesProps) {
  const navigate = useNavigate();

  const [activeAccountName, setactiveAccountName] = useState('');

  let allCampaignsOptions: Array<options> = [];
  let allClientsOptions: Array<options> = [];

  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const email = useAppSelector(state => state.authentication.email);

  const campaignsAssignSchema = Yup.object().shape({
    segment: Yup.string().nullable().required('Field is required'),
    campaign_id: Yup.string().nullable().required('Field is required'),
    account: Yup.string().nullable().required('Field is required'),
    budget_shift: Yup.string().nullable().required('Field is required'),
    cpa: Yup.string().nullable().required('Field is required')
  });

  const [formData, setFormData] = useState({
    fulcrum_email: email,
    client_name: activeCRMClient?.crm_client_name,
    segment: '',
    account: '',
    ad_account_id: '',
    campaign_id: '',
    cpa: '',
    budget_shift: '',
    objective: ''
  });

  const [assignObjectivesAction, assignObjectivesResponse] =
    useAssignObjectivesMutation();

  const [ActiveAccount, setActiveAccount] = useState<Array<any> | null>(null);
  const AllClients = useAppSelector(state => state.clientsData.AllClients);

  const createObjectiveEntry = async data => {
    try {
      const response: any = await assignObjectivesAction(data).unwrap();

      if (response) {
        toast.success(response.message);
        navigate('/objectives');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  useEffect(() => {
    if (activeAccountName === 'fb') {
      setActiveAccount(fbCampaigns);
    } else if (activeAccountName === 'google') {
      setActiveAccount(googleCampaigns);
    } else if (activeAccountName === 'bing') {
      setActiveAccount(bingCampaigns);
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

          createObjectiveEntry(values);
          actions.setSubmitting(false);
        }}
      >
        {props => {
          const { setFieldValue, errors } = props;
          allCampaignsOptions = [];
          ActiveAccount &&
            ActiveAccount.map((elem, index) => {
              const campaign_name: string | number = !elem.campaign_name
                ? elem.name
                : elem.campaign_name;
              const campaign_id: string | number = !elem.campaign_id
                ? elem.campaignid
                : elem.campaign_id;
              if (campaign_id) {
                const temp = {
                  value: campaign_id,
                  label: campaign_name
                };
                allCampaignsOptions.push(temp);
              }
              return null;
            });
          allClientsOptions = [];
          AllClients &&
            AllClients.map((elem, index) => {
              const temp = {
                value: elem.crm_client_name.toLowerCase(),
                label: elem.crm_client_name
              };
              allClientsOptions.push(temp);

              return null;
            });
          return (
            <Form>
              <Container>
                <Row className='mb-4'>
                  <Col lg={12} className='mt-5 mb-5'>
                    <div className={styles.AdsContainer}>
                      <h3 className={styles.addsConnectivityHead}>
                        Assign Objectives
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
                              { label: 'Install', value: 'install' }
                            ]}
                            fieldName='segment'
                            label='Segments'
                            col={6}
                            hasError={errors.segment}
                          />

                          <ReactSelectFormik
                            fields={[
                              { label: 'Opportunity', value: 'Opportunity' },
                              { label: 'Revenue', value: 'Revenue' }
                            ]}
                            fieldName='objective'
                            label='objective'
                            col={6}
                            hasError={errors.objective}
                          />
                          <ReactSelectFormik
                            fields={[
                              { label: 'Facebook', value: 'fb' },
                              { label: 'Google', value: 'google' },
                              { label: 'Bing', value: 'bing' }
                            ]}
                            fieldName='account'
                            label='account'
                            col={6}
                            hasError={errors.account}
                            onChange={choice => {
                              if (choice.value === 'google') {
                                setFieldValue(
                                  'ad_account_id',
                                  activeCRMClient?.google_client_id
                                );
                              } else if (choice.value === 'fb') {
                                setFieldValue(
                                  'ad_account_id',
                                  activeCRMClient?.fb_client_id
                                );
                              } else if (choice.value === 'bing') {
                                setFieldValue(
                                  'ad_account_id',
                                  activeCRMClient?.bing_client_id
                                );
                              }
                              setFieldValue('campaign_id', '');

                              setactiveAccountName(choice.value);
                            }}
                          />
                          <ReactSelectFormik
                            fields={allCampaignsOptions}
                            fieldName='campaign_id'
                            label='Campaigns'
                            col={6}
                            hasError={errors.campaign_id}
                            stateCampaignChange={setFieldValue}
                          />

                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              BUDGET
                              <ErrorMessage component='span' name='budget' />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control  h-38 ${styles.formField}`}
                              type='text'
                              name='budget'
                            />
                          </Col>
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              BUDGET SHIFT
                              <ErrorMessage
                                component='span'
                                name='budget_shift'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control  h-38 ${styles.formField}`}
                              type='text'
                              name='budget_shift'
                            />
                          </Col>
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              CPA
                              <ErrorMessage component='span' name='cpa' />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control  h-38 ${styles.formField}`}
                              type='text'
                              name='cpa'
                            />
                          </Col>

                          <Field
                            autoFocus={true}
                            className={`form-control h-38 ${styles.formField}`}
                            type='hidden'
                            name='ad_account_id'
                          />
                        </Row>
                      </Col>

                      <Col lg={12} className={styles.fieldContainer}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {assignObjectivesResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : (
                            <>Assign Objective</>
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
interface AssignObjectivesProps {
  fbCampaigns: Array<any>;
  googleCampaigns: Array<any>;
  bingCampaigns: Array<any>;
}
