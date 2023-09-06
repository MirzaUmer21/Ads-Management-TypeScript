import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from 'css/Navbar.module.css';
import MediaQuery from 'react-responsive';

export default function SettingsNav() {
  return (
    <Container>
        <Row className={styles.NavCol}>
          <Col lg={8}>
            <div className={styles.navHeadingWrapper}>
              <div className={styles.NavHeadingContainer}>
                <h1 className={styles.NavHeading}>Settings</h1>
                <p className={styles.NavText}>
                  Setting page is under maintenance.
                </p>
              </div>
              <MediaQuery maxWidth={992}>
                <i className='fa-regular fa-bell customBell'></i>
              </MediaQuery>
            </div>
          </Col>
          <Col className='d-flex justify-content-end' lg={4}>
            <MediaQuery minWidth={992}>
            <i className='fa-regular fa-bell customBell'></i>
            </MediaQuery>
          </Col>
        </Row>
      </Container>
  )
}
