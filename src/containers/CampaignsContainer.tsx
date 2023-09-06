import React, { useState, useEffect } from 'react';
import { Col, Container } from 'react-bootstrap';
import styles from 'css/Campaigns.module.css';
import FulcrumCustomModel from 'shared/FulcrumCustomModel';
import AssignCampaigns from 'components/Campaigns/AssignCampaigns';
import FulcrumNavBar from 'shared/FulcrumNavBar';
import {
  useGetAssignCampaignsMutation,
  useGetBingCampaignsMutation,
  useGetFacebookCampaignsMutation,
  useGetGoogleUpdatedCampaignsMutation
} from 'services/campaignsApi';
import SlideToggle from 'react-slide-toggle';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PropagateLoader } from 'react-spinners';
import {
  setAssignedCampaignsData,
  setBingCampaignsData,
  setFacebookCampaignsData,
  setGoogleUpdatedCampaignsData
} from 'features/campaigns/campaignsSlice';
import { toast } from 'react-toastify';
import EditAssignedCampaigns from 'components/Campaigns/EditAssignedCampaigns';
import CampaignsTable from 'components/Campaigns/CampaignsTable';

export default function CampaignsContainer() {
  const dispatch = useAppDispatch();
  //States
  const [show, setShow] = useState(false);

  const [editAssignedCampaignsModelshow, setEditAssignedCampaignsModelshow] =
    useState(false);
  const [editAssignedCampaignsModelData, setEditAssignedCampaignsModelData] =
    useState(null);
  const [googleAssignedCampaigns, setgoogleAssignedCampaigns] = useState<
    Array<any>
  >([]);
  const [fbAssignedCampaigns, setfbAssignedCampaigns] = useState<Array<any>>(
    []
  );
  const [bingAssignedCampaigns, setbingAssignedCampaigns] = useState<
    Array<any>
  >([]);
  const [yelpAssignedCampaigns, setyelpAssignedCampaigns] = useState<
    Array<any>
  >([]);
  //Mutations
  const [getGoogleUpdatedCampaignsAction, googleRes] =
    useGetGoogleUpdatedCampaignsMutation();
  const [getFacebookCampaignsAction, fbRes] = useGetFacebookCampaignsMutation();
  const [getBingCampaignsAction, bingRes] = useGetBingCampaignsMutation();

  const [getAssignCampaignsAction, getAssignCampaignsRespnse] =
    useGetAssignCampaignsMutation();

  //App Data
  const id_token = useAppSelector(state => state.authentication.id_token);

  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const clientName = useAppSelector(
    state => state.clientsData.ActiveClient?.crm_client_name
  );
  const googleUpdatedCampaigns = useAppSelector(
    state => state.campaigns.GoogleUpdatedCampaigns
  );
  const facebookCampaigns = useAppSelector(
    state => state.campaigns.FacebookCampaigns
  );
  const bingCampaigns = useAppSelector(state => state.campaigns.BingCampaigns);
  //Custom Functions
  const getAllGoogleCampaings = async () => {
    try {
      const response: any = await getGoogleUpdatedCampaignsAction({
        db: clientName ? clientName : '',
        page: 1,
        page_size: 1000
      }).unwrap();
      if (response) {
        dispatch(
          setGoogleUpdatedCampaignsData({
            GoogleUpdatedCampaigns: response.data
          })
        );
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      dispatch(
        setGoogleUpdatedCampaignsData({
          GoogleUpdatedCampaigns: []
        })
      );
      console.log(err);
    }
  };
  const getAllFbCampaings = async () => {
    try {
      const response: Array<any> = await getFacebookCampaignsAction(
        activeCRMClient !== null ? activeCRMClient.fb_client_id : ''
      ).unwrap();
      if (response) {
        dispatch(setFacebookCampaignsData({ FacebookCampaigns: response }));
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      dispatch(setFacebookCampaignsData({ FacebookCampaigns: [] }));

      console.log(err);
    }
  };
  const getAllBingCampaings = async () => {
    try {
      const response: Array<any> = await getBingCampaignsAction(
        activeCRMClient?.bing_client_id ? activeCRMClient.bing_client_id : ''
      ).unwrap();
      if (response) {
        dispatch(setBingCampaignsData({ BingCampaigns: response }));
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      dispatch(setBingCampaignsData({ BingCampaigns: [] }));
      console.log(err);
    }
  };
  const getAssignCampaignsData = async () => {
    try {
      const response: any = await getAssignCampaignsAction({
        id_token: id_token,
        client_name: clientName ? clientName : ''
      }).unwrap();
      if (response) {
        dispatch(setAssignedCampaignsData({ AssignedCampaigns: response }));
        filterAssignedCampaigns(response);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const filterAssignedCampaigns = data => {
    const googleAssignedCampaigns = data.filter(
      campaign => campaign.account === 'google'
    );
    const fbAssignedCampaigns = data.filter(
      campaign => campaign.account === 'fb'
    );
    const bingAssignedCampaigns = data.filter(
      campaign => campaign.account === 'bing'
    );
    const yelpAssignedCampaigns = data.filter(
      campaign => campaign.account === 'yelp'
    );
    setgoogleAssignedCampaigns(googleAssignedCampaigns);
    setfbAssignedCampaigns(fbAssignedCampaigns);
    setbingAssignedCampaigns(bingAssignedCampaigns);
    setyelpAssignedCampaigns(yelpAssignedCampaigns);
  };
  useEffect(() => {
    if (activeCRMClient === null) {
      toast.warning('Please Select a Client');
    } else {
      getAllFbCampaings();
      getAllGoogleCampaings();
      getAllBingCampaings();
      getAssignCampaignsData();
    }
  }, [activeCRMClient]);

  return (
    <>
      {show && (
        <FulcrumCustomModel
          show={show}
          setShow={setShow}
          ComponentForm={
            <AssignCampaigns
              fbCampaigns={facebookCampaigns}
              googleCampaigns={googleUpdatedCampaigns}
              bingCampaigns={bingCampaigns}
            />
          }
        />
      )}

      {editAssignedCampaignsModelshow && (
        <FulcrumCustomModel
          show={editAssignedCampaignsModelshow}
          setShow={setEditAssignedCampaignsModelshow}
          ComponentForm={
            <EditAssignedCampaigns
              editModelData={editAssignedCampaignsModelData}
            />
          }
        />
      )}
      <Container>
        <Col lg={12}>
          <FulcrumNavBar
            NavData={{
              NavHeading: 'Campaigns',
              NavText: 'Connect campaigns to specific business segments',
              hasButton: true,
              buttonText: 'Assign Campaign',
              buttonOnClick: () => {
                setShow(true);
              },
              hasAlert: true,
              AlertText: 'You have 3 new campaigns pending segment assignment'
            }}
          />
        </Col>

        <Col lg={12}>
          <Container>
            {googleRes.isLoading ||
            fbRes.isLoading ||
            bingRes.isLoading ||
            getAssignCampaignsRespnse.isLoading ? (
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
            ) : (
              <>
                <SlideToggle
                  render={({ toggle, setCollapsibleElement, range }) => (
                    <div className='my-collapsible'>
                      <div>
                        <ul className={styles.campaignFilterList}>
                          <li>
                            <img src='images/accounts/google.svg' alt='' />
                          </li>
                          <li>
                            <div className={styles.campaignfilterTitle}>
                              <strong> Ad Account</strong>
                              <span>Google Ads</span>
                            </div>
                          </li>
                          <li>
                            <i
                              onClick={toggle}
                              className={`my-collapsible__toggle ${
                                !range
                                  ? 'fa-solid fa-angle-up'
                                  : 'fa-solid fa-angle-down'
                              }`}
                            ></i>
                          </li>
                        </ul>
                      </div>

                      <div
                        className='my-collapsible__content'
                        ref={setCollapsibleElement}
                      >
                        {googleAssignedCampaigns.length ? (
                          <CampaignsTable
                            show={editAssignedCampaignsModelshow}
                            setShow={setEditAssignedCampaignsModelshow}
                            setEditData={setEditAssignedCampaignsModelData}
                            TableData={googleAssignedCampaigns}
                          />
                        ) : (
                          <p>No Record Found</p>
                        )}
                      </div>
                    </div>
                  )}
                />
                <SlideToggle
                  render={({ toggle, setCollapsibleElement, range }) => (
                    <div className='my-collapsible'>
                      <div>
                        <ul className={styles.campaignFilterList}>
                          <li>
                            <img
                              src='images/accounts/facebookLogo.svg'
                              alt=''
                            />
                          </li>
                          <li>
                            <div className={styles.campaignfilterTitle}>
                              <strong> Ad Account</strong>
                              <span>Facebook Ads</span>
                            </div>
                          </li>
                          <li>
                            <i
                              onClick={toggle}
                              className={`my-collapsible__toggle ${
                                !range
                                  ? 'fa-solid fa-angle-up'
                                  : 'fa-solid fa-angle-down'
                              }`}
                            ></i>
                          </li>
                        </ul>
                      </div>

                      <div
                        className='my-collapsible__content'
                        ref={setCollapsibleElement}
                      >
                        {fbAssignedCampaigns.length ? (
                          <CampaignsTable
                            show={editAssignedCampaignsModelshow}
                            setShow={setEditAssignedCampaignsModelshow}
                            setEditData={setEditAssignedCampaignsModelData}
                            TableData={fbAssignedCampaigns}
                          />
                        ) : (
                          <p>No Record Found</p>
                        )}
                      </div>
                    </div>
                  )}
                />
                <SlideToggle
                  render={({ toggle, setCollapsibleElement, range }) => (
                    <div className='my-collapsible'>
                      <div>
                        <ul className={styles.campaignFilterList}>
                          <li>
                            <img src='images/accounts/microsoft.svg' alt='' />
                          </li>
                          <li>
                            <div className={styles.campaignfilterTitle}>
                              <strong> Ad Account</strong>
                              <span>Bing Ads</span>
                            </div>
                          </li>
                          <li>
                            <i
                              onClick={toggle}
                              className={`my-collapsible__toggle ${
                                !range
                                  ? 'fa-solid fa-angle-up'
                                  : 'fa-solid fa-angle-down'
                              }`}
                            ></i>
                          </li>
                        </ul>
                      </div>

                      <div
                        className='my-collapsible__content'
                        ref={setCollapsibleElement}
                      >
                        {bingAssignedCampaigns.length ? (
                          <CampaignsTable
                            show={editAssignedCampaignsModelshow}
                            setShow={setEditAssignedCampaignsModelshow}
                            setEditData={setEditAssignedCampaignsModelData}
                            TableData={bingAssignedCampaigns}
                          />
                        ) : (
                          <p>No Record Found</p>
                        )}
                      </div>
                    </div>
                  )}
                />
                <SlideToggle
                  render={({ toggle, setCollapsibleElement, range }) => (
                    <div className='my-collapsible'>
                      <div>
                        <ul className={styles.campaignFilterList}>
                          <li>
                            <img
                              src='images/accounts/yelp_burst-1.svg'
                              alt=''
                            />
                          </li>
                          <li>
                            <div className={styles.campaignfilterTitle}>
                              <strong> Ad Account</strong>
                              <span>Yelp Ads</span>
                            </div>
                          </li>
                          <li>
                            <i
                              onClick={toggle}
                              className={`my-collapsible__toggle ${
                                !range
                                  ? 'fa-solid fa-angle-up'
                                  : 'fa-solid fa-angle-down'
                              }`}
                            ></i>
                          </li>
                        </ul>
                      </div>

                      <div
                        className='my-collapsible__content'
                        ref={setCollapsibleElement}
                      >
                        {yelpAssignedCampaigns.length ? (
                          <CampaignsTable
                            show={editAssignedCampaignsModelshow}
                            setShow={setEditAssignedCampaignsModelshow}
                            setEditData={setEditAssignedCampaignsModelData}
                            TableData={yelpAssignedCampaigns}
                          />
                        ) : (
                          <p>No Record Found</p>
                        )}
                      </div>
                    </div>
                  )}
                />
              </>
            )}
          </Container>
        </Col>
      </Container>
    </>
  );
}
