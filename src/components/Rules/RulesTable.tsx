import React, { useState } from 'react';
import SlideToggle from 'react-slide-toggle';
import { Table, Col, Row, Container, Card } from 'react-bootstrap';
import styles from 'css/Rules.module.css';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useMediaQuery } from 'react-responsive';
import { useAppSelector } from 'app/hooks';

export default function RulesTable({
  TableData,
  show,
  setShow,
  displayRows,
  setEditData,
  setShowAddService,

  showCampaigns,
  setShowCampaigns,
  setCampaignsEditData,
  setShowAddCampaigns,

  showSegment,
  setShowSegment,
  setShowAddSegment,
  setSegmentEditData
}: RulesTableProps) {
  var CurrencyFormat = require('react-currency-format');
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const [data, setData] = useState(TableData.data);

  const deleteRuleHandler = (id: number) => {
    const temp = [...data];
    const newData = temp.filter(elem => elem.id !== id);
    setData(newData);
  };
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  return (
    <Container className='customTableStyle'>
      <Row className={`mt50 mb50 ${styles.rulesTableData} `}>
        <SlideToggle
          render={({ toggle, setCollapsibleElement, range }) => (
            <div className='my-collapsible'>
              <Row>
                <Col lg={6}>
                  <h2 className={styles.ruleTableSort}>
                    {/* {TableData.heading} */}
                    Services
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
                {activeCRMClient?.service_titan_client_id && (
                  <Col lg={6}>
                    <button
                      className='float-right customAccountsButton'
                      onClick={() => {
                        setShowAddService(true);
                      }}
                    >
                      <i className='fa-solid fa-plus'></i>
                      <span>Service Rules</span>
                    </button>
                  </Col>
                )}
              </Row>
              <div
                className='my-collapsible__content'
                ref={setCollapsibleElement}
              >
                <Col lg={12}>
                  {isTabletOrMobile ? (
                    <Row>
                      {!TableData.serviceRulesData.length ? (
                        <p>No Record Found</p>
                      ) : (
                        TableData.serviceRulesData.map((elem, index) => {
                          return (
                            <Col sm={6}>
                              <Card
                                className='responsiveTableCards mb-4 '
                                style={{ width: '100%' }}
                              >
                                <Card.Body>
                                  <Card.Title className='mb-3'>
                                    <div className=' tableImage'></div>

                                    <div className='tableCardsOptions justify-content-end'>
                                      <TableMenuDropdown
                                        hasEditOption={true}
                                        editOnClick={() => {
                                          setShow(true);
                                          setEditData(elem);
                                        }}
                                        // deleteHandler={() => {
                                        //   deleteRuleHandler(index);
                                        // }}
                                      />
                                    </div>
                                  </Card.Title>
                                  <Row>
                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>AD ACCOUNT</strong>
                                      <span>{elem.ad_account_id}</span>
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>SEGMENT</strong>
                                      <span>{elem.service_name}</span>
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>ROLLUP CAMPAIGNS</strong>
                                      <span>{elem.rollup_campaigns}</span>
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>ROLLUP BUDGET</strong>

                                      <CurrencyFormat
                                        value={elem.rollup_budget}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>ROLLUP CPA</strong>
                                      <CurrencyFormat
                                        value={elem.rollup_cpa}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>ROLLUP SCALABILITY</strong>
                                      <CurrencyFormat
                                        value={elem.rollup_scalability}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'%'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })
                      )}
                    </Row>
                  ) : (
                    <div
                      style={{
                        height:
                          TableData.serviceRulesData.length > 3
                            ? '220px'
                            : 'inherit'
                      }}
                      className={
                        TableData.serviceRulesData.length > 3
                          ? 'tableScrollWrap'
                          : ''
                      }
                    >
                      <Table
                        className={`${styles.segmentsTable} fulcrumDefaultTable`}
                      >
                        <tbody>
                          {!TableData.serviceRulesData.length ? (
                            <p>No Record Found</p>
                          ) : (
                            TableData.serviceRulesData.map((elem, index) => {
                              return (
                                <tr key={index} className='trBorder'>
                                  <td>
                                    <strong>AD ACCOUNT</strong>
                                    <span>{elem.ad_account_id}</span>
                                  </td>

                                  <td>
                                    <strong>SEGMENT</strong>
                                    <span>{elem.service_name}</span>
                                  </td>

                                  <td>
                                    <strong>ROLLUP CAMPAIGNS</strong>
                                    <span>{elem.rollup_campaigns}</span>
                                  </td>

                                  <td>
                                    <strong>ROLLUP BUDGET</strong>

                                    <CurrencyFormat
                                      value={elem.rollup_budget}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      prefix={'$'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td>
                                    <strong>ROLLUP CPA</strong>
                                    <CurrencyFormat
                                      value={elem.rollup_cpa}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      prefix={'$'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td>
                                    <strong>ROLLUP SCALABILITY</strong>
                                    <CurrencyFormat
                                      value={elem.rollup_scalability}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      suffix={'%'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td className={styles.optionsCol}>
                                    <TableMenuDropdown
                                      hasEditOption={true}
                                      editOnClick={() => {
                                        setShow(true);
                                        setEditData(elem);
                                      }}
                                      // deleteHandler={() => {
                                      //   deleteRuleHandler(index);
                                      // }}
                                    />
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
      </Row>

      <Row className={`mb50 ${styles.rulesTableData} `}>
        <SlideToggle
          render={({ toggle, setCollapsibleElement, range }) => (
            <div className='my-collapsible'>
              <Row>
                <Col lg={6}>
                  <h2 className={styles.ruleTableSort}>
                    {/* {TableData.heading} */}
                    Campaigns
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
                {activeCRMClient?.service_titan_client_id && (
                  <Col lg={6}>
                    <button
                      className='float-right customAccountsButton'
                      onClick={() => {
                        setShowAddCampaigns(true);
                      }}
                    >
                      <i className='fa-solid fa-plus'></i>
                      <span>Campaign Rules</span>
                    </button>
                  </Col>
                )}
              </Row>
              <div
                className='my-collapsible__content'
                ref={setCollapsibleElement}
              >
                <Col lg={12}>
                  {isTabletOrMobile ? (
                    <Row>
                      {!TableData.campaignsRulesData.length ? (
                        <p>No Record Found</p>
                      ) : (
                        TableData.campaignsRulesData.map((elem, index) => {
                          return (
                            <Col sm={6}>
                              <Card
                                className='responsiveTableCards mb-4 '
                                style={{ width: '100%' }}
                              >
                                <Card.Body>
                                  <Card.Title className='mb-3'>
                                    <div className=' tableImage'></div>
                                    <div className='tableCardsOptions justify-content-end'>
                                      <TableMenuDropdown
                                        hasEditOption={true}
                                        editOnClick={() => {
                                          setShowCampaigns(true);
                                          setCampaignsEditData(elem);
                                        }}
                                        // deleteHandler={() => {
                                        //   deleteRuleHandler(index);
                                        // }}
                                      />
                                    </div>
                                  </Card.Title>
                                  <Row>
                                    <Col xs={12} className='tableCardsElements'>
                                      <strong>CAMPAIGN NAME</strong>
                                      <span>{elem.campaign_name}</span>
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>BUDGET</strong>
                                      <CurrencyFormat
                                        value={elem.budget}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>CPA</strong>
                                      <CurrencyFormat
                                        value={elem.cpa}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>ROAS</strong>
                                      <CurrencyFormat
                                        value={elem.roas}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>SPEND</strong>
                                      <CurrencyFormat
                                        value={elem.spend}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>SCALE</strong>
                                      <CurrencyFormat
                                        value={elem.scale}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'%'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })
                      )}
                    </Row>
                  ) : (
                    <div
                      style={{
                        height:
                          TableData.campaignsRulesData.length > 3
                            ? '220px'
                            : 'inherit'
                      }}
                      className={
                        TableData.campaignsRulesData.length > displayRows
                          ? 'tableScrollWrap'
                          : ''
                      }
                    >
                      <Table
                        className={`${styles.segmentsTable} fulcrumDefaultTable`}
                      >
                        <tbody>
                          {!TableData.campaignsRulesData.length ? (
                            <p>No Record Found</p>
                          ) : (
                            TableData.campaignsRulesData.map((elem, index) => {
                              return (
                                <tr key={index} className='trBorder'>
                                  <td>
                                    <strong>CAMPAIGN NAME</strong>
                                    <span>{elem.campaign_name}</span>
                                  </td>

                                  <td>
                                    <strong>BUDGET</strong>
                                    <CurrencyFormat
                                      value={elem.budget}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      prefix={'$'}
                                      renderText={value => <span>{value}</span>}
                                    />
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
                                    <strong>ROAS</strong>
                                    <CurrencyFormat
                                      value={elem.roas}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      prefix={'$'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td>
                                    <strong>SPEND</strong>
                                    <CurrencyFormat
                                      value={elem.spend}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      prefix={'$'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td>
                                    <strong>SCALE</strong>
                                    <CurrencyFormat
                                      value={elem.scale}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      suffix={'%'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td className={styles.optionsCol}>
                                    <TableMenuDropdown
                                      hasEditOption={true}
                                      editOnClick={() => {
                                        setShowCampaigns(true);
                                        setCampaignsEditData(elem);
                                      }}
                                      // deleteHandler={() => {
                                      //   deleteRuleHandler(index);
                                      // }}
                                    />
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
      </Row>

      <Row className={`mb50 ${styles.rulesTableData} `}>
        <SlideToggle
          render={({ toggle, setCollapsibleElement, range }) => (
            <div className='my-collapsible'>
              <Row>
                <Col lg={6}>
                  <h2 className={styles.ruleTableSort}>
                    {/* {TableData.heading} */}
                    Segments
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
                {activeCRMClient?.service_titan_client_id && (
                  <Col lg={6}>
                    <button
                      className='float-right customAccountsButton'
                      onClick={() => {
                        setShowAddSegment(true);
                      }}
                    >
                      <i className='fa-solid fa-plus'></i>
                      <span>Segment Rules</span>
                    </button>
                  </Col>
                )}
              </Row>
              <div
                className='my-collapsible__content'
                ref={setCollapsibleElement}
              >
                <Col lg={12}>
                  {isTabletOrMobile ? (
                    <Row>
                      {!TableData.segmentRulesData.length ? (
                        <p>No Record Found</p>
                      ) : (
                        TableData.segmentRulesData.map((elem, index) => {
                          return (
                            <Col sm={6}>
                              <Card
                                className='responsiveTableCards mb-4 '
                                style={{ width: '100%' }}
                              >
                                <Card.Body>
                                  <Card.Title className='mb-3'>
                                    <div className=' tableImage'></div>

                                    <div className='tableCardsOptions justify-content-end'>
                                      <TableMenuDropdown
                                        hasEditOption={true}
                                        editOnClick={() => {
                                          setShowSegment(true);
                                          setSegmentEditData(elem);
                                        }}
                                        // deleteHandler={() => {
                                        //   deleteRuleHandler(index);
                                        // }}
                                      />
                                    </div>
                                  </Card.Title>
                                  <Row>
                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>SEGMENT NAME</strong>
                                      <span>{elem.segment_name}</span>
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>ROLLUP BUDGET</strong>
                                      <CurrencyFormat
                                        value={elem.rollup_budget}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>OBJECTIVE</strong>
                                      <span>N/A</span>
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>ROLLUP TEAM</strong>
                                      <span>{elem.rollup_team}</span>
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>ROLLUP CPA</strong>
                                      <CurrencyFormat
                                        value={elem.rollup_cpa}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>ROLLUP ROAS</strong>
                                      <CurrencyFormat
                                        value={elem.rollup_roas}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        suffix={'%'}
                                        renderText={value => (
                                          <span>{value}</span>
                                        )}
                                      />
                                    </Col>

                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>
                                        ROLLUP JOBS OR DAILY HOURS
                                      </strong>
                                      <span>
                                        {elem.rollup_jobs_or_daily_hours}
                                      </span>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })
                      )}
                    </Row>
                  ) : (
                    <div
                      style={{
                        height:
                          TableData.segmentRulesData.length > 3
                            ? '220px'
                            : 'inherit'
                      }}
                      className={
                        TableData.segmentRulesData.length > displayRows
                          ? 'tableScrollWrap'
                          : ''
                      }
                    >
                      <Table
                        className={`${styles.segmentsTable} fulcrumDefaultTable`}
                      >
                        <tbody>
                          {!TableData.segmentRulesData.length ? (
                            <p>No Record Found</p>
                          ) : (
                            TableData.segmentRulesData.map((elem, index) => {
                              return (
                                <tr key={index} className='trBorder'>
                                  <td>
                                    <strong>SEGMENT NAME</strong>
                                    <span>{elem.segment_name}</span>
                                  </td>

                                  <td>
                                    <strong>ROLLUP BUDGET</strong>
                                    <CurrencyFormat
                                      value={elem.rollup_budget}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      prefix={'$'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td>
                                    <strong>OBJECTIVE</strong>
                                    <span>N/A</span>
                                  </td>

                                  <td>
                                    <strong>ROLLUP TEAM</strong>
                                    <span>{elem.rollup_team}</span>
                                  </td>

                                  <td>
                                    <strong>ROLLUP CPA</strong>
                                    <CurrencyFormat
                                      value={elem.rollup_cpa}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      prefix={'$'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td>
                                    <strong>ROLLUP ROAS</strong>
                                    <CurrencyFormat
                                      value={elem.rollup_roas}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      suffix={'%'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td>
                                    <strong>ROLLUP JOBS OR DAILY HOURS</strong>
                                    <span>
                                      {elem.rollup_jobs_or_daily_hours}
                                    </span>
                                  </td>

                                  <td className={styles.optionsCol}>
                                    <TableMenuDropdown
                                      hasEditOption={true}
                                      editOnClick={() => {
                                        setShowSegment(true);
                                        setSegmentEditData(elem);
                                      }}
                                      // deleteHandler={() => {
                                      //   deleteRuleHandler(index);
                                      // }}
                                    />
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
      </Row>
    </Container>
  );
}
interface RulesTableProps {
  TableData: TableDataProps;
  show: boolean;
  setShow: (show: boolean) => void;
  displayRows: number;
  setEditData: any;
  setShowAddService: (show: boolean) => void;

  showCampaigns: boolean;
  setShowCampaigns: (show: boolean) => void;
  setCampaignsEditData: any;

  showSegment: boolean;
  setShowSegment: (show: boolean) => void;
  setShowAddSegment: (show: boolean) => void;
  setShowAddCampaigns: (show: boolean) => void;
  setSegmentEditData: any;
}

interface TableDataProps {
  heading: string;
  icon: string;
  data: Array<TableContentProps>;
  serviceRulesData: Array<serviceRulesData>;
  campaignsRulesData: Array<campaignsRulesData>;
  segmentRulesData: Array<segmentRulesData>;
}
type segmentRulesData = {
  crm_client_name: string;
  service_titan_id: string;
  segment_name: string;
  rollup_budget: string;
  objective: string;
  rollup_team: 0;
  rollup_cpa: string;
  rollup_roas: string;
  rollup_jobs_or_daily_hours: string;
};
type serviceRulesData = {
  service_name: string;
  rollup_budget: string;
  service_titan_id: string;
  crm_client_name: string;
  rollup_scalability: string;
  ad_account_id: string;
  rollup_cpa: string;
  rollup_campaigns: string;
};
type campaignsRulesData = {
  crm_client_name: string;
  service_titan_id: string;
  campaign_name: string;
  campaign_id: string;
  budget: string;
  cpa: string;
  roas: string;
  scale: string;
  spend: string;
};
interface TableContentProps {
  id: number;
  imageUrl: string;
  content: Array<TableContentArrayProps>;
}
interface TableContentArrayProps {
  key: number;
  name: string;
  data: string;
}
