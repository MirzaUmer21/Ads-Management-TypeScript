import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import capacityStyles from 'css/AssignCapacity.module.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import Loading from 'shared/Loading';
import { PropagateLoader } from 'react-spinners';
import {
  useFacebookClientsMutation,
  useFacebookCurrentAccountMutation
} from 'services/facebookConnectApi';
import {
  setFacebookActiveClient,
  setFacebookClientsData
} from 'features/accounts/facebookAccountSlice';
import { toast } from 'react-toastify';

export default function FacebookClientsPopupForm({
  show,
  setShow
}: clientPopupProps) {
  const dispatch = useAppDispatch();
  const [facebookCurrentAccountAction, facebookCurrentAccountResponse] =
    useFacebookCurrentAccountMutation();
  const [facebookClientsAction, facebookClientsResponse] =
    useFacebookClientsMutation();
  //states
  const [selectedClient, setselectedClient] = useState('');
  const [selectedClientName, setselectedClientName] = useState('');

  //App Data

  const facebookClientsData: Array<any> = useAppSelector(
    state => state.facebookAccount.FacebookClients
  );
  const facebookActiveClient = useAppSelector(
    state => state.facebookAccount.ActiveClient
  );
  const id_token = useAppSelector(state => state.authentication.id_token);
  const userEmail = useAppSelector(state => state.authentication.email);

  const FacebookActiveUser: any = useAppSelector(
    state => state.facebookAccount.ActiveUser
  );
  const facebookActiveManager: any = useAppSelector(
    state => state.facebookAccount.ActiveManager
  );

  const connectClientReq = async () => {
    if (!selectedClient) {
      return null;
    }
    const reqData = {
      fulcrum_email: userEmail,
      fb_email: FacebookActiveUser,
      fb_client_account_id: selectedClient,
      fb_manager_account_id: facebookActiveManager,
      fb_client_account_name: selectedClientName
    };
    try {
      const response: any = await facebookCurrentAccountAction(
        reqData
      ).unwrap();

      if (response.message === 'success') {
        dispatch(
          setFacebookActiveClient({
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
    const getFacebookClientsData = async () => {
      const reqData = {
        id_token: id_token,
        fb_email: FacebookActiveUser
      };
      try {
        const response: any = await facebookClientsAction(reqData).unwrap();
        dispatch(
          setFacebookClientsData({
            FacebookClients: response.accounts
          })
        );
      } catch (err: any) {
        toast.error('There is some Error. Please try again.');
        console.log(err);
      }
    };
    if (show) getFacebookClientsData();
  }, [FacebookActiveUser]);
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
              {facebookClientsResponse.isLoading ? (
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
              ) : facebookClientsResponse.isError ? (
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

                    {facebookClientsData &&
                      facebookClientsData.map((elem, index) => {
                        return (
                          <option value={elem.account_id}>{elem.name}</option>
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
                    {facebookCurrentAccountResponse.isLoading ? (
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
