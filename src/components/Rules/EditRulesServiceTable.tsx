import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import { useNavigate } from 'react-router-dom';
import styles2 from 'css/Accounts.module.css';

import { useCreateServiceRuleMutation } from 'services/rulesApi';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useAppSelector } from 'app/hooks';
import Loading from 'shared/Loading';

export default function EditRulesServiceTable(editModelData: any) {
  const [fieldsData, setFieldsData] = useState<LooseObject>(
    editModelData.editModelData
  );
  const navigate = useNavigate();

  const [CreateServiceRuleAction, CreateServiceRuleResponse] =
    useCreateServiceRuleMutation();

  const ruleCreateSchema = Yup.object().shape({
    crm_client_name: Yup.string().nullable().required('Field is Required'),
    ad_account_id: Yup.string().nullable().required('Field is Required'),
    service_titan_id: Yup.string().nullable().required('Field is Required'),
    service_name: Yup.string().nullable().required('Field is Required'),
    rollup_campaigns: Yup.string().nullable().required('Field is Required'),
    rollup_budget: Yup.string().nullable().required('Field is Required'),
    rollup_cpa: Yup.string().nullable().required('Field is Required'),
    rollup_scalability: Yup.string().nullable().required('Field is Required')
  });

  // const activeGoogleAccount = useAppSelector(state => state.googleAccount);
  // const activeFBAccount = useAppSelector(state => state.facebookAccount);

  const [formData, setFormData] = useState({
    crm_client_name: fieldsData?.crm_client_name,
    ad_account_id: fieldsData?.ad_account_id,
    service_titan_id: fieldsData?.service_titan_id,
    service_name: fieldsData?.service_name,
    rollup_campaigns: fieldsData?.rollup_campaigns,
    rollup_budget: fieldsData?.rollup_budget,
    rollup_cpa: fieldsData?.rollup_cpa,
    rollup_scalability: fieldsData?.rollup_scalability
  });

  const CreateServiceRuleEntry = async data => {
    try {
      const response: any = await CreateServiceRuleAction(data).unwrap();

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

                  CreateServiceRuleEntry(values);
                  actions.setSubmitting(false);
                }}
              >
                {props => {
                  const { errors } = props;
                  return (
                    <Form>
                      <Col lg={12}>
                        <Row>
                          {/* <ReactSelectFormik
                            fields={[
                              {
                                label: activeGoogleAccount?.AccountTitle,
                                value: activeGoogleAccount?.ActiveClient
                              },
                              {
                                label: activeFBAccount?.AccountTitle,
                                value: activeFBAccount?.ActiveClient
                              }
                            ]}
                            fieldName='ad_account_id'
                            label='Ad Accounts'
                            col={6}
                            value={fieldsData?.ad_account_id}
                            hasError={errors.ad_account_id}
                          /> */}
                          <ReactSelectFormik
                            fields={[
                              { label: 'Service', value: 'service' },
                              { label: 'Sales', value: 'sales' },
                              { label: 'Install', value: 'install' },
                              { label: 'Ignore', value: 'ignore' },
                              { label: 'All', value: 'all' }
                            ]}
                            fieldName='service_name'
                            label='Service'
                            col={4}
                            value={
                              fieldsData?.service_name &&
                              fieldsData?.service_name.toLowerCase()
                            }
                            hasError={errors.service_name}
                          />
                          <Col lg={4}>
                            <label className={styles2.labelStyle}>
                              ROLLUP CAMPAIGNS
                              <ErrorMessage
                                component='span'
                                name='rollup_campaigns'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='rollup_campaigns'
                              defaultValue={fieldsData?.rollup_campaigns}
                            />
                          </Col>
                          <Col lg={4}>
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
                          <Col lg={6}>
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
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              ROLLUP SCALABILITY
                              <ErrorMessage
                                component='span'
                                name='rollup_scalability'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='rollup_scalability'
                              defaultValue={fieldsData?.rollup_scalability}
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={12}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {CreateServiceRuleResponse.isLoading ? (
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
