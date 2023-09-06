import React from 'react';
import { Outlet } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error: Error) {
    //   eslint-disable-next-line
    console.log('E: ', error);
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <p>Loading failed! Please reload.</p>;
    }
    return <Outlet />;
  }
}
export default ErrorBoundary;
