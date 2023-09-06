import { useNavigationType, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import LoadingBar from 'react-top-loading-bar';
import AppRoutes from './routes';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-datepicker/dist/react-datepicker.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import 'css/Responsive.css';
import './App.css';
import { ToastContainer } from 'react-toastify';

function App() {
  const ref = useRef<any>(null);
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== 'POP') {
      window.scrollTo(0, 0);
    }
  }, [action]);

  useEffect(() => {
    let title = '';
    let metaDescription = '';

    //TODO: Update meta titles and descriptions below
    switch (pathname) {
      case '/':
        title = 'Fulcrum';
        metaDescription = '';

        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);
  return (
    <>
      <LoadingBar color='#5600d6' ref={ref} shadow={true} />
      <ToastContainer position='top-right' autoClose={2000} />
      <AppRoutes />
    </>
  );
}
export default App;
