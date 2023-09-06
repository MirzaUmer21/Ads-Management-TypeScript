import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from 'css/AssignCapacity.module.css';
import SelectField from 'shared/SelectField';

export default function AssignAccountCapacity({ UserData }: userDataProps) {
  const [isActive, setisActive] = useState<Array<any>>([2]);
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
    <>
      <Container>
        <Row>
          <Col lg={12}>
            <div className={styles.capacityHeadingsSection}>
              <h3 className={styles.capacityHeadings}>Assign Capacity</h3>
              <p className={styles.capacityDesc}>
                Define what 100% capacity looks like, per team member, by
                segment.
              </p>
            </div>

            <div className={styles.capacityContent}>
              <Col className='mx-auto' lg={9} md={12}>
                <Row>
                  <Col
                    lg={3}
                    md={3}
                    sm={3}
                    className={`${styles.fielsWrap} assignCapacityCustomSelect`}
                  >
                    <SelectField
                      fieldSelect
                      disabled={false}
                      fieldName='segmentName'
                      fields={[{ label: 'Service', value: '1' }]}
                      onChange={(val: any) => {
                        //console.log(val);
                      }}
                      placeholder='Service'
                      value={'1'}
                    />
                  </Col>
                  <Col
                    lg={3}
                    md={3}
                    sm={3}
                    className={`${styles.fielsWrap} assignCapacityCustomSelect`}
                  >
                    <SelectField
                      fieldSelect
                      disabled={false}
                      fieldName='segmentName'
                      fields={[{ label: 'Hours', value: '1' }]}
                      //   label='Segment Name'
                      onChange={(val: any) => {
                        //console.log(val);
                      }}
                      placeholder='Hours'
                      value={'1'}
                    />
                  </Col>
                  <Col
                    lg={3}
                    md={3}
                    sm={3}
                    className={`${styles.fielsWrap} assignCapacityCustomSelect`}
                  >
                    <SelectField
                      fieldSelect
                      disabled={false}
                      fieldName='segmentName'
                      fields={[{ label: '05hrs', value: '1' }]}
                      //   label='Segment Name'
                      onChange={(val: any) => {
                        //console.log(val);
                      }}
                      placeholder='05hrs'
                      value={'1'}
                    />
                  </Col>
                  <Col lg={3} md={3} sm={3}>
                    <Button
                      className={`${styles.CreateSegmentNameBtn} ${styles.filterItem}`}
                    >
                      Filter
                    </Button>
                  </Col>
                </Row>
              </Col>
            </div>
            <div>
              <Col className='mx-auto' lg={7}>
                <p
                  style={{
                    fontSize: '17px',
                    fontWeight: '400',
                    color: '#8992A3'
                  }}
                >
                  18 Team Members Found
                </p>
                <Col
                  lg={12}
                  className={`${styles.capacityFieldOption} customformCheck `}
                >
                  {UserData.map((el, idx) => {
                    return (
                      <>
                        <div className='form-group '>
                          <div
                            className={
                              isActive.includes(el.id)
                                ? styles.capacitycheckboxSelected
                                : styles.capacitycheckbox
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
                              <span className={`${styles.capacityBoxImage}`}>
                                <img src={el.image} alt='$$$' />
                              </span>
                              <span className={styles.capacityChecboxText}>
                                <strong>{el.user_full_name}</strong>
                                <div
                                  className={
                                    isActive.includes(el.id)
                                      ? styles.capacitySelectedDesc
                                      : ''
                                  }
                                >
                                  {el.description}
                                </div>
                              </span>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  })}
                </Col>
              </Col>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
interface userDataProps {
  UserData: Array<usersData>;
}
interface usersData {
  id: number;
  name: string;
  user_full_name: string;
  description: string;
  image: string;
}
