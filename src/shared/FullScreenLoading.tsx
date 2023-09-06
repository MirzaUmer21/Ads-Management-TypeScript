import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function FullScreenLoading() {
  return (
    <div className='fullScreenLoader d-flex flex-column justify-content-center align-items-center'>
      <Spinner animation='border' role='status' />
      <h4>Please Wait</h4>
    </div>
  );
}
