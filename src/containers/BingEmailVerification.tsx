import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setBingCredentials } from 'features/auth/authSlice';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBingEmailVerifyMutation } from 'services/accountsApi';
import FullScreenLoading from 'shared/FullScreenLoading';

export default function BingEmailVerification() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userBingEmailVerifyAction, { isLoading }] =
    useBingEmailVerifyMutation();
  const dispatch = useAppDispatch();
  const id_token = useAppSelector(state => state.authentication.id_token);
  let navigate = useNavigate();
  const handleConnectBing = async (data: any) => {
    try {
      const response: any = await userBingEmailVerifyAction(data).unwrap();
      if (response.message) {
        const emailBing = {
          bingEmail: response.bing_email
        };
        dispatch(setBingCredentials({ ...emailBing }));
        window.open(response.ads_auth_url, '_self', 'noopener,noreferrer');
      }
    } catch (err: any) {
      console.log(err);
      alert('There is an error. Please try again.');
      navigate('/accounts');
    }
  };
  let codeParameter = searchParams.get('code');
  useEffect(() => {
    const bingConnectBody = {
      code: codeParameter,
      id_token: id_token
    };
    handleConnectBing(bingConnectBody);
  }, []);
  return <>{isLoading && <FullScreenLoading />}</>;
}
