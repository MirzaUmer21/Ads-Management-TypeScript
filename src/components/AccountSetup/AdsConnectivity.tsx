import React, { Dispatch, SetStateAction, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from 'css/Accounts.module.css';
import { AccountsList } from 'static/AccountsList';
import { useMediaQuery } from 'react-responsive';
export default function AdsConnectivity() {
  const isSmallMobile = useMediaQuery({ maxWidth: 576 });

  const [connectAcoounts, setConnectAcoounts] = useState([...AccountsList]);
  const AccountConnectHandler = (id: number) => {
    if (id) {
      const temp = [...connectAcoounts];
      temp.forEach(elem => {
        if (id === elem.id) {
          elem.connected = !elem.connected;
        }
      });
      setConnectAcoounts(temp);
    }
  };

  return (
    <Container className='mb-4'>
      <Row>
        <Col lg={12}>
          <h3 className={styles.addsConnectivityHead}>Ad Account</h3>
          <p className={styles.addsConnectivityDesc}>
            Connect to your ad account
          </p>
        </Col>
        <Col lg={7} className='mx-auto'>
          {AccountsList.map((el: any, index) =>
            isSmallMobile ? (
              <div
                key={index}
                onClick={e => AccountConnectHandler(el.id)}
                className={`${styles.addsConnectivityCol}  ${
                  el.connected === true ? styles.checkActive : ''
                }`}
                style={{ display: 'block' }}
              >
                <div className='d-flex justify-content-between align-items-center mb-3'>
                  <img src={el.url} alt='' />

                  <i
                    className={`fa-solid fa-check ${styles.checkIcon} ${
                      el.connected === true ? styles.activeIcon : ''
                    }`}
                  ></i>
                </div>

                <p>{el.description}</p>
              </div>
            ) : (
              <div
                key={index}
                onClick={e => AccountConnectHandler(el.id)}
                className={`${styles.addsConnectivityCol}  ${
                  el.connected === true ? styles.checkActive : ''
                }`}
              >
                <img src={el.url} alt='' />
                <p>{el.description}</p>

                <i
                  className={`fa-solid fa-check ${styles.checkIcon} ${
                    el.connected === true ? styles.activeIcon : ''
                  }`}
                ></i>
              </div>
            )
          )}
        </Col>
        <Col lg={12}>
          <p className={`${styles.connectivityTerms} text-align-center`}>
            By proceeding you agree to our terms of service
          </p>
        </Col>
      </Row>
    </Container>
  );
}
