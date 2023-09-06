import { Outlet, Route, Routes, useNavigate } from 'react-router-dom';
import Dashboard from '../containers/DashboardContainer';
import { links } from '../static/links';
import Login from '../containers/Login';
import { Fragment, useEffect } from 'react';
import PrivateRoute from './PrivateRoute';
import { Col, Container, Row } from 'react-bootstrap';
import SideBar from 'shared/sidebar';
import ActionsContainer from 'containers/ActionsContainer';
import AccountsContainer from 'containers/AccountsContainer';
import SegmentsContainer from 'containers/SegmentsContainer';
import ObjectivesContainer from 'containers/ObjectivesContainer';
import CampaignsContainer from 'containers/CampaignsContainer';
import CapacityContainer from 'containers/CapacityContainer';
import ErrorBoundary from './ErrorBoundary';
import BudgetsContainer from 'containers/BudgetsContainer';
import RulesContainer from 'containers/RulesContainer';
import AccountSetupContainer from 'containers/AccountSetupContainer';
import PageNotFound from './PageNotFound';
import MediaQuery from 'react-responsive';
import SidebarMobile from 'shared/SidebarMobile';
import SettingsContainer from 'containers/SettingsContainer';
import ForgotPassword from 'components/Login/ForgotPassword';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import LandingPage from 'containers/LandingPage';
import InitialPasswordChange from 'components/Login/InitialPasswordChange';
import GoogleAuthVerification from 'containers/GoogleAuthVerification';
import BingAuthVerification from 'containers/BingAuthVerification';
import FacebookAuthVerification from 'containers/FacebookAuthVerification';
import YelpAuthVerification from 'containers/YelpAuthVerification';
import BingEmailVerification from 'containers/BingEmailVerification';
import {
  useGoogleGetCurrentAccountMutation,
  useGoogleManagerAccountsMutation
} from 'services/googleConnectApi';
import {
  setAllGoogleAccountData,
  setGoogleManagerAccountsData
} from 'features/accounts/googleAccountSlice';
import { setIsActiveAccountsfetched } from 'features/accounts/accountsSlice';
import {
  setAllFacebookAccountData,
  setFacebookManagerAccountsData
} from 'features/accounts/facebookAccountSlice';
import {
  useFacebookGetCurrentAccountMutation,
  useFacebookManagerAccountsMutation
} from 'services/facebookConnectApi';
import { useGetCRMMappingByEmailMutation } from 'services/crmApi';
import { setClientsStateData } from 'features/clients/clientsSlice';
import { useGetUserProfileMutation } from 'services/profileApi';
import { setProfile } from 'features/profile/usersSlice';
import {
  useBingGetCurrentAccountMutation,
  useBingManagerAccountsMutation
} from 'services/bingConnectApi';
import {
  setAllBingAccountData,
  setBingManagerAccountsData
} from 'features/accounts/bingAccountSlice';
import { setUserEmail } from 'features/auth/authSlice';
import ConnectToCRM from 'containers/ConnectToCRM';
import {
  useGetYelpActiveProgramMutation,
  useGetYelpBusinessesMutation
} from 'services/yelpConnectApi';
import {
  setActiveYelpProgramData,
  setYelpBusinessesData
} from 'features/accounts/yelpAccountSlice';

