import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setIsAccountSet } from 'features/accounts/accountsSlice';
import { setCredentials, setGoogleCredentials } from 'features/auth/authSlice';
import { setPreAuthCredentials } from 'features/auth/preAuthSlice';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useGoogleConnectMutation } from 'services/accountsApi';
import FullScreenLoading from 'shared/FullScreenLoading';

export default function GoogleAuthVerification() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userGoogleConnectAction, { isLoading }] = useGoogleConnectMutation();
  const id_token = useAppSelector(state => state.authentication.id_token);
  let navigate = useNavigate();
  const dispatch = useAppDispatch();
  const authData = useAppSelector(state => state.authentication);
  const handleConnectGoogle = async (data: any) => {
    try {
      const response: any = await userGoogleConnectAction(data).unwrap();
      if (response.message) {
        navigate('/accounts');
        dispatch(
          setIsAccountSet({
            isAccountsSet: false
          })
        );
        const reqData = {
          googleEmail: response.google_email
        };
        authData.googleEmail = response.google_email;
        dispatch(setGoogleCredentials({ ...reqData }));
      }
    } catch (err: any) {
      console.log(err);
      alert('There is an error. Please Try again later.');
      navigate('/accounts');
    }
  };
  let codeParameter = searchParams.get('code');

  useEffect(() => {
    const googleConnectBody = {
      code: codeParameter,
      id_token: id_token
    };
    handleConnectGoogle(googleConnectBody);
  }, []);
  return <>{isLoading && <FullScreenLoading />}</>;
}
