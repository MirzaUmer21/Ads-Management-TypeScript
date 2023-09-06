import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import { useAppSelector } from 'app/hooks';
import Loading from 'shared/Loading';
import { useUpdateBudgetsMutation } from 'services/budgetApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function EditBudget(editModelData: any) {
  const [fieldsData, setFieldsData] = useState<LooseObject>(
    editModelData.editModelData
  );
  const navigate = useNavigate();

  let allClientsOptions: Array<any> = [];
  const AllClients = useAppSelector(state => state.clientsData.AllClients);
  const email = useAppSelector(state => state.authentication.email);
  const [budgetUpdateAction, budgetUpdateResponse] = useUpdateBudgetsMutation();
  const editBudgetSchema = Yup.object().shape({
    // fulcrum_email: Yup.string().nullable().required('Field is required'),
    // ad_account_id: Yup.string().nullable().required('Field is required'),
    account: Yup.string().nullable().required('Field is required'),
    segments: Yup.string().nullable().required('Field is required'),
    crm_client_name: Yup.string().nullable().required('Field is required'),
    estimated_scalability: Yup.string()
      .nullable()
      .required('Field is required'),
    cpa: Yup.string().nullable().required('Field is required'),
    budget: Yup.string().nullable().required('Field is required')
  });
  const [formData, setFormData] = useState({
    fulcrum_email: email,
    ad_account_id: fieldsData.ad_account_id,
    account: fieldsData.account,
    segments: fieldsData.segments,
    crm_client_name: fieldsData.crm_client_name,
    estimated_scalability: fieldsData.estimated_scalability,
    cpa: fieldsData.cpa,
    budget: fieldsData.budget,
    campaign_id: fieldsData.campaign_id
  });
  const UpdateBudget = async (data: any) => {
    try {
      const response: any = await budgetUpdateAction(data).unwrap();
      if (response) {
        toast.success(response.message);

        navigate('/budgets');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  if (!fieldsData) return <></>;

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={formData}
        validationSchema={editBudgetSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          actions.resetForm({ values: formData });
          UpdateBudget(values);
          actions.setSubmitting(false);
        }}
      >
        {props => {
          const { errors } = props;
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
                        Edit Budgets
                      </h3>
                    </div>
                  </Col>
                  <div className={styles.formContainer}>
                    <Col className='mx-auto' lg={8}>
                      <Col lg={12} className={styles.fieldContainer}>
                        <Row>
                          <ReactSelectFormik
                            fields={[
                              { label: 'Google Ads', value: 'google' },
                              { label: 'Facebook Ads', value: 'fb' },
                              { label: 'Microsoft Bing Ads', value: 'bing' },
                              { label: 'Yelp Ads', value: 'yelp' }
                            ]}
                            fieldName='account'
                            label='Ad Account'
                            col={6}
                            hasError={errors.account}
                            value={
                              fieldsData?.account &&
                              fieldsData?.account.toLowerCase()
                            }
                          />
                          <ReactSelectFormik
                            fields={[
                              { label: 'Service', value: 'service' },
                              { label: 'Sales', value: 'sales' },
                              { label: 'Install', value: 'install' }
                            ]}
                            fieldName='segments'
                            label='Segments'
                            col={6}
                            hasError={errors.segments}
                            value={
                              fieldsData?.segments &&
                              fieldsData?.segments.toLowerCase()
                            }
                          />
                          {allClientsOptions.length && (
                            <ReactSelectFormik
                              fields={allClientsOptions}
                              fieldName='crm_client_name'
                              label='Client'
                              col={6}
                              hasError={errors.crm_client_name}
                              value={
                                fieldsData?.client_name &&
                                fieldsData?.client_name
                              }
                            />
                          )}

                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              ESTIMATED SCALABILITY
                              <ErrorMessage
                                component='span'
                                name='estimated_scalability'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control  h-38 ${styles.formField}`}
                              type='text'
                              name='estimated_scalability'
                              defaultValue={fieldsData?.estimated_scalability}
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
                              defaultValue={fieldsData?.cpa}
                            />
                          </Col>
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
                              defaultValue={fieldsData?.budget}
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={12} className={styles.fieldContainer}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {budgetUpdateResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : (
                            <>Update</>
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
interface LooseObject {
  [key: string]: string;
}
