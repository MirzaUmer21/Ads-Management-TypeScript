import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import * as Yup from 'yup';
import { useUpdateCapacityMembersMutation } from 'services/capacityApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Loading from 'shared/Loading';
import { useAppSelector } from 'app/hooks';
export default function EditCapacity(editModelData: any) {
  const [fieldsData, setFieldsData] = useState<LooseObject>(
    editModelData.editModelData
  );
  const navigate = useNavigate();
  const [UpdateCapacityMembersAction, UpdateCapacityMembersResponse] =
    useUpdateCapacityMembersMutation();
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const [formData, setFormData] = useState({
    userid: fieldsData.userid,
    max: fieldsData?.max,
    unit: fieldsData?.unit,
    time: fieldsData?.time,
    segment: fieldsData?.segment
  });
  const capacityUpdateSchema = Yup.object().shape({
    userid: Yup.string().nullable().required('Field Required'),
    max: Yup.string().nullable().required('Field Required'),
    unit: Yup.string().nullable().required('Field Required'),
    time: Yup.string().nullable().required('Field Required'),
    segment: Yup.string().nullable().required('Field Required')
  });
  const UpdateCapacityMembers = async (data: any) => {
    let dataArray: Array<any> = [];
    dataArray.push(data);
    const reqdata = {
      db: activeCRMClient ? activeCRMClient.crm_client_name : '',
      bodyData: dataArray
    };
    try {
      const response: any = await UpdateCapacityMembersAction(reqdata).unwrap();
      if (response.message === 'OK') {
        toast.success('Update Successfully');

        navigate('/capacity');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  if (!fieldsData) return <></>;
  return (
    <Container>
      <Row className='mb-4'>
        <Col lg={12} className='mt-5 mb-5'>
          <div className={styles.AdsContainer}>
            <h3 className={styles.addsConnectivityHead}>Edit Capacity</h3>
          </div>
        </Col>
        <div>
          <Col className='mx-auto' lg={8}>
            <Formik
              enableReinitialize={true}
              initialValues={formData}
              validationSchema={capacityUpdateSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(values, actions) => {
                UpdateCapacityMembers(values);
                actions.resetForm({ values: formData });
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
                            { label: 'Ignore', value: 'ignore' }
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
                        <Col lg={6}>
                          <label className={styles2.labelStyle}>
                            Name
                            <ErrorMessage component='span' name='user_name' />
                          </label>
                          <Field
                            autoFocus={true}
                            className={`form-control  h-38 ${styles.formField}`}
                            type='text'
                            name='user_name'
                            value={fieldsData?.user_name}
                            disabled
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col lg={12}>
                      <Row>
                        <Col lg={4}>
                          <label className={styles2.labelStyle}>
                            MAX
                            <ErrorMessage component='span' name='max' />
                          </label>
                          <Field
                            autoFocus={true}
                            className={`form-control form-control-gray h-38 ${styles.formField}`}
                            type='text'
                            name='max'
                            defaultValue={fieldsData?.max}
                          />
                        </Col>
                        <ReactSelectFormik
                          fields={[
                            { label: 'Hours', value: 'hours' },
                            { label: 'Job', value: 'job' }
                          ]}
                          fieldName='unit'
                          label='UNIT'
                          col={4}
                          value={fieldsData?.unit}
                          hasError={errors.unit}
                        />
                        <ReactSelectFormik
                          fields={[{ label: '/day', value: 'day' }]}
                          fieldName='time'
                          label='TIME'
                          col={4}
                          value={fieldsData?.time.replace('/', '')}
                          hasError={errors.time}
                        />
                      </Row>
                    </Col>
                    <Col lg={12}>
                      <Button type='submit' className='ModelCustomBtn'>
                        {UpdateCapacityMembersResponse.isLoading ? (
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
  );
}
interface LooseObject {
  [key: string]: string;
}
