import React, { useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SelectField from 'shared/SelectField';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';
import capacityStyles from 'css/AssignCapacity.module.css';
import { useAppSelector } from 'app/hooks';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import Loading from 'shared/Loading';
import { useUpdateCapacityMembersMutation } from 'services/capacityApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
export default function CreateCapacity() {
  const capacityMembers = useAppSelector(
    state => state.capacity.capacityMembers
  );
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const navigate = useNavigate();
  const [UpdateCapacityMembersAction, UpdateCapacityMembersResponse] =
    useUpdateCapacityMembersMutation();
  const [isActive, setisActive] = useState<Array<any>>([]);
  const [searchInput, setSearchInput] = useState('');
  function setIsActive(id: number) {
    let temp: any = [...isActive];
    if (temp.includes(id)) {
      temp = temp.filter(function (item: any) {
        return item !== id;
      });
    } else temp.push(id);
    setisActive(temp);
  }
  const handleChange = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const updateCapacityMembers = async values => {
    let array: any = [];
    let temp = values;
    isActive.forEach(element => {
      temp = { ...temp, userid: element };
      array = [...array, temp];
    });

    const reqdata = {
      db: activeCRMClient ? activeCRMClient.crm_client_name : '',
      bodyData: array
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
  const capacityUpdateSchema = Yup.object().shape({
    max: Yup.string().nullable().required('Required'),
    unit: Yup.string().nullable().required('Required'),
    time: Yup.string().nullable().required('Required'),
    segment: Yup.string().nullable().required('Required')
  });
  const [formData, setFormData] = useState({
    max: '',
    unit: '',
    time: '',
    segment: ''
  });
  return (
    <Container>
      <Row className='mb-4'>
        <Col lg={12} className='mt-5 mb-2'>
          <div className={capacityStyles.AdsContainer}>
            <h3 className={capacityStyles.capacityHeadings}>Assign Capacity</h3>
          </div>
        </Col>
      </Row>
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={formData}
          validationSchema={capacityUpdateSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, actions) => {
            // actions.resetForm({ values: formData });
            // console.log(values);
            updateCapacityMembers(values);
            actions.setSubmitting(false);
          }}
        >
          {props => {
            const { errors } = props;
            return (
              <Form>
                <div className={styles.formContainer}>
                  <Col className='mx-auto' lg={8}>
                    <div className='mb-2'>
                      <Row>
                        <Col
                          lg={6}
                          className={`${capacityStyles.fielsWrap} assignCapacityCustomSelect`}
                        >
                          <ReactSelectFormik
                            fields={[
                              { label: 'Service', value: 'service' },
                              { label: 'Sales', value: 'sales' },
                              { label: 'Install', value: 'install' },
                              { label: 'Ignore', value: 'ignore' }
                            ]}
                            fieldName='segment'
                            col={12}
                            hasError={errors.segment}
                            placeholder='Segment'
                          />
                        </Col>

                        <Col
                          lg={6}
                          className={`${capacityStyles.fielsWrap} assignCapacityCustomSelect`}
                        >
                          <ReactSelectFormik
                            fields={[
                              { label: 'Job', value: 'job' },
                              { label: 'Hours', value: 'hours' }
                            ]}
                            fieldName='unit'
                            col={12}
                            hasError={errors.unit}
                            placeholder='Unit'
                          />
                        </Col>
                      </Row>
                    </div>
                    <div className='mb-2'>
                      <Row>
                        <Col
                          lg={6}
                          className={`${capacityStyles.fielsWrap} assignCapacityCustomSelect`}
                        >
                          <ReactSelectFormik
                            fields={[{ label: '/day', value: '/day' }]}
                            fieldName='time'
                            hasError={errors.time}
                            placeholder='Time'
                          />
                        </Col>

                        <Col
                          lg={6}
                          className={`${capacityStyles.fielsWrap} assignCapacityCustomSelect`}
                        >
                          <span className='errorFieldWithoutLabel'>
                            {errors.max}
                          </span>

                          <Field
                            autoFocus={true}
                            className={`form-control form-control-gray h-38 ${styles.formField}`}
                            type='text'
                            name='max'
                            placeholder='Max'
                          />
                        </Col>
                      </Row>
                    </div>
                    <Col lg={12}>
                      <Button type='submit' className='ModelCustomBtn'>
                        {/* {UpdateCapacityMembersResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : ( */}
                        <>Assign</>
                        {/* )} */}
                      </Button>
                    </Col>
                    {/* <Col lg={12}>
                        <Button
                          className={`${capacityStyles.CreateSegmentNameBtn} ${capacityStyles.filterItem}`}
                        >
                          Assign
                        </Button>
                      </Col> */}

                    <Col
                      lg={12}
                      className={`${capacityStyles.capacityFieldOption} ${capacityStyles.assignCapacityPopup} ${styles.segmentsMembersOption} customformCheck mt-3`}
                    >
                      <input
                        type='search'
                        placeholder='Search By Name'
                        onChange={handleChange}
                        value={searchInput}
                        className='tableSearchBar w-100 mb-3'
                        style={{ backgroundColor: '#F2F2F2', height: '40px' }}
                      />
                      <div
                        style={{
                          height:
                            capacityMembers.length > 6 ? '440px' : 'inherit'
                        }}
                        className={
                          capacityMembers.length > 6 ? 'tableScrollWrap' : ''
                        }
                      >
                        <div role='group' aria-labelledby='checkbox-group'>
                          {!capacityMembers.length ? (
                            <p>No Record Found.</p>
                          ) : (
                            capacityMembers
                              .filter(elem => {
                                if (searchInput === '') {
                                  return elem;
                                } else if (
                                  elem.user_name
                                    .toLowerCase()
                                    .includes(searchInput.toLowerCase())
                                ) {
                                  return elem;
                                }
                              })
                              .map((el, idx) => {
                                return (
                                  <>
                                    <div className='form-group '>
                                      <div
                                        className={
                                          isActive.includes(el.userid)
                                            ? styles.createSegmentcheckboxSelected
                                            : styles.createSegmentcheckbox
                                        }
                                      >
                                        <div className='d-flex full-width-box'>
                                          <span
                                            style={{
                                              marginRight: '15px',
                                              marginTop: '5px'
                                            }}
                                          >
                                            <input
                                              className='form-check-input'
                                              onClick={e =>
                                                setIsActive(el.userid)
                                              }
                                              type='checkbox'
                                              id={`${el.userid}`}
                                            />
                                          </span>
                                          <span
                                            className={`${capacityStyles.capacityBoxImage}`}
                                          >
                                            <img
                                              src='images/accounts/user_1.png'
                                              alt='$$$'
                                            />
                                          </span>
                                          <span
                                            className={
                                              capacityStyles.capacityChecboxText
                                            }
                                          >
                                            <span
                                              className={
                                                isActive.includes(el.userid)
                                                  ? capacityStyles.capacitySelectedDesc
                                                  : ''
                                              }
                                            >
                                              {el.user_name}
                                            </span>
                                          </span>
                                          <div className='segmentCapacity'>
                                            {el?.segment}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </>
                                );
                              })
                          )}
                        </div>
                      </div>
                    </Col>
                  </Col>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </Container>
  );
}
