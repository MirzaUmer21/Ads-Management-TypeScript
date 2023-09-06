import { Col, Container } from 'react-bootstrap';
import FulcrumNavBar from 'shared/FulcrumNavBar';

export default function ActionsContainer() {
  return (
    <Container>
      <Col lg={12}>
        <FulcrumNavBar
          NavData={{
            NavHeading: 'Actions',
            NavText: 'Actions page is under maintenance.',
            hasButton: false,
            hasAlert: false
          }}
        />
      </Col>
    </Container>
  );
}
