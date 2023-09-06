import React from 'react';
import { Container } from 'react-bootstrap';

export default function PageNotFound() {
  return (
    <div>
      <Container>
        <div className='notFound'>
          <h2>404 Error Page not Found.</h2>
          <p>
            The page cannot be found. It looks like nothing was found at this
            location.
          </p>
        </div>
      </Container>
    </div>
  );
}
