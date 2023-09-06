import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import SelectField from 'shared/SelectField';
import InputField from 'shared/InputField';
import { AssignCapacityOptions } from 'static/AssignCapacityOptions';
import capacityStyles from 'css/AssignCapacity.module.css';
import { useMediaQuery } from 'react-responsive';

export default function EditSegment(editModelData: any) {
  const [fieldsData, setFieldsData] = useState<LooseObject>();
  const [isActive, setisActive] = useState<Array<any>>([2]);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  useEffect(() => {
    var data: LooseObject = {};
    editModelData.editModelData?.content.map((elem: any, index: any) => {
      const res = elem.SegmentName.replace(/ /g, '');
      data[res] = elem.SegmentData;
      return 0;
    });
    if (data) setFieldsData(data);
  }, []);

  function setIsActive(id: number) {
    let temp: any = [...isActive];
    if (temp.includes(id)) {
      temp = temp.filter(function (item: any) {
        return item !== id;
      });
    } else temp.push(id);
    setisActive(temp);
  }
  if (!fieldsData) return <></>;
  return (
    <>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>Edit Segments</h3>
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
                    fieldName='adAccount'
                    fields={[
                      {
                        label: 'Google Ads',
                        value: 'Google Ads',
                        image: '/images/accounts/google.svg'
                      },
                      {
                        label: 'Microsoft Bing Ads',
                        value: 'Microsoft Bing Ads',
                        image: '/images/accounts/microsoft.svg'
                      },
                      {
                        label: 'Yelp Ads',
                        value: 'Yelp Ads',
                        image: '/images/accounts/yelp_burst-1.svg'
                      }
                    ]}
                    label='Ad Account'
                    onChange={(val: any) => {
                      // console.log(val);
                    }}
                    placeholder='Select account'
                    value={fieldsData?.adaccount}
                  />
                  <InputField
                    col={6}
                    label='Budget'
                    name='budget'
                    placeholder='Enter Amount'
                    type='text'
                    value={fieldsData?.AssignedBudget}
                  />
                </Row>
              </Col>
              <Col lg={12} className={styles.fieldContainer}></Col>
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
                  Edit Segment
                </Button>
              </Col>
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
