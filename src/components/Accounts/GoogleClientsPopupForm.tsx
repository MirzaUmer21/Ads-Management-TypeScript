import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import capacityStyles from 'css/AssignCapacity.module.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  useGoogleClientsMutation,
  useGoogleCurrentAccountMutation
} from 'services/googleConnectApi';

import {
  setGoogleActiveClient,
  setGoogleClientsData
} from 'features/accounts/googleAccountSlice';
import Loading from 'shared/Loading';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function GoogleClientsPopupForm({
  show,
  setShow
}: clientPopupProps) {
  const dispatch = useAppDispatch();

  //states
  const [selectedClient, setselectedClient] = useState('');
  const [selectedClientName, setselectedClientName] = useState('');

  //App Data
  const [googleCurrentAccountAction, googleCurrentAccountResponse] =
    useGoogleCurrentAccountMutation();
  const activeGoogleClient = useAppSelector(
    state => state.googleAccount.ActiveClient
  );

  const userEmail = useAppSelector(state => state.authentication.email);
  const googleClientsData = useAppSelector(
    state => state.googleAccount.GoogleClients
  );
  const googleActiveManager = useAppSelector(
    state => state.googleAccount.ActiveManager
  );
  const id_token = useAppSelector(state => state.authentication.id_token);
  const GoogleUser: any = useAppSelector(
    state => state.googleAccount.ActiveUser
  );
  const GoogleManagerId: any = useAppSelector(
    state => state.googleAccount.ActiveManager
  );

  const [googleClientsAction, googleClientsResponse] =
    useGoogleClientsMutation();

  const connectClientReq = async () => {
    if (!selectedClient) {
      return null;
    }
    const reqData = {
      fulcrum_email: userEmail,
      google_email: GoogleUser,
      google_client_account_id: selectedClient,
      google_manager_account_id: googleActiveManager,
      google_client_account_name: selectedClientName
    };
    try {
      const response: any = await googleCurrentAccountAction(reqData).unwrap();
      if (response.message === 'success') {
        dispatch(
          setGoogleActiveClient({
            ActiveClient: selectedClient,
            ActiveClientName: selectedClientName
          })
        );
        setShow(false);
        document.getElementsByTagName('body')[0].setAttribute('style', '');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  useEffect(() => {
    const getGoogleClientsData = async () => {
      const reqData = {
        google_email: GoogleUser,
        id_token: id_token,
        manager_account_id: GoogleManagerId
      };
      try {
        const response: any = await googleClientsAction(reqData).unwrap();
        dispatch(
          setGoogleClientsData({
            GoogleClients: response.google_client_accounts
          })
        );
      } catch (err: any) {
        toast.error('There is some Error. Please try again.');
        console.log(err);
      }
    };
    if (show) getGoogleClientsData();
  }, [GoogleManagerId]);
  return (
    <div>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>Select Client</h3>
            </div>
          </Col>
          <div className={styles.formContainer}>
            <Col
              lg={12}
              className={`${capacityStyles.capacityFieldOption} ${capacityStyles.assignCapacityPopup} ${styles.segmentsMembersOption} customformCheck mt-3`}
            >
              {googleClientsResponse.isLoading ? (
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
              ) : googleClientsResponse.isError ? (
                <p>No Data Found</p>
              ) : (
                <Col lg={6} style={{ margin: '0 auto' }}>
                  <Form.Select
                    className='customFulcrumSelectGray'
                    style={{
                      marginBottom: '20px'
                    }}
                    placeholder='Select User'
                    onChange={e => {
                      setselectedClient(e.target.value);
                      setselectedClientName(e.target.selectedOptions[0].text);
                    }}
                  >
                    <option style={{ display: 'none' }}>Select Client</option>

                    {googleClientsData.length &&
                      googleClientsData.map((elem, index) => {
                        return (
                          <option value={elem.google_client_account_id}>
                            {elem.google_client_account_name}
                          </option>
                        );
                      })}
                  </Form.Select>

                  <Button
                    style={{ background: '#5600D6 ' }}
                    className='ModelCustomBtn'
                    onClick={() => {
                      connectClientReq();
                    }}
                  >
                    {googleCurrentAccountResponse.isLoading ? (
                      <Loading loaderText='Please wait' />
                    ) : (
                      <>Connect Client</>
                    )}
                  </Button>
                </Col>
              )}
            </Col>
          </div>
        </Row>
      </Container>
    </div>
  );
}
interface clientPopupProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
