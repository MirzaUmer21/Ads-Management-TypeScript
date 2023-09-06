import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCreateSegmentRuleMutation } from 'services/rulesApi';
import { useGetAllDefaultClientsMutation } from 'services/crmApi';
import { useAppSelector } from 'app/hooks';
import Loading from 'shared/Loading';

export default function AddRulesSegmentTable() {
  // const [fieldsData, setFieldsData] = useState<LooseObject>();

  const navigate = useNavigate();
  // console.log(' fieldsData segments rules ', fieldsData);

  const [CreateSegmentRuleAction, CreateSegmentRuleResponse] =
    useCreateSegmentRuleMutation();

  const [getAllDefaultClientsAction, getAllDefaultClientsResponse] =
    useGetAllDefaultClientsMutation();

  const [CRMDefaultClients, setCRMDefaultClients] = useState<
    Array<GetAllDefaultClientsResData>
  >([]);
  let clientsOptions: Array<options> = [];

  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );

  const ruleCreateSchema = Yup.object().shape({
    crm_client_name: Yup.string().nullable().required('Field is Required'),
    service_titan_id: Yup.string().nullable().required('Field is Required'),
    segment_name: Yup.string().nullable().required('Field is Required'),
    rollup_budget: Yup.string().nullable().required('Field is Required'),
    objective: Yup.string().nullable().required('Field is Required'),
    rollup_team: Yup.string().nullable().required('Field is Required'),
    rollup_cpa: Yup.string().nullable().required('Field is Required'),
    rollup_roas: Yup.string().nullable().required('Field is Required'),
    rollup_jobs_or_daily_hours: Yup.string()
      .nullable()
      .required('Field is Required')
  });

  const [formData, setFormData] = useState({
    crm_client_name: activeCRMClient?.crm_client_name,
    service_titan_id: activeCRMClient?.service_titan_client_id,
    segment_name: '',
    rollup_budget: '',
    objective: '',
    rollup_team: '',
    rollup_cpa: '',
    rollup_roas: '',
    rollup_jobs_or_daily_hours: ''
  });

  const CreateSegmentRuleEntry = async data => {
    try {
      const response: any = await CreateSegmentRuleAction(data).unwrap();

      if (response) {
        toast.success(response);
        navigate('/rules');
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

  useEffect(() => {
    GetAllDefaultClients();
  }, []);

  return (
    <>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>Add Segment Rule</h3>
            </div>
          </Col>
          <div>
            <Col className='mx-auto' lg={8}>
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                validationSchema={ruleCreateSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, actions) => {
                  actions.resetForm({ values: formData });
                  // console.log(values);
                  CreateSegmentRuleEntry(values);
                  actions.setSubmitting(false);
                }}
              >
                {props => {
                  const { setFieldValue, isValid, errors } = props;
                  clientsOptions = [];
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
                      {/* <Col lg={12}>
                        <Row>
                          <ReactSelectFormik
                            fields={clientsOptions}
                            fieldName='crm_client_name'
                            label='CLIENT NAME'
                            serviceTitanChange={setFieldValue}
                            hasError={errors.crm_client_name}
                            col={6}
                          />

                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                            CLIENT NAME
                              <ErrorMessage
                                component='span'
                                name='crm_client_name'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='crm_client_name'
                              placeholder='Client Name'
                              value={activeCRMClient?.crm_client_name}
                              hidden
                            />
                          </Col>

                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              SERVICE TITAN ACCOUNT ID
                              <ErrorMessage
                                component='span'
                                name='service_titan_id'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='service_titan_id'
                              placeholder='Service Titan Account ID'
                              value={activeCRMClient?.service_titan_client_id}
                              hidden
                            />
                          </Col>
                        </Row>
                      </Col> */}

                      <Col lg={12}>
                        <Row>
                          <ReactSelectFormik
                            fields={[
                              { label: 'Service', value: 'service' },
                              { label: 'Sales', value: 'sales' },
                              { label: 'Install', value: 'install' },
                              { label: 'Ignore', value: 'ignore' },
                              { label: 'All', value: 'all' }
                            ]}
                            fieldName='segment_name'
                            label='Segments'
                            col={6}
                            hasError={errors.segment_name}
                          />
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              ROLLUP BUDGET
                              <ErrorMessage
                                component='span'
                                name='rollup_budget'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='rollup_budget'
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12}>
                        <Row>
                          <ReactSelectFormik
                            fields={[
                              {
                                label: 'Opportunities',
                                value: 'Opportunities'
                              },
                              { label: 'Revenue', value: 'Revenue' }
                            ]}
                            fieldName='objective'
                            label='Objective'
                            col={4}
                            hasError={errors.objective}
                          />
                          <Col lg={4}>
                            <label className={styles2.labelStyle}>
                              ROLLUP TEAM
                              <ErrorMessage
                                component='span'
                                name='rollup_team'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='rollup_team'
                            />
                          </Col>
                          <Col lg={4}>
                            <label className={styles2.labelStyle}>
                              ROLLUP CPA
                              <ErrorMessage
                                component='span'
                                name='rollup_cpa'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='rollup_cpa'
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12}>
                        <Row>
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              ROLLUP ROAS
                              <ErrorMessage
                                component='span'
                                name='rollup_roas'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='rollup_roas'
                            />
                          </Col>

                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              ROLLUP JOBS OR DAILY HOURS
                              <ErrorMessage
                                component='span'
                                name='rollup_jobs_or_daily_hours'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='rollup_jobs_or_daily_hours'
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {CreateSegmentRuleResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : (
                            <>ADD RULE</>
                          )}
                        </Button>
                      </Col>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
}
interface LooseObject {
  [key: string]: string;
}
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
