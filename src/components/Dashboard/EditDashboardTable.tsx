import React, { forwardRef, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik, useField } from 'formik';
import DatePicker from 'react-datepicker';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import * as Yup from 'yup';
import { useUpdateDashboardLogsMutation } from 'services/dashboardApi';
import { toast } from 'react-toastify';
import Loading from 'shared/Loading';
export default function EditDashboardTable(editModelData: any) {
  const [fieldsData, setFieldsData] = useState<LooseObject>(
    editModelData.editModelData
  );
  const navigate = useNavigate();
  const [UpdateDashboardLogsAction, UpdateDashboardLogsResponse] =
    useUpdateDashboardLogsMutation();

  const [conditionDate, setconditionDate] = useState<Date | null>(
    new Date(fieldsData?.condition_date)
  );

  // const [startDate, setStartDate] = useState<string | null>('');

  // const dateChange = date => {
  //   setconditionDate(date);
  //   let day = date.getDate();
  //   let month = date.getMonth() + 1;
  //   let year = date.getFullYear();
  //   let conditionDateFormatted = `${year}-${month}-${day}`;
  //   setStartDate(conditionDateFormatted);
  // };

  const dashboardUpdateSchema = Yup.object().shape({
    segment: Yup.string().nullable().required('This field is required'),
    metric: Yup.string().nullable().required('This field is required'),
    of: Yup.string().nullable().required('This field is required'),
    had_condition: Yup.string().nullable().required('This field is required'),
    condition_date: Yup.string().nullable().required('This field is required'),
    action_taken: Yup.string().nullable().required('This field is required'),
    agree: Yup.string().nullable().required('This field is required'),
    on: Yup.string().nullable().required('This field is required'),
    service_titan_id: Yup.string().nullable().required('This field is required')
  });
  const [formData, setFormData] = useState({
    segment: fieldsData?.segment,
    of: fieldsData?.of,
    metric: '',
    had_condition: fieldsData?.had_condition,
    condition_date: fieldsData?.condition_date,
    action_taken: fieldsData?.action_taken,
    agree: '',
    on: fieldsData?.on,
    service_titan_id: fieldsData?.service_titan_id
  });

  const UpdateDashboardEntry = async data => {
    try {
      const response: any = await UpdateDashboardLogsAction(data).unwrap();

      if (response) {
        toast.success(response);
        navigate('/dashboard');
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
              <h3 className={styles.addsConnectivityHead}>Edit Log</h3>
            </div>
          </Col>
          <div>
            <Col className='mx-auto' lg={8}>
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                validationSchema={dashboardUpdateSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, actions) => {
                  actions.resetForm({ values: formData });

                  UpdateDashboardEntry(values);
                  actions.setSubmitting(false);
                }}
              >
                {props => {
                  const { setFieldValue, errors } = props;
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
                            fieldName='segment'
                            label='Segments'
                            col={6}
                            value={
                              fieldsData?.segment &&
                              fieldsData?.segment.toLowerCase()
                            }
                            hasError={errors.segment}
                          />
                          <ReactSelectFormik
                            fields={[{ label: 'Capacity', value: 'Capacity' }]}
                            fieldName='metric'
                            label='Metric'
                            col={6}
                            value={fieldsData?.metric}
                            hasError={errors.metric}
                          />

                          <Col lg={4}>
                            <label className={styles2.labelStyle}>
                              Had Condition
                              <ErrorMessage
                                component='span'
                                name='had_condition'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control grayFormInputs h-38 ${styles.formField}`}
                              type='text'
                              name='had_condition'
                              defaultValue={fieldsData?.had_condition}
                              hasError={errors.had_condition}
                            />
                          </Col>
                          <Col lg={4}>
                            <label className={styles2.labelStyle}>
                              Of
                              <ErrorMessage component='span' name='of' />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control grayFormInputs h-38 ${styles.formField}`}
                              type='text'
                              name='of'
                              defaultValue={fieldsData?.of}
                              hasError={errors.of}
                            />
                          </Col>

                          <Col lg={4}>
                            <label className={styles2.labelStyle}>
                              Condition Date
                              <ErrorMessage
                                component='span'
                                name='condition_date'
                              />
                            </label>
                            <DatePicker
                              name='condition_date'
                              selected={conditionDate}
                              onChange={date => {
                                setconditionDate(date);
                                let day = date?.getDate();
                                let month = date && date?.getMonth() + 1;
                                let year = date?.getFullYear();
                                let conditionDateFormatted = `${year}-${month}-${day}`;
                                setFieldValue(
                                  'condition_date',
                                  conditionDateFormatted
                                );
                              }}
                              className={`grayFormInputs ${styles.EditDashboardDatepicker}`}
                              dateFormat='yyyy-MM-dd'
                            />
                          </Col>
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>On</label>
                            <ErrorMessage component='span' name='on' />
                            <Field
                              autoFocus={true}
                              className={`form-control  h-38 ${styles.formField}`}
                              type='text'
                              name='on'
                              defaultValue={fieldsData?.on}
                              disabled
                            />
                          </Col>
                          <ReactSelectFormik
                            fields={[
                              { label: 'no', value: 'no' },
                              { label: 'yes', value: 'yes' }
                            ]}
                            fieldName='agree'
                            label='Agree'
                            col={6}
                            value={fieldsData?.agree}
                            hasError={errors.agree}
                          />

                          <Col lg={12}>
                            <label className={styles2.labelStyle}>
                              Action Taken
                              <ErrorMessage
                                component='span'
                                name='action_taken'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control grayFormInputs h-38 ${styles.formField}`}
                              type='text'
                              name='action_taken'
                              defaultValue={fieldsData?.action_taken}
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={12}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {UpdateDashboardLogsResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : (
                            <>Update</>
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
