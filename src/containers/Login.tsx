import React from 'react';
import styles from 'css/Login.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import LoginForm from 'components/Login/LoginForm';
import MediaQuery from 'react-responsive';

export default function Login() {
  return (
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
                    <h2>Welcome Back</h2>
                    <p>We can't wait to show you your efficiencies</p>
                  </div>
                </div>
                <LoginForm />
                {/* <FacebookLogin
                  appId='773210210315143'
                  fields='name,email,picture'
                  callback={responseFacebook}
                  render={(renderProps: any) => (
                    <button
                      onClick={renderProps.onClick}
                      className={styles.customFacebookButton}
                    >
                      <img src='/images/accounts/Fb_logo.png' alt='$$$' />
                      <p>Sign in with Facebook</p>
                    </button>
                  )}
                /> */}
                {/* <FacebookLogin
                  appId='1088597931155576'
                  callback={responseFacebook}
                  render={(renderProps: any) => (
                    <button
                      onClick={renderProps.onClick}
                      className={styles.customFacebookButton}
                    >
                      <img src='/images/accounts/Fb_logo.png' alt='$$$' />
                      <p>Sign in with Facebook</p>
                    </button>
                  )}
                /> */}

                <p className={styles.privacyPolicy}>
                  By proceeding you also agree to the Terms of Service and
                  Privacy Policy
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
  );
}
