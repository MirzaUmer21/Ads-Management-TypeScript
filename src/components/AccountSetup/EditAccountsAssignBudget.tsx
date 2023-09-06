import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from 'css/Model.module.css';
import SelectField from 'shared/SelectField';
import InputField from 'shared/InputField';
export default function EditAccountsAssignBudget(editModelData: any) {
  const [fieldsData, setFieldsData] = useState<LooseObject>();
  useEffect(() => {
    var data: LooseObject = {};
    editModelData.editModelData?.content.map((elem: any, index: any) => {
      const res = elem.heading.replace(/ /g, '');
      data[res] = elem.value;
      return 0;
    });
    if (data) setFieldsData(data);
  }, []);
  if (!fieldsData) return <></>;
  return (
    <>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>
                Edit Assigned Budgets
              </h3>
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
                      fields={[
                        { label: 'Service', value: 'Service' },
                        { label: 'Sales', value: 'Sales' },
                        { label: 'All', value: 'All' }
                      ]}
                      label='Segments'
                      onChange={(val: any) => {
                        //console.log(val);
                      }}
                      placeholder='Select segment'
                      value={fieldsData?.SegmentName}
                    />
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
                        //console.log(val);
                      }}
                      placeholder='Select account'
                      value={fieldsData?.AdAccount}
                    />
                  </Row>
                </Col>
                <Col lg={12}>
                  <Row>
                    <InputField
                      col={12}
                      label='BUDGET'
                      name='budget'
                      placeholder='$25k/Month'
                      type='text'
                      value={fieldsData?.Budget}
                    />
                  </Row>
                </Col>

                <Col lg={12}>
                  <Button type='submit' className='ModelCustomBtn'>
                    Submit
                  </Button>
                </Col>
              </Form>
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
