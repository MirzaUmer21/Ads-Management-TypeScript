import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useCreateSegmentRuleMutation } from 'services/rulesApi';
import Loading from 'shared/Loading';

export default function EditRulesSegmentTable(editModelData: any) {
  const [fieldsData, setFieldsData] = useState<LooseObject>(
    editModelData.editModelData
  );

  const navigate = useNavigate();

  const [CreateSegmentRuleAction, CreateSegmentRuleResponse] =
    useCreateSegmentRuleMutation();

  const ruleCreateSchema = Yup.object().shape({
    crm_client_name: Yup.string().nullable().required('This field is Required'),
    service_titan_id: Yup.string()
      .nullable()
      .required('This field is Required'),
    segment_name: Yup.string().nullable().required('This field is Required'),
    rollup_budget: Yup.string().nullable().required('This field is Required'),
    objective: Yup.string().nullable().required('This field is Required'),
    rollup_team: Yup.string().nullable().required('This field is Required'),
    rollup_cpa: Yup.string().nullable().required('This field is Required'),
    rollup_roas: Yup.string().nullable().required('This field is Required'),
    rollup_jobs_or_daily_hours: Yup.string()
      .nullable()
      .required('This field is Required')
  });

  const [formData, setFormData] = useState({
    crm_client_name: fieldsData?.crm_client_name,
    service_titan_id: fieldsData?.service_titan_id,
    segment_name: fieldsData?.segment_name,
    rollup_budget: fieldsData?.rollup_budget,
    objective: '',
    rollup_team: fieldsData?.rollup_team,
    rollup_cpa: fieldsData?.rollup_cpa,
    rollup_roas: fieldsData?.rollup_roas,
    rollup_jobs_or_daily_hours: fieldsData?.rollup_jobs_or_daily_hours
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
  if (!fieldsData) return <></>;

  return (
    <>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>Edit Rules</h3>
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

                  CreateSegmentRuleEntry(values);
                  actions.setSubmitting(false);
                }}
              >
                {props => {
                  const { errors } = props;
                  return (
                    <Form>
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
                            value={
                              fieldsData?.segment_name &&
                              fieldsData?.segment_name.toLowerCase()
                            }
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
                              defaultValue={fieldsData?.rollup_budget}
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
                                value: 'rpportunities'
                              },
                              { label: 'Revenue', value: 'revenue' }
                            ]}
                            fieldName='objective'
                            label='Objective'
                            col={4}
                            value={
                              fieldsData?.Objective &&
                              fieldsData?.Objective.toLowerCase()
                            }
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
                              defaultValue={fieldsData?.rollup_team}
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
                              defaultValue={fieldsData?.rollup_cpa}
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
                              defaultValue={fieldsData?.rollup_roas}
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
                              defaultValue={
                                fieldsData?.rollup_jobs_or_daily_hours
                              }
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {CreateSegmentRuleResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : (
                            <>UPDATE RULE</>
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
