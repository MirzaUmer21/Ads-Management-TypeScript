import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import styles from 'css/Budgets.module.css';
import SlideToggle from 'react-slide-toggle';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import MediaQuery from 'react-responsive';
import { useMediaQuery } from 'react-responsive';
import filterStyles from 'css/TableFilters.module.css';

export default function BudgetsTable({
  BudgetsTableFilters,
  TableData,
  setShow,
  setEditModelShow,
  setEditData
}: BudgetsTableProps) {
  var CurrencyFormat = require('react-currency-format');

  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const [data, setData] = useState(TableData.data);
  const [isFilter, setIsFilter] = useState(false);
  let budgetSum = 0;
  const toggleTableFilter = () => {
    isFilter ? setIsFilter(false) : setIsFilter(true);
  };
  const getDataSum = () => {
    TableData.data.forEach(elem => {
      budgetSum = budgetSum + elem.budget;
    });
    return budgetSum;
  };
  return (
    <>
      <SlideToggle
        render={({ toggle, setCollapsibleElement, range }) => (
          <div className='my-collapsible'>
            <div>
              <div
                className='d-flex'
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <h2
                  className={styles.tableHeading}
                  style={{ marginRight: '15px' }}
                >
                  {TableData.heading}{' '}
                  {isTabletOrMobile && (
                    <i
                      onClick={toggle}
                      className={`my-collapsible__toggle ${
                        !range
                          ? 'fa-solid fa-angle-up'
                          : 'fa-solid fa-angle-down'
                      }`}
                    ></i>
                  )}
                </h2>
                <p
                  className='mt-3'
                  style={{ fontSize: '14px', color: '#8992A3' }}
                >
                  *all data based on 30 days rolling average
                </p>
              </div>
            </div>
            <>
              <MediaQuery minWidth={1200}>
                <div className={filterStyles.filtersWrapper}>
                  <ul className={filterStyles.filterList}>
                    <li>
                      Total{' '}
                      <CurrencyFormat
                        value={getDataSum()}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                        renderText={value => <span>{value}</span>}
                      />
                      <i className='fa-solid fa-pipe'></i>
                    </li>
                    {BudgetsTableFilters?.map((elem, index) => {
                      return (
                        <li key={index}>
                          {elem.value}
                          <i className='fa-solid fa-pipe'></i>
                        </li>
                      );
                    })}
                    <li>
                      <i
                        onClick={toggle}
                        className={`my-collapsible__toggle ${
                          !range
                            ? 'fa-solid fa-angle-up'
                            : 'fa-solid fa-angle-down'
                        }`}
                      ></i>
                    </li>
                  </ul>
                </div>
              </MediaQuery>
              <MediaQuery maxWidth={1200}>
                <div
                  className={`${isFilter ? filterStyles.enableFilter : ''} ${
                    filterStyles.mobileFilter
                  }`}
                >
                  <i
                    style={{ cursor: 'pointer' }}
                    onClick={toggleTableFilter}
                    className='fa-solid fa-filter filterIcon mb-2'
                  ></i>

                  {isFilter && (
                    <div className={filterStyles.filtersWrapper}>
                      <ul className={filterStyles.filterList}>
                        <li>
                          Total
                          <CurrencyFormat
                            value={getDataSum()}
                            displayType={'text'}
                            thousandSeparator={true}
                            prefix={'$'}
                            renderText={value => <span>{value}</span>}
                          />
                          <i className='fa-solid fa-pipe'></i>
                        </li>
                        {BudgetsTableFilters?.map((elem, index) => {
                          return (
                            <li key={index}>
                              {elem.value}
                              <i
                                className={`${filterStyles.filterBars} fa-solid fa-pipe`}
                              ></i>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </MediaQuery>
            </>

            <div
              className='my-collapsible__content'
              ref={setCollapsibleElement}
            >
              <Row>
                {isTabletOrMobile ? (
                  <>
                    {!TableData.data.length ? (
                      <p>No Record Found</p>
                    ) : (
                      TableData.data.map((elem, index) => {
                        return (
                          <Col sm={6}>
                            <Card
                              className='responsiveTableCards mb-4 '
                              style={{ width: '100%' }}
                            >
                              <Card.Body>
                                <Card.Title className='mb-3'>
                                  <div className=' tableImage'>
                                    <img
                                      src={
                                        elem.account === 'google'
                                          ? 'images/accounts/google.svg'
                                          : elem.account === 'fb'
                                          ? 'images/accounts/facebookLogo.svg'
                                          : ''
                                      }
                                      alt=''
                                    />
                                  </div>
                                </Card.Title>
                                <Row>
                                  <Col className='tableCardsElements' xs={6}>
                                    <strong>Ad account</strong>
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
                                    <strong>BUDGET</strong>

                                    <CurrencyFormat
                                      value={elem.budget}
                                      displayType={'text'}
                                      thousandSeparator={true}
                                      prefix={'$'}
                                      renderText={value => <span>{value}</span>}
                                    />
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
                                    <strong>ESTIMATED SCALABILITY</strong>
                                    <CurrencyFormat
                                      value={elem.estimated_scalability}
                                      displayType={'text'}
                                      suffix={'%'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </Col>

                                  <Col
                                    className='tableCardsElements statusCol'
                                    xs={6}
                                  >
                                    <Button
                                      onClick={() => {
                                        setEditModelShow(true);
                                        setEditData(elem);
                                      }}
                                      className={`defaultButton`}
                                    >
                                      Edit Budget
                                    </Button>
                                  </Col>

                                  <Col
                                    xs={12}
                                    className='tableCardsElements pb-0'
                                  >
                                    <div className='statusCol'>
                                      {elem.buttonData && (
                                        <Button
                                          onClick={() => setShow(true)}
                                          className={`defaultButton`}
                                        >
                                          {elem.buttonData}
                                        </Button>
                                      )}
                                    </div>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })
                    )}
                  </>
                ) : (
                  <Col lg={12}>
                    <div
                      style={{
                        height: data.length > 3 ? '230px' : 'inherit'
                      }}
                      className={data.length > 3 ? 'tableScrollWrap' : ''}
                    >
                      <Table
                        className={`${styles.budgetsTable} fulcrumDefaultTable`}
                      >
                        <tbody>
                          {!TableData.data.length ? (
                            <p>No Record Found</p>
                          ) : (
                            TableData.data.map((elem, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <img
                                      src={
                                        elem.account === 'google'
                                          ? 'images/accounts/google.svg'
                                          : elem.account === 'fb'
                                          ? 'images/accounts/facebookLogo.svg'
                                          : elem.account === 'bing'
                                          ? 'images/accounts/microsoft.svg'
                                          : elem.account === 'yelp'
                                          ? 'images/accounts/yelp_burst-1.svg'
                                          : ''
                                      }
                                      alt=''
                                    />
                                  </td>
                                  <td>
                                    <strong>Ad account</strong>
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
                                    <strong>ESTIMATED SCALABILITY</strong>
                                    <CurrencyFormat
                                      value={elem.estimated_scalability}
                                      displayType={'text'}
                                      suffix={'%'}
                                      renderText={value => <span>{value}</span>}
                                    />
                                  </td>

                                  <td className='statusCol'>
                                    <Button
                                      onClick={() => {
                                        setEditModelShow(true);
                                        setEditData(elem);
                                      }}
                                      className={`defaultButton`}
                                    >
                                      Edit Budget
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                )}
              </Row>
            </div>
          </div>
        )}
      />
    </>
  );
}

interface BudgetsTableProps {
  BudgetsTableFilters: Array<BudgetsTableFiltersProps>;
  TableData: TableDataProps;
  setShow: (show: boolean) => void;
  setEditModelShow: (show: boolean) => void;
  setEditData: any;
}

interface BudgetsTableFiltersProps {
  key: number;
  value: string;
}
interface TableDataProps {
  heading: string;
  data: Array<any>;
}
