import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ChangePassword from 'components/Settings/ChangePassword';
import UserDetails from 'components/Settings/UserDetails';
import FulcrumNavBar from 'shared/FulcrumNavBar';

import CRMConnectForm from 'components/Settings/CRMConnectForm';

export default function SettingsContainer() {
  return (
    <Container>
      <Col lg={12}>
        <FulcrumNavBar
          NavData={{
            NavHeading: 'Settings',
            NavText: 'Setting page is under maintenance.',
            hasButton: false,
            hasAlert: false
          }}
        />
      </Col>
      <Col lg={12}>
        <Row>
          <Col lg={6}>
            <UserDetails />
          </Col>
          <Col lg={6}>
            <ChangePassword />
          </Col>
        </Row>
      </Col>
      {/* <Col lg={12}>
        <Row>
          <Col lg={6}>
            <CRMConnectForm />
          </Col>
        </Row>
      </Col> */}
    </Container>
  );
}
