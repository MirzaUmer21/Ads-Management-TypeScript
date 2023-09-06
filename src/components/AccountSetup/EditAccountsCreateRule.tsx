import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import SelectField from 'shared/SelectField';
import styles from 'css/AssignCampaign.module.css';
import InputField from 'shared/InputField';
export default function EditAccountsCreateRule(editModelData: any) {
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
              <h3 className={styles.addsConnectivityHead}>Edit Create Rules</h3>
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
                    fields={[
                      { label: 'Service', value: 'Service' },
                      { label: 'Sales', value: 'Sales' },
                      { label: 'All', value: 'All' }
                    ]}
                    label='Segments'
                    onChange={(val: any) => {
                      // console.log(val);
                    }}
                    placeholder='Select segment'
                    value={
                      fieldsData?.IFSEGMENT
                        ? fieldsData?.IFSEGMENT
                        : fieldsData?.ELSESEGMENT
                    }
                  />
                  <InputField
                    col={6}
                    label='METRIC'
                    name='metric'
                    placeholder='>'
                    type='text'
                    disabled
                    className='customConditionClass'
                    value={fieldsData?.METRIC}
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
                    className='customConditionClass'
                    value={fieldsData?.HASCONDITION}
                  />
                  <InputField
                    col={4}
                    label='OF'
                    name='OF'
                    placeholder='100%'
                    type='text'
                    className='customConditionClass'
                    value={fieldsData?.OF}
                  />
                  <InputField
                    col={4}
                    label='FOR'
                    name='for'
                    placeholder='Today'
                    type='text'
                    className='customConditionClass'
                    value={fieldsData?.For}
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
                    value={fieldsData?.ORELSE}
                  />
                </Row>
              </Col>
              <Col lg={12} className={styles.fieldContainer}>
                <Button
                  style={{ background: '#5600D6 ' }}
                  className='ModelCustomBtn'
                >
                  Submit
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
