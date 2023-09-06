import React from 'react';
import { Col, Container } from 'react-bootstrap';
import styles from 'css/Accounts.module.css';
import FulcrumNavBar from 'shared/FulcrumNavBar';
import CRMConnectForm from 'components/Settings/CRMConnectForm';

export default function ConnectToCRM() {
  return (
    <>
      <Container className={styles.customPadding}>
        <Col lg={12}>
          <FulcrumNavBar
            NavData={{
              NavHeading: 'Connect to CRM',
              NavText: 'Integrate Directly with your CRM and Ad platforms',
              hasButton: false
            }}
          />
        </Col>
        <Col lg={12} className='d-flex justify-content-center'>
          <Col lg={8}>
            <CRMConnectForm />
          </Col>
        </Col>
      </Container>
    </>
  );
}
