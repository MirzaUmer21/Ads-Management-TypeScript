import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import SegmentsTable from 'components/Segments/SegmentsTable';
import { SegmentsTableFilter } from 'static/SegmentsTableFilter';
import { SegmentsTableData } from 'static/SegmentsTableData';
import { SegmentsAllTableData } from 'static/SegmentsTableData';
import FulcrumCustomModel from 'shared/FulcrumCustomModel';
import CreateSegments from 'components/Segments/CreateSegments';
import FulcrumNavBar from 'shared/FulcrumNavBar';
import EditSegment from 'components/Segments/EditSegment';

export default function SegmentsContainer() {
  const [show, setShow] = useState(false);
  const [editModelshow, setEditModelShow] = useState(false);
  const [editModelData, setEditModelData] = useState(null);

  return (
    <>
      <FulcrumCustomModel
        show={show}
        setShow={setShow}
        ComponentForm={<CreateSegments />}
      />
      {editModelshow && (
        <FulcrumCustomModel
          show={editModelshow}
          setShow={setEditModelShow}
          ComponentForm={<EditSegment editModelData={editModelData} />}
        />
      )}

      <Container>
        <Col lg={12}>
          <FulcrumNavBar
            NavData={{
              NavHeading: 'Segments',
              NavText:
                'Define the parts of your business you may have different capacity, ad accounts or budget for.',
              hasButton: true,
              buttonText: 'Create Segments',
              buttonOnClick: () => {
                setShow(true);
              },
              hasAlert: false
            }}
          />
        </Col>

        <Row>
          <Col lg={12}>
            <Container>
              <SegmentsTable
                SegmentsTableFilters={SegmentsTableFilter}
                TableData={{
                  heading: 'Service',
                  data: SegmentsTableData
                }}
                show={editModelshow}
                setShow={setEditModelShow}
                setEditData={setEditModelData}
              />
              <SegmentsTable
                SegmentsTableFilters={SegmentsTableFilter}
                TableData={{
                  heading: 'Sales',
                  data: SegmentsTableData
                }}
                show={editModelshow}
                setShow={setEditModelShow}
                setEditData={setEditModelData}
              />
              <SegmentsTable
                SegmentsTableFilters={SegmentsTableFilter}
                TableData={{
                  heading: 'All',
                  data: SegmentsAllTableData
                }}
                show={editModelshow}
                setShow={setEditModelShow}
                setEditData={setEditModelData}
              />
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
