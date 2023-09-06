import React, { Fragment } from 'react';
import { Col, Container } from 'react-bootstrap';
import Slider from 'shared/Slider';

export default function Marketing({ setClientShow }: marketingDataProps) {
  return (
    <>
      <Container>
        <Col lg={12}>
          <Slider setClientShow={setClientShow} />
        </Col>
      </Container>
    </>
  );
}

interface marketingDataProps {
  setClientShow: (show: boolean) => void;
}
