import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import styles from 'css/Objectives.module.css';
import TableFilters from 'shared/TableFilters';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useMediaQuery } from 'react-responsive';
import SlideToggle from 'react-slide-toggle';
export default function ObjectivesTable({
  ObjectivesTableFilters,
  TableData,
  show,
  setShow,
  setEditData
}: ObjectivesTableProps) {
  var CurrencyFormat = require('react-currency-format');
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const [serviceData, setserviceData] = useState<Array<GetObjectivesResponse>>(
    []
  );
  const [installData, setinstallData] = useState<Array<GetObjectivesResponse>>(
    []
  );
  const [salesData, setsalesData] = useState<Array<GetObjectivesResponse>>([]);
  const filterObjectives = () => {
    const serviceDataSet = TableData.data.filter(
      obj => obj.segment === 'service'
    );
    const salesDataSet = TableData.data.filter(obj => obj.segment === 'sales');
    const installDataSet = TableData.data.filter(
      obj => obj.segment === 'install'
    );
    setserviceData(serviceDataSet);
    setinstallData(installDataSet);
    setsalesData(salesDataSet);
  };
  useEffect(() => {
    if (TableData.data) filterObjectives();
  }, [TableData.data]);
  return (
    <>
      <SlideToggle
        render={({ toggle, setCollapsibleElement, range }) => (
          <div className='my-collapsible'>
            <div>
              <h2 className={styles.tableHeading}>{TableData.heading} </h2>
              <TableFilters
                TableFiltersData={ObjectivesTableFilters}
                toggle={toggle}
                range={range}
              />
            </div>
            <div
              className='my-collapsible__content'
              ref={setCollapsibleElement}
            >
              {isTabletOrMobile ? (
                <Row>
                  {serviceData.map((elem, index) => {
                    return (
                      <Col sm={6}>
                        <Card
                          className='responsiveTableCards mb-4 '
                          style={{ width: '100%' }}
                        >
                          <Card.Body>
                            <Card.Title className='mb-3'>
                              <div className='tableImage'>
                                <img
                                  src={
                                    elem.account === 'google'
                                      ? 'images/accounts/google.svg'
                                      : elem.account === 'fb'
                                      ? 'images/accounts/facebookLogo.svg'
                                      : elem.account === 'yelp'
                                      ? 'images/accounts/yelp_burst-1.svg'
                                      : elem.account === 'bing'
                                      ? 'images/accounts/microsoft.svg'
                                      : ''
                                  }
                                  alt=''
                                />
                              </div>
                              <div className='tableCardsOptions'>
                                <TableMenuDropdown
                                  hasEditOption={true}
                                  editOnClick={() => {
                                    setShow(true);
                                    setEditData(elem);
                                  }}
                                />
                              </div>
                            </Card.Title>

                            <Row>
                              <Col xs={6} className={`tableCardsElements`}>
                                <strong>SEGMENT</strong>
                                <span>Service</span>
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>AD ACCOUNT</strong>
                                <span>
                                  {elem.account === 'google'
                                    ? 'Google Ads'
                                    : elem.account === 'fb'
                                    ? 'Facebook Ads'
                                    : elem.account === 'yelp'
                                    ? 'Yelp Ads'
                                    : elem.account === 'bing'
                                    ? 'Microsoft Bing Ads'
                                    : ''}
                                </span>
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>CAMPAIGNS</strong>
                                <span>{elem.campaign_id}</span>
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>CPA</strong>
                                <CurrencyFormat
                                  value={elem.cpa}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  renderText={value => <span>{value}</span>}
                                />
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>BUDGET SHIFTS</strong>
                                <span>
                                  <CurrencyFormat
                                    value={elem.budget_shift}
                                    displayType={'text'}
                                    suffix={'%'}
                                    renderText={value => <span>{value}</span>}
                                  />
                                </span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                  {salesData.map((elem, index) => {
                    return (
                      <Col sm={6}>
                        <Card
                          className='responsiveTableCards mb-4 '
                          style={{ width: '100%' }}
                        >
                          <Card.Body>
                            <Card.Title className='mb-3'>
                              <div className='tableImage'>
                                <img
                                  src={
                                    elem.account === 'google'
                                      ? 'images/accounts/google.svg'
                                      : elem.account === 'fb'
                                      ? 'images/accounts/facebookLogo.svg'
                                      : elem.account === 'yelp'
                                      ? 'images/accounts/yelp_burst-1.svg'
                                      : elem.account === 'bing'
                                      ? 'images/accounts/microsoft.svg'
                                      : ''
                                  }
                                  alt=''
                                />
                              </div>
                              <div className='tableCardsOptions'>
                                <TableMenuDropdown
                                  hasEditOption={true}
                                  editOnClick={() => {
                                    setShow(true);
                                    setEditData(elem);
                                  }}
                                />
                              </div>
                            </Card.Title>

                            <Row>
                              <Col xs={6} className={`tableCardsElements`}>
                                <strong>SEGMENT</strong>
                                <span>Sales</span>
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>AD ACCOUNT</strong>
                                <span>
                                  {elem.account === 'google'
                                    ? 'Google Ads'
                                    : elem.account === 'fb'
                                    ? 'Facebook Ads'
                                    : elem.account === 'yelp'
                                    ? 'Yelp Ads'
                                    : elem.account === 'bing'
                                    ? 'Microsoft Bing Ads'
                                    : ''}
                                </span>
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>CAMPAIGNS</strong>
                                <span>{elem.campaign_id}</span>
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>CPA</strong>
                                <CurrencyFormat
                                  value={elem.cpa}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  renderText={value => <span>{value}</span>}
                                />
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>BUDGET SHIFTS</strong>
                                <span>
                                  {' '}
                                  <CurrencyFormat
                                    value={elem.budget_shift}
                                    displayType={'text'}
                                    suffix={'%'}
                                    renderText={value => <span>{value}</span>}
                                  />
                                </span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                  {installData.map((elem, index) => {
                    return (
                      <Col sm={6}>
                        <Card
                          className='responsiveTableCards mb-4 '
                          style={{ width: '100%' }}
                        >
                          <Card.Body>
                            <Card.Title className='mb-3'>
                              <div className='tableImage'>
                                <img
                                  src={
                                    elem.account === 'google'
                                      ? 'images/accounts/google.svg'
                                      : elem.account === 'fb'
                                      ? 'images/accounts/facebookLogo.svg'
                                      : elem.account === 'yelp'
                                      ? 'images/accounts/yelp_burst-1.svg'
                                      : elem.account === 'bing'
                                      ? 'images/accounts/microsoft.svg'
                                      : ''
                                  }
                                  alt=''
                                />
                              </div>
                              <div className='tableCardsOptions'>
                                <TableMenuDropdown
                                  hasEditOption={true}
                                  editOnClick={() => {
                                    setShow(true);
                                    setEditData(elem);
                                  }}
                                />
                              </div>
                            </Card.Title>

                            <Row>
                              <Col xs={6} className={`tableCardsElements`}>
                                <strong>SEGMENT</strong>
                                <span>Install</span>
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>AD ACCOUNT</strong>
                                <span>
                                  {elem.account === 'google'
                                    ? 'Google Ads'
                                    : elem.account === 'fb'
                                    ? 'Facebook Ads'
                                    : elem.account === 'yelp'
                                    ? 'Yelp Ads'
                                    : elem.account === 'bing'
                                    ? 'Microsoft Bing Ads'
                                    : ''}
                                </span>
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>CAMPAIGNS</strong>
                                <span>{elem.campaign_id}</span>
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>CPA</strong>
                                <CurrencyFormat
                                  value={elem.cpa}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  renderText={value => <span>{value}</span>}
                                />
                              </Col>
                              <Col className='tableCardsElements' xs={6}>
                                <strong>BUDGET SHIFTS</strong>
                                <span>
                                  {' '}
                                  <CurrencyFormat
                                    value={elem.budget_shift}
                                    displayType={'text'}
                                    suffix={'%'}
                                    renderText={value => <span>{value}</span>}
                                  />
                                </span>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              ) : (
                <div className={styles.objectivesTableWrapper}>
                  <Table
                    className={`${styles.objectivesTable} fulcrumDefaultTable`}
                  >
                    <tbody>
                      {serviceData &&
                        serviceData.map((elem, index) => {
                          return (
                            <tr key={index}>
                              <td className={styles.servicesEdit}>
                                <>
                                  <div>
                                    <strong>SEGMENT</strong>
                                    <span>Service</span>
                                  </div>
                                </>
                              </td>
                              <td className={styles.tableImage}>
                                <img
                                  src={
                                    elem.account === 'google'
                                      ? 'images/accounts/google.svg'
                                      : elem.account === 'fb'
                                      ? 'images/accounts/facebookLogo.svg'
                                      : elem.account === 'yelp'
                                      ? 'images/accounts/yelp_burst-1.svg'
                                      : elem.account === 'bing'
                                      ? 'images/accounts/microsoft.svg'
                                      : ''
                                  }
                                  alt=''
                                />
                              </td>
                              <td>
                                <strong>AD ACCOUNT</strong>
                                <span>
                                  {elem.account === 'google'
                                    ? 'Google Ads'
                                    : elem.account === 'fb'
                                    ? 'Facebook Ads'
                                    : elem.account === 'yelp'
                                    ? 'Yelp Ads'
                                    : elem.account === 'bing'
                                    ? 'Microsoft Bing Ads'
                                    : ''}
                                </span>
                              </td>
                              <td>
                                <strong>CAMPAIGNS</strong>
                                <span>{elem.campaign_id}</span>
                              </td>
                              <td>
                                <strong>CPA</strong>
                                <CurrencyFormat
                                  value={elem.cpa}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  renderText={value => <span>{value}</span>}
                                />
                              </td>
                              <td>
                                <strong>BUDGET SHIFTS</strong>
                                <span>
                                  {' '}
                                  <CurrencyFormat
                                    value={elem.budget_shift}
                                    displayType={'text'}
                                    suffix={'%'}
                                    renderText={value => <span>{value}</span>}
                                  />
                                </span>
                              </td>
                              {/* <td className='statusCol'>
                                <p className={`status ${elem.status}`}>
                                  {elem.status.toUpperCase()}
                                </p>
                              </td> */}
                              <td className={styles.optionsCol}>
                                <TableMenuDropdown
                                  hasEditOption={true}
                                  editOnClick={() => {
                                    setShow(true);
                                    setEditData(elem);
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      {salesData &&
                        salesData.map((elem, index) => {
                          return (
                            <tr key={index}>
                              <td className={styles.servicesEdit}>
                                <>
                                  <div>
                                    <strong>SEGMENT</strong>
                                    <span>Sales</span>
                                  </div>
                                  {/* <div> */}
                                  {/* <i className='fa-solid fa-pen'> </i> */}
                                  {/* </div> */}
                                </>
                              </td>
                              <td className={styles.tableImage}>
                                <img
                                  src={
                                    elem.account === 'google'
                                      ? 'images/accounts/google.svg'
                                      : elem.account === 'fb'
                                      ? 'images/accounts/facebookLogo.svg'
                                      : elem.account === 'yelp'
                                      ? 'images/accounts/yelp_burst-1.svg'
                                      : elem.account === 'bing'
                                      ? 'images/accounts/microsoft.svg'
                                      : ''
                                  }
                                  alt=''
                                />
                              </td>
                              <td>
                                <strong>AD ACCOUNT</strong>
                                <span>
                                  {elem.account === 'google'
                                    ? 'Google Ads'
                                    : elem.account === 'fb'
                                    ? 'Facebook Ads'
                                    : elem.account === 'yelp'
                                    ? 'Yelp Ads'
                                    : elem.account === 'bing'
                                    ? 'Microsoft Bing Ads'
                                    : ''}
                                </span>
                              </td>
                              <td>
                                <strong>CAMPAIGNS</strong>
                                <span>{elem.campaign_id}</span>
                              </td>
                              <td>
                                <strong>CPA</strong>
                                <CurrencyFormat
                                  value={elem.cpa}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  renderText={value => <span>{value}</span>}
                                />
                              </td>
                              <td>
                                <strong>BUDGET SHIFTS</strong>
                                <span>
                                  {' '}
                                  <CurrencyFormat
                                    value={elem.budget_shift}
                                    displayType={'text'}
                                    suffix={'%'}
                                    renderText={value => <span>{value}</span>}
                                  />
                                </span>
                              </td>
                              {/* <td className='statusCol'>
                                <p className={`status ${elem.status}`}>
                                  {elem.status.toUpperCase()}
                                </p>
                              </td> */}
                              <td className={styles.optionsCol}>
                                <TableMenuDropdown
                                  hasEditOption={true}
                                  editOnClick={() => {
                                    setShow(true);
                                    setEditData(elem);
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      {installData &&
                        installData.map((elem, index) => {
                          return (
                            <tr key={index}>
                              <td className={styles.servicesEdit}>
                                <>
                                  <div>
                                    <strong>SEGMENT</strong>
                                    <span>Install</span>
                                  </div>
                                  {/* <div> */}
                                  {/* <i className='fa-solid fa-pen'> </i> */}
                                  {/* </div> */}
                                </>
                              </td>
                              <td className={styles.tableImage}>
                                <img
                                  src={
                                    elem.account === 'google'
                                      ? 'images/accounts/google.svg'
                                      : elem.account === 'fb'
                                      ? 'images/accounts/facebookLogo.svg'
                                      : elem.account === 'yelp'
                                      ? 'images/accounts/yelp_burst-1.svg'
                                      : elem.account === 'bing'
                                      ? 'images/accounts/microsoft.svg'
                                      : ''
                                  }
                                  alt=''
                                />
                              </td>
                              <td>
                                <strong>AD ACCOUNT</strong>
                                <span>
                                  {elem.account === 'google'
                                    ? 'Google Ads'
                                    : elem.account === 'fb'
                                    ? 'Facebook Ads'
                                    : elem.account === 'yelp'
                                    ? 'Yelp Ads'
                                    : elem.account === 'bing'
                                    ? 'Microsoft Bing Ads'
                                    : ''}
                                </span>
                              </td>
                              <td>
                                <strong>CAMPAIGNS</strong>
                                <span>{elem.campaign_id}</span>
                              </td>
                              <td>
                                <strong>CPA</strong>
                                <CurrencyFormat
                                  value={elem.cpa}
                                  displayType={'text'}
                                  thousandSeparator={true}
                                  prefix={'$'}
                                  renderText={value => <span>{value}</span>}
                                />
                              </td>
                              <td>
                                <strong>BUDGET SHIFTS</strong>
                                <span>
                                  {' '}
                                  <CurrencyFormat
                                    value={elem.budget_shift}
                                    displayType={'text'}
                                    suffix={'%'}
                                    renderText={value => <span>{value}</span>}
                                  />
                                </span>
                              </td>
                              {/* <td className='statusCol'>
                                <p className={`status ${elem.status}`}>
                                  {elem.status.toUpperCase()}
                                </p>
                              </td> */}
                              <td className={styles.optionsCol}>
                                <TableMenuDropdown
                                  hasEditOption={true}
                                  editOnClick={() => {
                                    setShow(true);
                                    setEditData(elem);
                                  }}
                                />
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        )}
      />
    </>
  );
}
interface ObjectivesTableProps {
  ObjectivesTableFilters: Array<ObjectivesTableFiltersProps>;
  TableData: TableDataProps;
  show: boolean;
  setShow: (show: boolean) => void;
  setEditData: any;
}
interface ObjectivesTableFiltersProps {
  key: number;
  value: string;
}
interface TableDataProps {
  heading: string;
  data: Array<GetObjectivesResponse>;
}
interface TableContentProps {
  imageUrl: string;
  status: string;
  classifier: Array<TableContentArrayProps2>;
  content: Array<TableContentArrayProps>;
}
interface TableContentArrayProps {
  key: number;

  ObjectivesName: string;
  ObjectivesData: string;
}
type GetObjectivesResponse = {
  date_added: string;
  cpa: string;
  budget_shift: string;
  segment: string;
  account: string;
  objective: string;
  client_name: string;
  campaign_id: string;
  ad_account_id: string;
  fulcrum_email: string;
};

interface TableContentArrayProps2 {
  key: number;
  objname: string;
  objdata: string;
}
