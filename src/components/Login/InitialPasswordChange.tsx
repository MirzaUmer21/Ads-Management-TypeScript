import React from 'react';
import styles from 'css/Login.module.css';

import { Col, Container, Row } from 'react-bootstrap';
import MediaQuery from 'react-responsive';
import InitialPasswordResetForm from './InitialPasswordResetForm';
export default function InitialPasswordChange() {
  return (
    <div>
      <Container fluid className={styles.loginScreen}>
        <Row>
          <Col lg={6}>
            <Container>
              <div className={styles.contentWrap}>
                <div className={styles.content}>
                  <div className={styles.headingSection}>
                    <div className={styles.mainLogo}>
                      <img
                        src='/images/accounts/LoginFulcrumLogo.svg'
                        alt='$$$'
                      />
                    </div>
                    <div className={styles.mainLoginHeadingText}>
                      <h2 style={{ fontSize: '64px', lineHeight: '85px' }}>
                        Change Password
                      </h2>
                      <p>Welcome, Please change your password.</p>
                    </div>
                  </div>
                  <InitialPasswordResetForm />

                  <p className={styles.privacyPolicy}>
                    Please set your new password to accsess dashboard.
                  </p>
                </div>
              </div>
            </Container>
          </Col>
          <MediaQuery minWidth={992}>
            <Col lg={6} className={styles.loginBackground}></Col>
          </MediaQuery>
        </Row>
      </Container>
    </div>
  );
}
