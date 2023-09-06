import React from 'react';
import { Table, Form, Row, Col, Card } from 'react-bootstrap';
import styles from 'css/Campaigns.module.css';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useMediaQuery } from 'react-responsive';

export default function CampaignsTable({
  show,
  setShow,
  setEditData,
  TableData
}: CampaignsTableProps) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const deleteCampaignHandler = (id: number) => {
    // const temp = [...data];
    // const newData = temp.filter(elem => elem.id !== id);
    // setData(newData);
  };

  return (
    <>
      <div>
        {isTabletOrMobile ? (
          <Row>
            {TableData.map((elem, index) => {
              return (
                <Col sm={6}>
                  <Card
                    className='responsiveTableCards mb-4 '
                    style={{ width: '100%' }}
                  >
                    <Card.Body>
                      <Card.Title className='mb-3'>
                        <div className='d-flex align-items-center'>
                          <Form.Check type='checkbox' label='' />
                        </div>
                        <div className='tableCardsOptions justify-content-end'>
                          <i
                            className='fa-solid fa-pen'
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                              setShow(true);
                              setEditData(elem);
                            }}
                          ></i>
                          <TableMenuDropdown
                            hasEditOption={false}
                            deleteHandler={() =>
                              deleteCampaignHandler(elem.campaign_id)
                            }
                          />
                        </div>
                      </Card.Title>
                      <Row>
                        <Col xs={12} className='tableCardsElements'>
                          <strong>CAMPAIGN NAME</strong>
                          <span>{elem.campaign_name}</span>
                        </Col>
                        <Col xs={6} className='tableCardsElements'>
                          <strong>SEGMENT</strong>
                          <span>{elem.segments}</span>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        ) : (
          <div
            style={{
              height: TableData.length > 4 ? '300px' : 'inherit'
            }}
            className={TableData.length > 4 ? 'tableScrollWrap' : ''}
          >
            <Table className={`${styles.campaignsTable} fulcrumDefaultTable`}>
              <tbody>
                {TableData.map((elem, index) => {
                  return (
                    <tr key={elem.campaign_id}>
                      <td style={{ paddingTop: '25px' }}>
                        <Form.Check type='checkbox' label='' />
                      </td>
                      <td>
                        <strong>CAMPAIGN NAME</strong>
                        <span>{elem.campaign_name}</span>
                      </td>

                      <td>
                        <strong>SEGMENT</strong>
                        <span className='textCapitalize'>{elem.segments}</span>
                      </td>

                      <td className={styles.editCol}>
                        <i
                          onClick={() => {
                            setShow(true);
                            setEditData(elem);
                          }}
                          className='fa-solid fa-pen'
                        ></i>
                      </td>
                      {/* <td className={styles.optionsCol}>
                        <TableMenuDropdown
                          hasEditOption={false}
                          // deleteHandler={() => deleteCampaignHandler(elem.id)}
                        />
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
}

interface CampaignsTableProps {
  show: boolean;
  setShow: (show: boolean) => void;
  setEditData: any;
  TableData: Array<any>;
}
