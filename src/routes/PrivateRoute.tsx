import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'app/hooks';

const useAuth = () => {
  const loginRes = useAppSelector(state => state.authentication);
  const auth = loginRes.isAuthenticated ? true : false;
  return auth;
};
const PrivateRoute = () => {
  return useAuth() ? <Outlet /> : <Navigate to='/login' />;
};
export default PrivateRoute;
