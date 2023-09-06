import React, { useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import Table from 'react-bootstrap/Table';
import SelectField from 'shared/SelectField';
import { AssignedCampaigns } from 'static/AssignedCompaigns';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useMediaQuery } from 'react-responsive';

export default function AssignAccountCampaign({
  setShow,
  setData
}: AccountsAssignCampaignprops) {
  const [campaigns, setCampaigns] = useState([...AssignedCampaigns]);
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const deteteCampaignHandler = (key: number) => {
    const temp = [...campaigns];
    const updatedData = temp.filter((elem, i) => elem.key !== key);
    setCampaigns(updatedData);
  };
  const handleSelectedCampaigns = (key: number) => {
    const updatedCampaigns = [...campaigns];
    updatedCampaigns.forEach(elem => {
      if (elem.key === key) {
        elem['selected'] = !elem['selected'];
      }
    });
    setCampaigns(updatedCampaigns);
  };

  return (
    <Container>
      <Row className='mb-4'>
        <Col lg={12}>
          <div className={styles.AdsContainer}>
            <h3 className={styles.addsConnectivityHead}>Assign Campaigns</h3>
            <p className={styles.createSegmentDesc}>
              Assign campaigns to segments.
            </p>
          </div>
        </Col>
        <div className={styles.formContainer}>
          <Col className='mx-auto' lg={7}>
            <Col lg={12} className={styles.fieldContainer}>
              <Row>
                <SelectField
                  fieldSelect
                  col={6}
                  disabled={false}
                  fieldName='segments'
                  fields={[{ label: 'Service', value: '1' }]}
                  label='Segments'
                  onChange={(val: any) => {
                    // console.log(val);
                  }}
                  placeholder='Select segment'
                  value={'1'}
                />
                <SelectField
                  fieldSelect
                  col={6}
                  disabled={false}
                  fieldName='adAccount'
                  fields={[
                    {
                      label: 'Google Ads',
                      value: '1',
                      image: '/images/accounts/google.svg'
                    }
                  ]}
                  label='Ad Account'
                  onChange={(val: any) => {
                    // console.log(val);
                  }}
                  placeholder='Select account'
                  value={'1'}
                />
              </Row>
            </Col>
            <Col lg={12} className={styles.fieldContainer}>
              <Row>
                <SelectField
                  fieldSelect
                  col={12}
                  disabled={false}
                  fieldName='compaign'
                  fields={[
                    {
                      label: 'Replacement',
                      value: '1'
                    }
                  ]}
                  label='Campaigns'
                  onChange={(val: any) => {
                    // console.log(val);
                  }}
                  placeholder='Select compaign'
                  value={'1'}
                />
              </Row>
            </Col>
            <Col lg={12} className={styles.fieldContainer}>
              <Button className='ModelCustomBtn'>Add Campaign</Button>
            </Col>
          </Col>
          <Col lg={12} className={styles.fieldContainer}>
            <p className={styles.tableHeading}>Assigned Campaigns</p>
          </Col>

          {/* Table */}
          <Col lg={12}>
            {isTabletOrMobile ? (
              <Row>
                {!campaigns.length ? (
                  <p>No Data Found</p>
                ) : (
                  campaigns.map((elem, index) => {
                    return (
                      <Col key={index} sm={6}>
                        <Card
                          className='responsiveTableCards mb-4 '
                          style={{ width: '100%' }}
                        >
                          <Card.Body
                            className={
                              elem['selected']
                                ? styles.selectedCompaignsCard
                                : styles.CompaignsCard
                            }
                          >
                            <Card.Title className='mb-3'>
                              <div className='d-flex align-items-center'>
                                <input
                                  checked={elem['selected']}
                                  type='checkbox'
                                  value={elem.key}
                                  id={`campaignCheckBox-` + elem.key}
                                  className={`form-check-input`}
                                  onChange={e => {
                                    handleSelectedCampaigns(elem.key);
                                  }}
                                />
                              </div>
                              <div className='tableCardsOptions justify-content-end'>
                                <i
                                  onClick={() => {
                                    setShow(true);
                                    setData(elem);
                                  }}
                                  className='fa-solid fa-pen'
                                  style={{ cursor: 'pointer' }}
                                ></i>
                                <TableMenuDropdown
                                  hasEditOption={false}
                                  deleteHandler={() => {
                                    deteteCampaignHandler(elem.key);
                                  }}
                                />
                              </div>
                            </Card.Title>
                            <Row>
                              {elem.content.map((el, ind) => {
                                return (
                                  <Col xs={12} key={ind} className='mb-3'>
                                    <div className='d-flex'>
                                      {el.image && (
                                        <img
                                          style={{
                                            width: '40px',
                                            marginRight: '20px'
                                          }}
                                          src={el.image}
                                          alt='ads'
                                        />
                                      )}
                                      <div className='d-flex flex-column'>
                                        <strong>{el.heading}</strong>
                                        <span>{el.value}</span>
                                      </div>
                                    </div>
                                  </Col>
                                );
                              })}
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })
                )}
              </Row>
            ) : (
              <div>
                <div
                  style={{
                    height: campaigns.length > 2 ? '170px' : 'inherit'
                  }}
                  className={` ${campaigns.length > 2 && 'tableScrollWrap'} + ${
                    styles.assignCompaignTableWrap
                  }`}
                >
                  <Table className='fulcrumDefaultTable' style={{ margin: 0 }}>
                    <tbody style={{ margin: '42px 0px' }}>
                      {!campaigns.length ? (
                        <p>No Data Found</p>
                      ) : (
                        campaigns.map((elem, index) => {
                          return (
                            <tr
                              key={index}
                              className={
                                elem['selected']
                                  ? styles.selectedCompaignsCard
                                  : styles.CompaignsCard
                              }
                            >
                              <td>
                                <input
                                  style={{
                                    margin: '0 0 0 5px'
                                  }}
                                  checked={elem['selected']}
                                  type='checkbox'
                                  value={elem.key}
                                  className={`form-check-input`}
                                  id={`campaignCheckBox-` + elem.key}
                                  onChange={e =>
                                    handleSelectedCampaigns(elem.key)
                                  }
                                />
                              </td>
                              {elem['content'].map(el => {
                                return (
                                  <>
                                    <td>
                                      <div className='d-flex'>
                                        {el.image && (
                                          <img
                                            className='optionImg'
                                            src={el.image}
                                            alt='ads'
                                          />
                                        )}
                                        <div className='d-flex flex-column'>
                                          <strong>{el.heading}</strong>
                                          <span>{el.value}</span>
                                        </div>
                                      </div>
                                    </td>
                                  </>
                                );
                              })}
                              <td>
                                <div className={styles.rulesTableActions}>
                                  <i
                                    onClick={() => {
                                      setShow(true);
                                      setData(elem);
                                    }}
                                    className='fa-solid fa-pen'
                                  ></i>

                                  <TableMenuDropdown
                                    hasEditOption={false}
                                    deleteHandler={() =>
                                      deteteCampaignHandler(elem.key)
                                    }
                                  />
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </Table>
                </div>
              </div>
            )}
          </Col>
        </div>
      </Row>
    </Container>
  );
}
interface AccountsAssignCampaignprops {
  setShow: (show: boolean) => void;
  setData: any;
}
