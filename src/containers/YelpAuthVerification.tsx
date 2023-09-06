import { useAppSelector } from 'app/hooks';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useYelpConnectMutation } from 'services/accountsApi';
import FullScreenLoading from 'shared/FullScreenLoading';

export default function YelpAuthVerification() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [userYelpConnectAction, { isLoading }] = useYelpConnectMutation();
  const id_token = useAppSelector(state => state.authentication.id_token);
  let navigate = useNavigate();
  const handleConnectYelp = async (data: any) => {
    try {
      const response: any = await userYelpConnectAction(data).unwrap();
      if (response.message) {
        navigate('/accounts');
      }
    } catch (err: any) {
      console.log(err);
      alert('There is an error. Please Try again later.');
      navigate('/accounts');
    }
  };
  let codeParameter = searchParams.get('code');
  useEffect(() => {
    const yelpConnectBody = {
      code: codeParameter,
      id_token: id_token
    };
    handleConnectYelp(yelpConnectBody);
  }, []);
  return <>{isLoading && <FullScreenLoading />}</>;
}
