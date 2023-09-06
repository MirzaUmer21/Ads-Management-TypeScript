import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from 'css/Accounts.module.css';
import { ConnectivityModelAccountsList } from 'static/ConnectivityModelAccountsList';
import { useMediaQuery } from 'react-responsive';
export default function AdsConnectivityModel() {
  const [connectAcoounts, setConnectAcoounts] = useState([
    ...ConnectivityModelAccountsList
  ]);
  const isSmallMobile = useMediaQuery({ maxWidth: 576 });

  const AccountConnectHandler = (id: number, dat: string) => {
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
          <h3 className={styles.addsConnectivityHead}>Ads Connectivity</h3>
        </Col>
        <Col lg={8} className='mx-auto'>
          {ConnectivityModelAccountsList.map((el: any, index) => {
            const dat = `${el.background}`;
            return isSmallMobile ? (
              <div
                key={index}
                onClick={e => AccountConnectHandler(el.id, dat)}
                className={`${styles.addsConnectivityModelCol}  ${
                  el.connected === true ? styles.checkActive : ''
                }`}
                style={{ backgroundColor: dat }}
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
                onClick={e => AccountConnectHandler(el.id, dat)}
                className={`${styles.addsConnectivityModelCol}  ${
                  el.connected === true ? styles.checkActive : ''
                }`}
                style={{ backgroundColor: dat }}
              >
                <img src={el.url} alt='' />
                <p>{el.description}</p>

                <i
                  className={`fa-solid fa-check ${styles.checkIcon} ${
                    el.connected === true ? styles.activeIcon : ''
                  }`}
                ></i>
              </div>
            );
          })}
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
