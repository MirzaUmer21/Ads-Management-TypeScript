import React, { useEffect } from 'react';
import Marketing from 'components/Accounts/Marketing';
import styles from 'css/Accounts.module.css';
import { Col, Container } from 'react-bootstrap';
import AccountsModal from 'components/Accounts/AccountsModal';
import { useState } from 'react';
import FulcrumNavBar from 'shared/FulcrumNavBar';
import { Link, useNavigate } from 'react-router-dom';
import { links } from 'static/links';
import { useSocialLoginStatusMutation } from 'services/accountsApi';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PropagateLoader } from 'react-spinners';
import FulcrumCustomModel from 'shared/FulcrumCustomModel';

import { setMarketingAccountsData } from 'features/accounts/accountsSlice';

import GoogleClientsPopupForm from 'components/Accounts/GoogleClientsPopupForm';
import FacebookClientsPopupForm from 'components/Accounts/FacebookClientsPopupForm';
import { toast } from 'react-toastify';
import BingClientsPopupForm from 'components/Accounts/BingClientsPopupForm';
import YelpProgramsPopupForm from 'components/Accounts/YelpProgramsPopupForm';
export default function AccountsContainer() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  //states
  const [show, setShow] = useState(false);
  const [clientShow, setclientShow] = useState(false);
  //Mutations
  const [userSocialLoginStatusAction, { isLoading }] =
    useSocialLoginStatusMutation();

  //App Data
  const id_token = useAppSelector(state => state.authentication.id_token);
  const isMarketingDataSet = useAppSelector(
    state => state.accounts.isAccountsSet
  );
  const clientsPopupAction: string = useAppSelector(
    state => state.accounts.clientsPopupAction
  );

  const getAccountsStatus = async () => {
    try {
      const response: any = await userSocialLoginStatusAction(
        id_token
      ).unwrap();
      if (response) {
        dispatch(setMarketingAccountsData({ MarketingAccounts: response }));
      }
    } catch (err: any) {
      toast.error('There is an Error. Please try again.');
      console.log(err);
    }
  };

  useEffect(() => {
    if (!isMarketingDataSet) {
      getAccountsStatus();
    }
  }, []);
  const clientsPopupForms = {
    google: (
      <GoogleClientsPopupForm show={clientShow} setShow={setclientShow} />
    ),
    fb: <FacebookClientsPopupForm show={clientShow} setShow={setclientShow} />,
    bing: <BingClientsPopupForm show={clientShow} setShow={setclientShow} />,
    yelp: <YelpProgramsPopupForm show={clientShow} setShow={setclientShow} />
  };
  return (
    <>
      <AccountsModal show={show} setShow={setShow} />
      {clientShow && (
        <FulcrumCustomModel
          show={clientShow}
          setShow={setclientShow}
          ComponentForm={
            clientsPopupForms[clientsPopupAction]
            // <ClientsPopupForm show={clientShow} setShow={setclientShow} />
          }
        />
      )}
      <Container className={styles.customPadding}>
        <Col lg={12}>
          <FulcrumNavBar
            NavData={{
              NavHeading: 'Accounts',
              NavText: 'Integrate Directly with your CRM and Ad platforms',
              hasButton: true,
              buttonText: 'Connect To CRM',
              buttonOnClick: () => navigate(links.connectToCRM)
            }}
          />
        </Col>
        <Col lg={12}>{/* <CRMTable setShow={setShow} show={show} /> */}</Col>
        <Col lg={12} style={{ marginTop: 40 }}>
          <Container>
            <Col lg={12}>
              <div className={styles.MarketingHeading}>
                <h4>Marketing</h4>
                <Link className={styles.seeLink} to='#'>
                  See All
                </Link>
              </div>
            </Col>
            {!isLoading ? (
              <Marketing setClientShow={setclientShow} />
            ) : (
              <div
                style={{
                  display: 'flex',
                  height: '30px',
                  width: '100%',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <PropagateLoader color='#5600d6' />
              </div>
            )}
          </Container>
        </Col>
      </Container>
    </>
  );
}
