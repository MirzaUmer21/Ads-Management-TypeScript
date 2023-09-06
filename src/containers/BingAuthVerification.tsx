import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setIsAccountSet } from 'features/accounts/accountsSlice';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBingConnectMutation } from 'services/accountsApi';
import FullScreenLoading from 'shared/FullScreenLoading';

export default function BingAuthVerification() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userBingConnectAction, { isLoading }] = useBingConnectMutation();

  const id_token = useAppSelector(state => state.authentication.id_token);
  const bingEmail = useAppSelector(state => state.authentication.bingEmail);
  const dispatch = useAppDispatch();

  let navigate = useNavigate();
  const handleConnectBing = async (data: any) => {
    try {
      const response: any = await userBingConnectAction(data).unwrap();
      if (response.message) {
        dispatch(
          setIsAccountSet({
            isAccountsSet: false
          })
        );
        navigate('/accounts');
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
      id_token: id_token,
      bing_email: bingEmail
    };
    handleConnectBing(bingConnectBody);
  }, []);
  return <>{isLoading && <FullScreenLoading />}</>;
}
