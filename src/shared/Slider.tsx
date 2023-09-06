import React, { useRef } from 'react';
import Slider from 'react-slick';
import styles from 'css/Accounts.module.css';
import { Col } from 'react-bootstrap';
import LoadingBar from 'react-top-loading-bar';
import ManagersTable from 'components/Accounts/ManagersTable';
import {
  useGoogleGetCurrentAccountMutation,
  useGoogleManagerAccountsMutation
} from 'services/googleConnectApi';
import { PropagateLoader } from 'react-spinners';

import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setIsAccountSet } from 'features/accounts/accountsSlice';
import {
  resetGoogleAccountData,
  setAllGoogleAccountData,
  setGoogleManagerAccountsData
} from 'features/accounts/googleAccountSlice';
import {
  useBingDisconnectMutation,
  useFacebookDisconnectMutation,
  useGoogleDisconnectMutation
} from 'services/accountsApi';
import { toast } from 'react-toastify';
import AccountsMarketingSlide from './AccountsMarketingSlide';
import {
  useBingLoginMutation,
  useFacebookLoginMutation,
  useGoogleLoginMutation,
  useYelpLoginMutation
} from 'services/authApi';
import {
  useFacebookGetCurrentAccountMutation,
  useFacebookManagerAccountsMutation
} from 'services/facebookConnectApi';
import {
  resetFacebookAccountData,
  setAllFacebookAccountData,
  setFacebookManagerAccountsData
} from 'features/accounts/facebookAccountSlice';
import {
  useBingGetCurrentAccountMutation,
  useBingManagerAccountsMutation
} from 'services/bingConnectApi';
import {
  resetBingAccountData,
  setAllBingAccountData,
  setBingManagerAccountsData
} from 'features/accounts/bingAccountSlice';
import { useGetYelpBusinessesMutation } from 'services/yelpConnectApi';
import { setYelpBusinessesData } from 'features/accounts/yelpAccountSlice';
export default function ActionsSlider({ setClientShow }: ActionsSliderProps) {
  const ref = useRef<any>(null);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  //App Data
  const Content = useAppSelector(state => state.accounts.MarketingAccounts);
  const id_token = useAppSelector(state => state.authentication.id_token);

  const activeGoogleClient = useAppSelector(
    state => state.googleAccount.ActiveClient
  );
  const activeGoogleClientName = useAppSelector(
    state => state.googleAccount.ActiveClientName
  );
  const activeGoogleAccount = useAppSelector(
    state => state.googleAccount.ActiveUser
  );

  const activeFacebookClient = useAppSelector(
    state => state.facebookAccount.ActiveClient
  );
  const activeBingClient = useAppSelector(
    state => state.bingAccount.ActiveClient
  );
  const activeBingClientName = useAppSelector(
    state => state.bingAccount.ActiveClientName
  );
  const activeYelpProgram = useAppSelector(
    state => state.yelpAccount.activeProgram
  );
  const activeFacebookClientName = useAppSelector(
    state => state.facebookAccount.ActiveClientName
  );
  const activeFacebookAccount = useAppSelector(
    state => state.facebookAccount.ActiveUser
  );
  const activeBingAccount = useAppSelector(
    state => state.bingAccount.ActiveUser
  );

  const connectedStatus = {
    google: activeGoogleClient ? true : false,
    bing: activeBingClient ? true : false,
    fb: activeFacebookClient ? true : false,
    yelp: activeYelpProgram ? true : false
  };

  //Mutations
  const [googleManagerAccountsAction, googleManagersResponse] =
    useGoogleManagerAccountsMutation();
  const [facebookManagerAccountsAction, facebookManagersResponse] =
    useFacebookManagerAccountsMutation();
  const [bingManagerAccountsAction, bingManagersResponse] =
    useBingManagerAccountsMutation();

  const [googleGetCurrentAccountAction] = useGoogleGetCurrentAccountMutation();
  const [userGoogleDisconnectAction] = useGoogleDisconnectMutation();
  const [userBingDisconnectAction] = useBingDisconnectMutation();
  const [userFbDisconnectAction] = useFacebookDisconnectMutation();
  const [userGoogleLoginAction] = useGoogleLoginMutation();
  const [userBingLoginAction] = useBingLoginMutation();
  const [userFacebookLoginAction] = useFacebookLoginMutation();
  const [getYelpBusinessesAction] = useGetYelpBusinessesMutation();
  const [facebookGetCurrentAccountAction] =
    useFacebookGetCurrentAccountMutation();
  const [bingGetCurrentAccountAction] = useBingGetCurrentAccountMutation();

  //Custom Functions
  const getGoogleManagerAccounts = async (email: string) => {
    const reqData = {
      google_email: email,
      id_token: id_token
    };
    try {
      const response: any = await googleManagerAccountsAction(reqData).unwrap();
      if (response) {
        dispatch(
          setGoogleManagerAccountsData({
            ActiveUser: email,
            ManagerAccounts: response.google_manager_accounts
          })
        );
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      dispatch(
        setGoogleManagerAccountsData({
          ActiveUser: '',
          ManagerAccounts: []
        })
      );
    }
  };
  const getBingManagerAccounts = async (email: string) => {
    const reqData = {
      bing_email: email,
      id_token: id_token
    };
    try {
      const response: any = await bingManagerAccountsAction(reqData).unwrap();
      if (response) {
        dispatch(
          setBingManagerAccountsData({
            ActiveUser: email,
            ManagerAccounts: response
          })
        );
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      dispatch(
        setBingManagerAccountsData({
          ActiveUser: '',
          ManagerAccounts: null
        })
      );
    }
  };
  const getFacebookManagerAccounts = async (email: string) => {
    const reqData = {
      fb_email: email,
      id_token: id_token
    };
    try {
      const response: any = await facebookManagerAccountsAction(
        reqData
      ).unwrap();
      if (response) {
        dispatch(
          setFacebookManagerAccountsData({
            ActiveUser: email,
            ManagerAccounts: response
          })
        );
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      dispatch(
        setGoogleManagerAccountsData({
          ActiveUser: '',
          ManagerAccounts: []
        })
      );
    }
  };

  const googleConnect = async () => {
    try {
      ref.current.continuousStart();
      const response: any = await userGoogleLoginAction().unwrap();
      if (response.auth_url) {
        ref.current.complete();
        window.open(response.auth_url, '_self', 'noopener,noreferrer');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const bingConnect = async () => {
    try {
      ref.current.continuousStart();
      const response: any = await userBingLoginAction().unwrap();
      if (response.email_auth_url) {
        ref.current.complete();

        window.open(response.email_auth_url, '_self', 'noopener,noreferrer');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const facebookConnect = async () => {
    try {
      ref.current.continuousStart();

      const response: any = await userFacebookLoginAction().unwrap();
      if (response.auth_url) {
        ref.current.complete();

        window.open(response.auth_url, '_self', 'noopener,noreferrer');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const yelpConnect = async () => {
    try {
      ref.current.continuousStart();
      const response: any = await getYelpBusinessesAction(null).unwrap();
      if (response) {
        ref.current.complete();
        dispatch(
          setYelpBusinessesData({
            yelpBusinesses: response
          })
        );
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const googleDisconnect = async (email: string) => {
    if (!email) {
      toast.warn('Please Select User.');
      return null;
    }
    const reqData = {
      google_email: email,
      id_token: id_token
    };
    try {
      ref.current.continuousStart();
      const response: any = await userGoogleDisconnectAction(reqData).unwrap();
      if (response.message === 'success') {
        ref.current.complete();
        dispatch(
          setIsAccountSet({
            isAccountsSet: false
          })
        );
        dispatch(
          setGoogleManagerAccountsData({
            ActiveUser: '',
            ManagerAccounts: []
          })
        );
        if (email) navigate('/accounts');
      }

      getGoogleConnectedAccount();
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');

      console.log(err);
    }
  };
  const bingDisconnect = async (email: string) => {
    if (!email) {
      toast.warn('Please Select User.');
      return null;
    }
    const reqData = {
      bing_email: email,
      id_token: id_token
    };
    try {
      ref.current.continuousStart();

      const response: any = await userBingDisconnectAction(reqData).unwrap();
      if (response.message === 'success') {
        ref.current.complete();

        dispatch(
          setIsAccountSet({
            isAccountsSet: false
          })
        );
        dispatch(
          setBingManagerAccountsData({
            ActiveUser: '',
            ManagerAccounts: null
          })
        );
        if (email) navigate('/accounts');
      }
      getBingConnectedAccount();
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const yelpDisconnect = async (email: string) => {};
  const facebookDisconnect = async (email: string) => {
    if (!email) {
      toast.warn('Please Select User.');
      return null;
    }
    const reqData = {
      fb_email: email,
      id_token: id_token
    };
    try {
      ref.current.continuousStart();

      const response: any = await userFbDisconnectAction(reqData).unwrap();
      if (response.message === 'success') {
        ref.current.complete();
        dispatch(
          setIsAccountSet({
            isAccountsSet: false
          })
        );
        dispatch(
          setFacebookManagerAccountsData({
            ActiveUser: '',
            ManagerAccounts: []
          })
        );
        navigate('/accounts');
      }
      getFacebookConnectedAccount();
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');

      console.log(err);
    }
  };
  const getGoogleConnectedAccount = async () => {
    try {
      const response: any = await googleGetCurrentAccountAction({
        id_token
      }).unwrap();
      if (response) {
        if (response.google_client_account_id)
          dispatch(setAllGoogleAccountData(response));
        getGoogleManagerAccounts(response.google_email);
      }
    } catch (err: any) {
      if (err.data.detail === 'no current account found')
        dispatch(resetGoogleAccountData());
    }
  };
  const getBingConnectedAccount = async () => {
    try {
      const response: any = await bingGetCurrentAccountAction({
        id_token
      }).unwrap();
      if (response) {
        if (response.google_client_account_id)
          dispatch(setAllBingAccountData(response));
        getBingManagerAccounts(response.bing_email);
      }
    } catch (err: any) {
      if (err.data.detail === 'no current account found')
        dispatch(resetBingAccountData());
    }
  };
  const getFacebookConnectedAccount = async () => {
    try {
      const response: any = await facebookGetCurrentAccountAction({
        id_token
      }).unwrap();
      if (response) {
        if (response.fb_client_account_id)
          dispatch(setAllFacebookAccountData(response));
        getFacebookManagerAccounts(response.fb_email);
      }
    } catch (err: any) {
      if (err.data.detail === 'no current account found')
        dispatch(resetFacebookAccountData());
      console.log(err);
    }
  };
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  function SampleNextArrow({ onClick }: any) {
    return (
      <button onClick={onClick} className={styles.next}>
        <i className='fa-solid fa-arrow-right'></i>
      </button>
    );
  }
  function SamplePrevArrow({ className, onClick }: any) {
    return (
      <button
        onClick={onClick}
        style={{ color: '#000' }}
        className={`${styles.prev} ${className}`}
      >
        <i className={`fa-solid fa-arrow-left`}></i>
      </button>
    );
  }
  return (
    <>
      <LoadingBar color='#5600d6' ref={ref} shadow={true} />

      <div className='container'>
        <div className='mb-5'>
          <Slider {...settings}>
            {Content &&
              Content.map((el, ind) => {
                if (el.slug === 'google') {
                  const data = {
                    connected_emails: el.connected_emails,
                    description: el.description,
                    heading: el.heading,
                    imageUrl: el.imageUrl,
                    slug: el.slug
                  };
                  return (
                    <Col xs={3}>
                      <AccountsMarketingSlide
                        data={data}
                        functionalData={{
                          activeAccount: activeGoogleAccount,
                          activeClientName: activeGoogleClientName,
                          connectedStatus: connectedStatus[el.slug],
                          handleDisconnect: googleDisconnect,
                          handleConnect: googleConnect,
                          getManagersAccounts: getGoogleManagerAccounts
                        }}
                      />
                    </Col>
                  );
                } else if (el.slug === 'bing') {
                  const data = {
                    connected_emails: el.connected_emails,
                    description: el.description,
                    heading: el.heading,
                    imageUrl: el.imageUrl,
                    slug: el.slug
                  };
                  return (
                    <Col xs={3}>
                      <AccountsMarketingSlide
                        data={data}
                        functionalData={{
                          activeClientName: activeBingClientName,
                          activeAccount: activeBingAccount,
                          connectedStatus: connectedStatus[el.slug],
                          handleDisconnect: bingDisconnect,
                          handleConnect: bingConnect,
                          getManagersAccounts: getBingManagerAccounts
                        }}
                      />
                    </Col>
                  );
                } else if (el.slug === 'fb') {
                  const data = {
                    connected_emails: el.connected_emails,
                    description: el.description,
                    heading: el.heading,
                    imageUrl: el.imageUrl,
                    slug: el.slug
                  };
                  return (
                    <Col xs={3}>
                      <AccountsMarketingSlide
                        data={data}
                        functionalData={{
                          activeAccount: activeFacebookAccount,
                          activeClientName: activeFacebookClientName,
                          connectedStatus: connectedStatus[el.slug],
                          handleDisconnect: facebookDisconnect,
                          handleConnect: facebookConnect,
                          getManagersAccounts: getFacebookManagerAccounts
                        }}
                      />
                    </Col>
                  );
                } else if (el.slug === 'yelp') {
                  const data = {
                    connected_emails: el.connected_emails,
                    yelpConnectedStatus: connectedStatus[el.slug],
                    description: el.description,
                    heading: el.heading,
                    imageUrl: el.imageUrl,
                    slug: el.slug
                  };
                  return (
                    <Col xs={3}>
                      <AccountsMarketingSlide
                        data={data}
                        functionalData={{
                          activeClientName:
                            activeYelpProgram?.yelp_business_name,
                          connectedStatus: connectedStatus[el.slug],
                          handleDisconnect: yelpDisconnect,
                          handleConnect: yelpConnect
                        }}
                      />
                    </Col>
                  );
                }
              })}
          </Slider>
        </div>
        {googleManagersResponse.isLoading ||
        facebookManagersResponse.isLoading ||
        bingManagersResponse.isLoading ? (
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
          <ManagersTable setClientShow={setClientShow} />
        )}
      </div>
    </>
  );
}

export interface ActionsSliderProps {
  setClientShow: (show: boolean) => void;
}
