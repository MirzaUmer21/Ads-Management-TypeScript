import React from 'react';
import styles from 'css/Login.module.css';
import ForgotPasswordForm from 'components/ForgotPassword/ForgotPasswordForm';
import { Col, Container, Row } from 'react-bootstrap';
import MediaQuery from 'react-responsive';

export default function ForgotPassword() {
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
                      <h2 style={{ fontSize: '65px', lineHeight: '85px' }}>
                        Forgot Password
                      </h2>
                      <p>Trouble Logging In?</p>
                    </div>
                  </div>
                  <ForgotPasswordForm />
                  <p className={styles.privacyPolicy}>
                    Please enter your email address so we can send you an email
                    to reset your password.
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