const AppRoutes = () => {
  const GetContentWrapper = () => {
    const dispatch = useAppDispatch();
    //Mutations
    const [googleGetCurrentAccountAction] =
      useGoogleGetCurrentAccountMutation();
    const [googleManagerAccountsAction] = useGoogleManagerAccountsMutation();
    const [bingManagerAccountsAction] = useBingManagerAccountsMutation();
    const [facebookManagerAccountsAction] =
      useFacebookManagerAccountsMutation();

    const [facebookGetCurrentAccountAction] =
      useFacebookGetCurrentAccountMutation();
    const [getCRMMappingByEmailAction] = useGetCRMMappingByEmailMutation();

    const [getUserprofileAction] = useGetUserProfileMutation();
    const [bingGetCurrentAccountAction] = useBingGetCurrentAccountMutation();
    const [getYelpActiveProgramAction] = useGetYelpActiveProgramMutation();
    const [getYelpBusinessesAction] = useGetYelpBusinessesMutation();
    //App Data
    const isActiveAccountsfetched = useAppSelector(
      state => state.accounts.isActiveAccountsfetched
    );
    const allClients = useAppSelector(state => state.clientsData.AllClients);
    const id_token = useAppSelector(state => state.authentication.id_token);
    const fulcrumEmail = useAppSelector(state => state.authentication.email);
    const profileData = useAppSelector(state => state.profile.data);
    const getCRMMappingByEmail = async () => {
      try {
        const response: any = await getCRMMappingByEmailAction(
          fulcrumEmail
        ).unwrap();
        if (response) {
          dispatch(setClientsStateData({ AllClients: response }));
        }
      } catch (err: any) {
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
        console.log(err);
      }
    };
    const getGoogleManagerAccounts = async (googleEmail: string) => {
      const reqData = {
        google_email: googleEmail,
        id_token: id_token
      };
      try {
        const response: any = await googleManagerAccountsAction(
          reqData
        ).unwrap();
        if (response) {
          dispatch(
            setGoogleManagerAccountsData({
              ActiveUser: googleEmail,
              ManagerAccounts: response.google_manager_accounts
            })
          );
        }
      } catch (err: any) {
        console.log(err);
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
        console.log(err);
      }
    };
    const getFacebookManagerAccounts = async (fbEmail: string) => {
      const reqData = {
        fb_email: fbEmail,
        id_token: id_token
      };
      try {
        const response: any = await facebookManagerAccountsAction(
          reqData
        ).unwrap();
        if (response) {
          dispatch(
            setFacebookManagerAccountsData({
              ActiveUser: fbEmail,
              ManagerAccounts: response
            })
          );
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    const getBingConnectedAccount = async () => {
      try {
        const response: any = await bingGetCurrentAccountAction({
          id_token
        }).unwrap();
        if (response) {
          if (response.bing_client_account_id)
            dispatch(setAllBingAccountData(response));
          getBingManagerAccounts(response.bing_email);
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    const getBingManagerAccounts = async (bingEmail: string) => {
      const reqData = {
        bing_email: bingEmail,
        id_token: id_token
      };
      try {
        const response: any = await bingManagerAccountsAction(reqData).unwrap();
        if (response) {
          dispatch(
            setBingManagerAccountsData({
              ActiveUser: bingEmail,
              ManagerAccounts: response
            })
          );
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    const getYelpConnectedAccount = async () => {
      try {
        const response: any = await getYelpActiveProgramAction(
          id_token
        ).unwrap();
        if (response) {
          if (response.yelp_business_id)
            dispatch(setActiveYelpProgramData({ activeProgram: response }));
          getYelpBusinessesAccounts();
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    const getYelpBusinessesAccounts = async () => {
      try {
        const response: any = await getYelpBusinessesAction(null).unwrap();
        if (response) {
          dispatch(
            setYelpBusinessesData({
              yelpBusinesses: response
            })
          );
        }
      } catch (err: any) {
        console.log(err);
      }
    };
    const getUserprofileDate = async () => {
      try {
        const response: any = await getUserprofileAction(id_token).unwrap();
        if (response) {
          const userEmail: string = response.fulcrum_email;
          const ProfileData = {
            first_name: response.first_name,
            fulcrum_email: response.fulcrum_email,
            last_name: response.last_name,
            profile_picture_url: response.profile_picture_url,
            username: response.username
          };
          dispatch(setProfile({ data: ProfileData }));
          dispatch(setUserEmail(userEmail));
        }
      } catch (err: any) {
        console.log(err);
      }
    };

    useEffect(() => {
      document.getElementsByTagName('body')[0].setAttribute('style', '');
      if (!profileData) getUserprofileDate();
      if (!isActiveAccountsfetched) {
        getGoogleConnectedAccount();
        getFacebookConnectedAccount();
        getBingConnectedAccount();
        getYelpConnectedAccount();
        dispatch(setIsActiveAccountsfetched({ isActiveAccountsfetched: true }));
      }
      if (!allClients.length && fulcrumEmail) getCRMMappingByEmail();
    }, [fulcrumEmail]);
    return <Outlet />;
  };
  const RedirectToDashboard = () => {
    let navigate = useNavigate();
    useEffect(() => {
      navigate('/dashboard');
    });

    return null;
  };
  const PageLayout = () => (
    <>
      <MediaQuery minWidth={1200}>
        <Container fluid>
          <Row>
            <Col lg={3} id='sidebar'>
              <SideBar />
            </Col>
            <Col lg={9} className='p-0' id='content'>
              <Outlet />
            </Col>
          </Row>
        </Container>
      </MediaQuery>
      <MediaQuery maxWidth={1200}>
        <>
          <div id='sidebarMobile'>
            <SidebarMobile />
          </div>
          <div id='contentMobile'>
            <Outlet />
          </div>
        </>
      </MediaQuery>
    </>
  );

  function routeComponent() {
    return (
      <Fragment>
        <Routes>
          <Route element={<ErrorBoundary />}>
            <Route path='/' element={<PrivateRoute />}>
              <Route element={<PageLayout />}>
                <Route path='/' element={<GetContentWrapper />}>
                  <Route
                    path='/'
                    key='dashboard'
                    element={<RedirectToDashboard />}
                  />
                  <Route
                    path={links.dashboard}
                    key='dashboard'
                    element={<Dashboard />}
                  />
                  <Route
                    path={links.actions}
                    key='actions'
                    element={<ActionsContainer />}
                  />
                  <Route
                    path={links.accounts}
                    key='accounts'
                    element={<AccountsContainer />}
                  />
                  <Route
                    path={links.connectToCRM}
                    key='connectToCRM'
                    element={<ConnectToCRM />}
                  />
                  <Route
                    path={links.segments}
                    key='segments'
                    element={<SegmentsContainer />}
                  />
                  <Route
                    path={links.objectives}
                    key='objectives'
                    element={<ObjectivesContainer />}
                  />
                  <Route
                    path={links.budgets}
                    key='budgets'
                    element={<BudgetsContainer />}
                  />
                  <Route
                    path={links.campaigns}
                    key='campaigns'
                    element={<CampaignsContainer />}
                  />
                  <Route
                    path={links.capacity}
                    key='capacity'
                    element={<CapacityContainer />}
                  />
                  <Route
                    path={links.rules}
                    key='rules'
                    element={<RulesContainer />}
                  />
                  <Route
                    path={links.accountSetup}
                    key='accountSetup'
                    element={<AccountSetupContainer />}
                  />
                  <Route
                    path={links.settings}
                    key='settings'
                    element={<SettingsContainer />}
                  />
                </Route>
              </Route>
            </Route>
            <Route path='*' element={<PageNotFound />} />
            <Route path='/login' element={<Login />} />
            <Route
              path={links.landingPage}
              key='landingPage'
              element={<LandingPage />}
            />
            <Route
              path='google/google_auth_code'
              key='googleCode'
              element={<GoogleAuthVerification />}
            />
            <Route
              path='bing/bing_auth_code'
              key='bingCode'
              element={<BingAuthVerification />}
            />
            <Route
              path='bing/bing_email_auth_code'
              key='bingCode'
              element={<BingEmailVerification />}
            />
            <Route
              path='fb/fb_auth_code'
              key='facebookCode'
              element={<FacebookAuthVerification />}
            />
            <Route
              path='yelp/yelp_auth_code'
              key='yelpCode'
              element={<YelpAuthVerification />}
            />
            <Route
              path={links.forgotPassword}
              key='forgotPassword'
              element={<ForgotPassword />}
            />
            <Route
              path={links.initialPasswordChange}
              key='initialPasswordChange'
              element={<InitialPasswordChange />}
            />
          </Route>
        </Routes>
      </Fragment>
    );
  }
  return routeComponent();
};

export default AppRoutes;
