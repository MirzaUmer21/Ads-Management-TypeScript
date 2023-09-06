import React, { useState } from 'react';
import styles from 'css/Navbar.module.css';
import { Card, Col, Container, Row } from 'react-bootstrap';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import BellDropdown from 'shared/BellDropdown';
import SelectField from './SelectField';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  resetActiveClientStateData,
  setActiveClientStateData
} from 'features/clients/clientsSlice';
export default function FulcrumNavBar({ NavData }: NavbarDataProps) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const dispatch = useAppDispatch();
  let allClientsData: Array<options> = [];
  const location = useLocation();
  const allClients = useAppSelector(state => state.clientsData.AllClients);
  const activeClients = useAppSelector(state => state.clientsData.ActiveClient);

  const setActiveCRMClient = (val: string) => {
    if (val !== 'default') {
      const activeClient = allClients.filter(el => el.crm_client_name === val);
      dispatch(setActiveClientStateData({ ActiveClient: activeClient[0] }));
    } else {
      dispatch(resetActiveClientStateData());
    }
  };
  return (
    <>
      <Col lg={12}>
        <div className={styles.NavCol}>
          <Col lg={NavData.hasButton ? 8 : 10} md={12}>
            <div className={styles.navHeadingWrapper}>
              <div className={styles.NavHeadingContainer}>
                <h1 className={styles.NavHeading}>{NavData.NavHeading}</h1>
                <MediaQuery minWidth={992}>
                  <p className={styles.NavText}>{NavData.NavText}</p>
                </MediaQuery>
              </div>
              <MediaQuery maxWidth={992}>
                <BellDropdown />
              </MediaQuery>
            </div>
          </Col>
          <MediaQuery maxWidth={992}>
            <Col md={12}>
              <p style={{ paddingLeft: '30px' }} className={styles.NavText}>
                {NavData.NavText}
              </p>
            </Col>
          </MediaQuery>
          <Col
            className={
              isTabletOrMobile
                ? 'd-flex justify-content-center  '
                : 'd-flex justify-content-end  '
            }
            lg={NavData.hasButton ? 4 : 2}
            md={12}
          >
            {NavData.hasButton && (
              <button
                className={styles.customAccountsButton}
                onClick={NavData.buttonOnClick}
              >
                <i className='fa-solid fa-plus'></i>
                <span>{NavData.buttonText}</span>
              </button>
            )}
            <MediaQuery minWidth={992}>
              <BellDropdown />
            </MediaQuery>
          </Col>
        </div>
      </Col>

      {location.pathname !== '/accounts' &&
      location.pathname !== '/settings' &&
      location.pathname !== '/connect-to-crm' ? (
        <Col lg={12}>
          <Card className='mb-3'>
            <Card.Body>
              <div className='clientSelectSection'>
                {allClients &&
                  allClients.map((elem, index) => {
                    const temp = {
                      value: elem.crm_client_name,
                      label: elem.crm_client_name
                    };
                    allClientsData.push(temp);

                    return null;
                  })}
                {!allClients.length && (
                  <p
                    className={`d-flex align-items-center h-100 ${styles.NavText}`}
                  >
                    No Client Found
                  </p>
                )}
                <SelectField
                  fieldSelect
                  col={4}
                  disabled={false}
                  fieldName='Clients'
                  fields={allClientsData}
                  label='Clients'
                  onChange={(val: any) => {
                    setActiveCRMClient(val);
                  }}
                  placeholder='Select Clients'
                  value={activeClients?.crm_client_name}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      ) : (
        <></>
      )}
      {NavData.hasAlert && (
        <Col lg={12} style={{ marginBottom: '32px' }}>
          <div className={styles.customFulcrumAlert}>
            <i className='fa-solid fa-triangle-exclamation '></i>
            {NavData.AlertText}
          </div>
        </Col>
      )}
    </>
  );
}
interface NavbarDataProps {
  NavData: NavComponentData;
}
interface NavComponentData {
  NavHeading: string;
  NavText: string;
  hasButton: boolean;
  buttonText?: string;
  buttonOnClick?: () => void;
  hasAlert?: boolean;
  AlertText?: string;
}
type options = {
  value: string | number;
  label: string | number;
};
