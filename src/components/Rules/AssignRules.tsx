import React from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SelectField from 'shared/SelectField';
import styles from 'css/AssignCampaign.module.css';
import InputField from 'shared/InputField';

export default function AssignRules() {
  return (
    <div>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>Assign Rule</h3>
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
                    fieldName='segment'
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
                    fieldName='metric'
                    fields={[
                      {
                        label: 'Capacity',
                        value: '1'
                      }
                    ]}
                    label='METRIC'
                    onChange={(val: any) => {
                      // console.log(val);
                    }}
                    placeholder='Select metric'
                    value={'1'}
                  />
                </Row>
              </Col>
              <Col lg={12} className={styles.fieldContainer}>
                <Row className={styles.fieldWhite}>
                  <InputField
                    col={4}
                    label='HAS CONDITION (>=)'
                    name='segment'
                    placeholder='>'
                    type='text'
                    disabled
                    className='customConditionClass'
                  />
                  <InputField
                    col={4}
                    label='OF'
                    name='OF'
                    placeholder='100%'
                    type='text'
                    className='customConditionClass'
                  />
                  <InputField
                    col={4}
                    label='FOR'
                    name='for'
                    placeholder='Today'
                    type='text'
                    className='customConditionClass'
                  />
                </Row>
              </Col>
              <Col lg={12} className={styles.fieldContainer}>
                <Row className={styles.fieldWhite}>
                  <SelectField
                    fieldSelect
                    col={6}
                    disabled={false}
                    fieldName='Then'
                    fields={[{ label: 'Decrease Budget', value: '1' }]}
                    label='Then'
                    onChange={(val: any) => {
                      // console.log(val);
                    }}
                    placeholder='Select Then'
                    value={'1'}
                  />
                  <InputField
                    col={6}
                    label='AMOUNT'
                    name='amount'
                    placeholder='50%'
                    type='text'
                    className='customConditionClass'
                  />
                </Row>
              </Col>
              <Col lg={12} className={styles.fieldContainer}>
                <Row className={styles.fieldWhite}>
                  <InputField
                    col={12}
                    label='ELSE'
                    name='else'
                    placeholder='50%'
                    type='text'
                    className='customConditionClass'
                  />
                </Row>
              </Col>
              <Col lg={12} className={styles.fieldContainer}>
                <Button
                  style={{ background: '#5600D6 ' }}
                  className='ModelCustomBtn'
                >
                  Assign Rule
                </Button>
              </Col>
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}
