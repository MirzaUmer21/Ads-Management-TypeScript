import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import capacityStyles from 'css/AssignCapacity.module.css';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Loading from 'shared/Loading';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import {
  useGetYelpProgramsMutation,
  useSetYelpActiveProgramMutation
} from 'services/yelpConnectApi';
import {
  setActiveYelpProgramData,
  setYelpProgramsData
} from 'features/accounts/yelpAccountSlice';

export default function YelpProgramsPopupForm({
  show,
  setShow
}: clientPopupProps) {
  const dispatch = useAppDispatch();
  const [setYelpActiveProgramAction, setYelpActiveProgramResponse] =
    useSetYelpActiveProgramMutation();
  const [getYelpProgramsAction, getYelpProgramsResponse] =
    useGetYelpProgramsMutation();

  //states
  const [selectedClient, setselectedClient] = useState('');
  const [selectedClientName, setselectedClientName] = useState('');

  //App Data

  const YelpProgramsData: Array<Array<any>> = useAppSelector(
    state => state.yelpAccount.yelpPrograms
  );
  const YelpActiveBusinessData: Array<any> = useAppSelector(
    state => state.yelpAccount.activeBusinesses
  );

  const id_token = useAppSelector(state => state.authentication.id_token);
  const userEmail = useAppSelector(state => state.authentication.email);
  const connectProgramReq = async () => {
    if (!selectedClient) {
      return null;
    }
    console.log(selectedClient);
    const activeProgram = YelpProgramsData.filter(
      (elem, ind) => elem[2] === selectedClient
    );

    const activeProgramData = {
      campaign_id: activeProgram[0][2],
      yelp_business_name: activeProgram[0][1],
      yelp_business_id: activeProgram[0][0],
      yelp_program_type: activeProgram[0][3],
      yelp_program_status: activeProgram[0][4],
      yelp_program_pause_status: activeProgram[0][5],
      yelp_program_budget: activeProgram[0][6],
      yelp_program_start_date: activeProgram[0][7],
      fulcrum_email: userEmail
    };
    const reqData = {
      campaign_id: activeProgram[0][2],
      yelp_business_id: activeProgram[0][0],
      yelp_program_type: activeProgram[0][3],
      yelp_program_status: activeProgram[0][4],
      yelp_program_pause_status: activeProgram[0][5],
      yelp_program_budget: activeProgram[0][6],
      yelp_program_start_date: activeProgram[0][7]
    };

    try {
      const response: any = await setYelpActiveProgramAction({
        id_token: id_token,
        bodyData: reqData
      }).unwrap();
      if (response) {
        dispatch(
          setActiveYelpProgramData({
            activeProgram: activeProgramData
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
    const getYelpProgramsData = async () => {
      try {
        const response: any = await getYelpProgramsAction(
          YelpActiveBusinessData[0]
        ).unwrap();
        if (response) {
          dispatch(
            setYelpProgramsData({
              yelpPrograms: response
            })
          );
        }
      } catch (err: any) {
        toast.error('There is some Error. Please try again.');
        console.log(err);
      }
    };
    if (show) getYelpProgramsData();
  }, [YelpActiveBusinessData]);
  return (
    <div>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>Select Program</h3>
            </div>
          </Col>
          <div className={styles.formContainer}>
            <Col
              lg={12}
              className={`${capacityStyles.capacityFieldOption} ${capacityStyles.assignCapacityPopup} ${styles.segmentsMembersOption} customformCheck mt-3`}
            >
              {getYelpProgramsResponse.isLoading ? (
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
              ) : getYelpProgramsResponse.isError ? (
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
                    <option style={{ display: 'none' }}>Select Program</option>

                    {YelpProgramsData &&
                      YelpProgramsData.map((elem, index) => {
                        return <option value={elem[2]}>{elem[1]}</option>;
                      })}
                  </Form.Select>

                  <Button
                    style={{ background: '#5600D6 ' }}
                    className='ModelCustomBtn'
                    onClick={() => {
                      connectProgramReq();
                    }}
                  >
                    {setYelpActiveProgramResponse.isLoading ? (
                      <Loading loaderText='Please wait' />
                    ) : (
                      <>Connect Program</>
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
