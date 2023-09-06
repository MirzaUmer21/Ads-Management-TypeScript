import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SelectField from 'shared/SelectField';
import styles from 'css/AssignCampaign.module.css';
import InputField from 'shared/InputField';
export default function EditCampaigns(editModelData: any) {
  const [fieldsData, setFieldsData] = useState<LooseObject>();

  if (!fieldsData) return <></>;

  return (
    <>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>Edit Campaigns</h3>
            </div>
          </Col>
          <div className={styles.formContainer}>
            <Col className='mx-auto' lg={8}>
              <Col lg={12} className={styles.fieldContainer}>
                <Row>
                  <SelectField
                    fieldSelect
                    col={12}
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
                    value={fieldsData?.Segment}
                  />
                </Row>
              </Col>
              <Col lg={12} className={styles.fieldContainer}>
                <Row>
                  <InputField
                    col={12}
                    label='CAMPAIGN NAME'
                    name='compaign_name'
                    placeholder='Compaign Name'
                    type='text'
                    value={fieldsData?.CampaignName}
                  />
                </Row>
              </Col>

              <Col lg={12} className={styles.fieldContainer}>
                <Button
                  style={{ background: '#5600D6 ' }}
                  className='ModelCustomBtn'
                >
                  Edit Campaign
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
