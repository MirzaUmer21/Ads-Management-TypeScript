import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from 'css/Model.module.css';
import SelectField from 'shared/SelectField';
import InputField from 'shared/InputField';

export default function AddBudget() {
  return (
    <div>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>Add Budget</h3>
            </div>
          </Col>
          <div>
            <Col className='mx-auto' lg={8}>
              <Form>
                <Col lg={12}>
                  <Row>
                    <SelectField
                      fieldSelect
                      col={6}
                      disabled={false}
                      fieldName='segments'
                      fields={[{ label: 'Service', value: '1' }]}
                      label='Segments'
                      onChange={(val: any) => {
                        //console.log(val);
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
                        //console.log(val);
                      }}
                      placeholder='Select account'
                      value={'1'}
                    />
                  </Row>
                </Col>
                <Col lg={12}>
                  <Row>
                    <InputField
                      col={6}
                      label='Budget'
                      name='budget'
                      placeholder='Enter Amount'
                      type='text'
                    />
                    <InputField
                      col={6}
                      label='CPA'
                      name='CPA'
                      placeholder='Enter CPA'
                      type='text'
                    />
                    <InputField
                      col={12}
                      label='ESTIMATED SCALABILITY'
                      name='ESTIMATED SCALABILITY'
                      placeholder='Enter Scalability'
                      type='text'
                    />
                  </Row>
                </Col>

                <Col lg={12}>
                  <Button type='submit' className='ModelCustomBtn'>
                    Add Budget
                  </Button>
                </Col>
              </Form>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}
