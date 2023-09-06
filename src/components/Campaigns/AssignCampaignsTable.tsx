import { useAppSelector } from 'app/hooks';
import React from 'react';
import { Col, Container, Row, Table } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import SlideToggle from 'react-slide-toggle';
import styles from 'css/Campaigns.module.css';
import TableMenuDropdown from 'shared/TableMenuDropdown';
export default function AssignCampaignsTable({
  show,
  setShow,
  setEditData
}: AssignedCampaignsTableProps) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });

  const assignCampaignsData = useAppSelector(
    state => state.campaigns.AssignedCampaigns
  );
  return (
    <div>
      <Container className='mt50 mb50'>
        <Col lg={12}>
          <Container>
            <SlideToggle
              render={({ toggle, setCollapsibleElement, range }) => (
                <div className='my-collapsible'>
                  <Row>
                    <Col lg={6}>
                      <h2 className='tableCollapseMainHeading'>
                        Assigned Campaigns
                        <i
                          onClick={toggle}
                          className={`my-collapsible__toggle ${
                            range
                              ? 'fa-solid fa-angle-down'
                              : 'fa-solid fa-angle-up'
                          }`}
                        ></i>
                      </h2>
                    </Col>
                  </Row>
                  <div
                    className='my-collapsible__content'
                    ref={setCollapsibleElement}
                  >
                    <Col lg={12}>
                      {isTabletOrMobile ? (
                        <Row></Row>
                      ) : (
                        <div
                          style={{
                            height:
                              assignCampaignsData.length > 3
                                ? '220px'
                                : 'inherit'
                          }}
                          className={
                            assignCampaignsData.length > 3
                              ? 'tableScrollWrap'
                              : ''
                          }
                        >
                          <Table
                            className={`${styles.campaignsTable} fulcrumDefaultTable`}
                          >
                            <tbody>
                              {!assignCampaignsData.length ? (
                                <p>No Record Found</p>
                              ) : (
                                assignCampaignsData.map((elem, index) => {
                                  return (
                                    <tr key={index} className='trBorder'>
                                      <td className='defaultSpaceTD'>
                                        <strong>Campaign NAME</strong>
                                        <span>{elem.campaign_name}</span>
                                      </td>

                                      <td>
                                        <strong>segments</strong>
                                        <span className='textCapitalize'>
                                          {elem.segments}
                                        </span>
                                      </td>

                                      <td>
                                        <strong>account</strong>
                                        <span className='textCapitalize'>
                                          {elem.account}
                                        </span>
                                      </td>

                                      <td>
                                        <strong>client name</strong>
                                        <span className='textCapitalize'>
                                          {elem.client_name}
                                        </span>
                                      </td>

                                      <td className={styles.optionsCol}>
                                        <i
                                          onClick={() => {
                                            setShow(true);
                                            setEditData(elem);
                                          }}
                                          className='fa-solid fa-pen'
                                        ></i>
                                        {/* <TableMenuDropdown
                                          hasEditOption={false}
                                        /> */}
                                      </td>
                                    </tr>
                                  );
                                })
                              )}
                            </tbody>
                          </Table>
                        </div>
                      )}
                    </Col>
                  </div>
                </div>
              )}
            />
          </Container>
        </Col>
      </Container>
    </div>
  );
}
interface AssignedCampaignsTableProps {
  show: boolean;
  setShow: (show: boolean) => void;
  setEditData: any;
}
