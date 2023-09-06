import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setIsAccountSet } from 'features/accounts/accountsSlice';
import { setFacebookCredentials } from 'features/auth/authSlice';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useFacebookConnectMutation } from 'services/accountsApi';
import FullScreenLoading from 'shared/FullScreenLoading';

export default function FacebookAuthVerification() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userFacebookConnectAction, { isLoading }] =
    useFacebookConnectMutation();
  const dispatch = useAppDispatch();
  const id_token = useAppSelector(state => state.authentication.id_token);
  let navigate = useNavigate();

  const handleConnectFacebook = async (data: any) => {
    try {
      const response: any = await userFacebookConnectAction(data).unwrap();
      if (response.message) {
        dispatch(
          setIsAccountSet({
            isAccountsSet: false
          })
        );
        navigate('/accounts');
        const reqData = {
          facebookEmail: response.fb_email
        };
        dispatch(setFacebookCredentials({ ...reqData }));
      }
    } catch (err: any) {
      console.log(err);
      alert('There is an error. Please Try again later.');
      navigate('/accounts');
    }
  };
  let codeParameter = searchParams.get('code');

  useEffect(() => {
    const facebookConnectBody = {
      code: codeParameter,
      id_token: id_token
    };
    handleConnectFacebook(facebookConnectBody);
  }, []);
  return <>{isLoading && <FullScreenLoading />}</>;
}
