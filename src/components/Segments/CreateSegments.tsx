import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import SelectField from 'shared/SelectField';
import InputField from 'shared/InputField';
import { AssignCapacityOptions } from 'static/AssignCapacityOptions';
import capacityStyles from 'css/AssignCapacity.module.css';
import { useMediaQuery } from 'react-responsive';
export default function CreateSegments() {
  const [isActive, setisActive] = useState<Array<any>>([2]);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });

  function setIsActive(id: number) {
    let temp: any = [...isActive];
    if (temp.includes(id)) {
      temp = temp.filter(function (item: any) {
        return item !== id;
      });
    } else temp.push(id);
    setisActive(temp);
  }
  return (
    <Container>
      <Row className='mb-4'>
        <Col lg={12} className='mt-5 mb-5'>
          <div className={styles.AdsContainer}>
            <h3 className={styles.addsConnectivityHead}>Create Segments</h3>
          </div>
        </Col>
        <div className={styles.formContainer}>
          <Col className='mx-auto' lg={8}>
            <Col lg={12} className={styles.fieldContainer}>
              <Row>
                <SelectField
                  fieldSelect
                  col={6}
                  disabled={false}
                  fieldName='segments'
                  fields={[{ label: 'Service', value: '1' }]}
                  label='Segments'
                  onChange={(val: any) => {
                    // console.log(val);
                  }}
                  placeholder='Select segment'
                  value={'1'}
                />
                <SelectField
                  fieldSelect
                  col={6}
                  disabled={false}
                  fieldName='adAccount'
                  fields={[
                    {
                      label: 'Google Ads',
                      value: '1',
                      image: '/images/accounts/google.svg'
                    }
                  ]}
                  label='Ad Account'
                  onChange={(val: any) => {
                    // console.log(val);
                  }}
                  placeholder='Select account'
                  value={'1'}
                />
              </Row>
            </Col>
            <Col lg={12} className={styles.fieldContainer}>
              <InputField
                col={12}
                label='Budget'
                name='budget'
                placeholder='Enter Amount'
                type='text'
              />
            </Col>
            <Col lg={12}>
              <p
                style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#8992A3',
                  marginBottom: '10px'
                }}
              >
                SELECT TEAM
              </p>
              <Col lg={12}>
                {AssignCapacityOptions.map((el, idx) => {
                  return isTabletOrMobile ? (
                    <>
                      <div className='form-group '>
                        <Card
                          className={`responsiveTableCards mb-4 ${
                            isActive.includes(el.id) &&
                            styles.createSegmentcheckboxSelectedCard
                          } `}
                          style={{ width: '100%' }}
                        >
                          <Card.Body>
                            <Card.Title>
                              <div className='d-flex align-items-center '>
                                <Form.Check
                                  style={{ marginRight: '15px' }}
                                  onClick={e => setIsActive(el.id)}
                                  type='checkbox'
                                  defaultChecked={
                                    isActive.includes(el.id) ? true : false
                                  }
                                  id={`${el.name}`}
                                />
                                <span
                                  className={` ${capacityStyles.capacityBoxImage}`}
                                >
                                  <img src={el.image} alt='$$$' />
                                </span>
                                <div
                                  className={
                                    isActive.includes(el.id)
                                      ? capacityStyles.capacitySelectedDesc
                                      : ''
                                  }
                                >
                                  {el.description}
                                </div>
                              </div>
                            </Card.Title>
                          </Card.Body>
                        </Card>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='form-group '>
                        <div
                          className={
                            isActive.includes(el.id)
                              ? styles.createSegmentcheckboxSelected
                              : styles.createSegmentcheckbox
                          }
                        >
                          <div className='d-flex'>
                            <span
                              style={{
                                marginRight: '15px',
                                marginTop: '5px'
                              }}
                            >
                              <Form.Check
                                onClick={e => setIsActive(el.id)}
                                type='checkbox'
                                defaultChecked={
                                  isActive.includes(el.id) ? true : false
                                }
                                id={`${el.name}`}
                              />
                            </span>
                            <span
                              className={`${capacityStyles.capacityBoxImage}`}
                            >
                              <img src={el.image} alt='$$$' />
                            </span>
                            <span
                              className={capacityStyles.capacityChecboxText}
                            >
                              <span
                                className={
                                  isActive.includes(el.id)
                                    ? capacityStyles.capacitySelectedDesc
                                    : ''
                                }
                              >
                                {el.description}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </Col>
            </Col>

            <Col lg={12} className={styles.fieldContainer}>
              <Button
                style={{ background: '#5600D6 ' }}
                className='ModelCustomBtn'
              >
                Create Segment
              </Button>
            </Col>
          </Col>
        </div>
      </Row>
    </Container>
  );
}
