import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import capacityStyles from 'css/AssignCapacity.module.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import Loading from 'shared/Loading';
import { PropagateLoader } from 'react-spinners';
import { useFacebookCurrentAccountMutation } from 'services/facebookConnectApi';
import { setFacebookActiveClient } from 'features/accounts/facebookAccountSlice';
import { toast } from 'react-toastify';
import {
  useBingClientsMutation,
  useBingCurrentAccountMutation
} from 'services/bingConnectApi';
import {
  setBingActiveClient,
  setBingClientsData
} from 'features/accounts/bingAccountSlice';

export default function BingClientsPopupForm({
  show,
  setShow
}: clientPopupProps) {
  const dispatch = useAppDispatch();

  const [bingCurrentAccountAction, bingCurrentAccountResponse] =
    useBingCurrentAccountMutation();
  const [bingClientsAction, bingClientsResponse] = useBingClientsMutation();
  //states
  const [selectedClient, setselectedClient] = useState('');
  const [selectedClientName, setselectedClientName] = useState('');

  //App Data

  const bingClientsData: Array<any> = useAppSelector(
    state => state.bingAccount.BingClients
  );

  const id_token = useAppSelector(state => state.authentication.id_token);
  const userEmail = useAppSelector(state => state.authentication.email);

  const FacebookActiveUser: any = useAppSelector(
    state => state.facebookAccount.ActiveUser
  );
  const bingActiveUser: any = useAppSelector(
    state => state.bingAccount.ActiveUser
  );
  const BingActiveUser: any = useAppSelector(
    state => state.bingAccount.ActiveUser
  );
  const facebookActiveManager: any = useAppSelector(
    state => state.facebookAccount.ActiveManager
  );
  const bingActiveManager: any = useAppSelector(
    state => state.bingAccount.ActiveManager
  );

  const connectClientReq = async () => {
    if (!selectedClient) {
      return null;
    }
    const reqData = {
      fulcrum_email: userEmail,
      bing_email: bingActiveUser,
      bing_client_account_id: selectedClient,
      bing_manager_account_id: bingActiveManager,
      bing_client_account_name: selectedClientName
    };

    try {
      const response: any = await bingCurrentAccountAction(reqData).unwrap();

      if (response.message === 'success') {
        dispatch(
          setBingActiveClient({
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
    const getBingClientsData = async () => {
      const reqData = {
        id_token: id_token,
        bing_email: BingActiveUser
      };
      try {
        const response: any = await bingClientsAction(reqData).unwrap();
        dispatch(
          setBingClientsData({
            BingClients: response.accounts
          })
        );
      } catch (err: any) {
        toast.error('There is some Error. Please try again.');
        console.log(err);
      }
    };
    if (show) getBingClientsData();
  }, [BingActiveUser]);
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
              {bingClientsResponse.isLoading ? (
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
              ) : bingClientsResponse.isError ? (
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

                    {bingClientsData &&
                      bingClientsData.map((elem, index) => {
                        return <option value={elem.id}>{elem.name}</option>;
                      })}
                  </Form.Select>

                  <Button
                    style={{ background: '#5600D6 ' }}
                    className='ModelCustomBtn'
                    onClick={() => {
                      connectClientReq();
                    }}
                  >
                    {bingCurrentAccountResponse.isLoading ? (
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
