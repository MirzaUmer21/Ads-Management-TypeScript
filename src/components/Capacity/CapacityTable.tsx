import React, { useEffect, useState } from 'react';
import SlideToggle from 'react-slide-toggle';
import TableStyles from 'css/Dashboard.module.css';
import { Table, Form, Row, Col, Card } from 'react-bootstrap';
import styles from 'css/Capacity.module.css';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useMediaQuery } from 'react-responsive';

export default function CapacityTable({
  setShow,
  TableData,
  setEditData
}: CapacityTableProps) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const [capacityData, setcapacityData] = useState<Array<CapacityTableData>>(
    TableData.data
  );
  const [searchInput, setSearchInput] = useState('');
  const deleteCapacityHandler = (id: number) => {
    const temp = [...capacityData];
    const newData = temp.filter(elem => elem.userid !== id);
    setcapacityData(newData);
  };

  const handleChange = e => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };
  const getMax = () => {
    let max = 0;
    capacityData.map(elem => {
      // console.log(elem.max);
      if (elem.max !== null) {
        max = max + elem.max;
      }
      return null;
    });
    return max;
  };

  useEffect(() => {
    setcapacityData(TableData.data);
  }, []);
  // console.log(max);
  return (
    <div style={{ marginBottom: '50px' }}>
      <SlideToggle
        render={({ toggle, setCollapsibleElement, range }) => (
          <div className='my-collapsible'>
            <div className='d-flex justify-content-between mb-2 align-items-center'>
              <h2 className={TableStyles.actionTableSort}>
                {TableData.heading}
                <i
                  onClick={toggle}
                  style={{ marginLeft: '10px' }}
                  className={`my-collapsible__toggle ${
                    !range ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'
                  }`}
                ></i>
              </h2>

              <input
                type='search'
                placeholder='Search By Name'
                onChange={handleChange}
                value={searchInput}
                className='tableSearchBar'
              />
            </div>

            <div
              className='my-collapsible__content'
              ref={setCollapsibleElement}
            >
              {!isTabletOrMobile ? (
                <>
                  <div
                    style={{
                      height: TableData.data.length > 6 ? '450px' : 'inherit'
                    }}
                    className={capacityData.length > 6 ? 'tableScrollWrap' : ''}
                  >
                    <Table
                      className={`${styles.capacityTable} fulcrumDefaultTable`}
                    >
                      <tbody>
                        {!capacityData.length ? (
                          <p>No Record Found.</p>
                        ) : (
                          capacityData
                            .filter(elem => {
                              if (searchInput === '') {
                                return elem;
                              } else if (
                                elem.user_name
                                  .toLowerCase()
                                  .includes(searchInput.toLowerCase())
                              ) {
                                return elem;
                              }
                            })
                            .map((elem, index) => {
                              return (
                                <tr key={index} className='trBorder'>
                                  <td>
                                    <Form.Check type='checkbox' label='' />
                                  </td>
                                  <td>
                                    <img
                                      src='images/accounts/user_1.png'
                                      alt=''
                                    />
                                  </td>

                                  <td>
                                    <strong>name</strong>
                                    <span>{elem.user_name}</span>
                                  </td>

                                  <td>
                                    <strong>max</strong>
                                    <span>{elem.max}</span>
                                  </td>
                                  <td>
                                    <strong>unit</strong>
                                    <span>{elem.unit}</span>
                                  </td>
                                  <td>
                                    <strong>time</strong>
                                    <span>{elem.time}</span>
                                  </td>
                                  <td>
                                    <strong>Segment</strong>
                                    <span className='textCapitalize'>
                                      {elem.segment}
                                    </span>
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
                                  <td className={styles.optionsCol}>
                                    <TableMenuDropdown
                                      hasEditOption={false}
                                      // deleteHandler={() => {
                                      //   deleteCapacityHandler(elem.userid);
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
                  <Table
                    className={`${styles.capacityTable} fulcrumDefaultTable`}
                  >
                    <tbody>
                      <tr className={styles.capacityTotalRow}>
                        <td>
                          <strong>Total</strong>
                        </td>
                        <td>
                          <img src='' alt='' />
                        </td>
                        <td>
                          <strong>{capacityData.length} Members</strong>
                        </td>
                        <td>
                          <strong>{getMax()}</strong>
                        </td>
                        <td>
                          <strong>Job/Hours</strong>
                        </td>
                        <td>
                          <strong>/day</strong>
                        </td>
                        <td>
                          <strong>{TableData.heading}</strong>
                        </td>
                        {/* {elem.content.map((el, ind) => {
                                return (
                                  <td key={ind}>
                                    <strong>{el.value}</strong>
                                  </td>
                                );
                              })} */}
                        <td className={styles.editCol}></td>
                        <td className={styles.optionsCol}></td>
                      </tr>
                    </tbody>
                  </Table>
                </>
              ) : (
                <Row>
                  {!capacityData.length ? (
                    <p>No Record Found.</p>
                  ) : (
                    capacityData
                      .filter(elem => {
                        if (searchInput === '') {
                          return elem;
                        } else if (
                          elem.user_name
                            .toLowerCase()
                            .includes(searchInput.toLowerCase())
                        ) {
                          return elem;
                        }
                      })
                      .map((elem, index) => {
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

                                    <span
                                      className={` ${styles.capacityBoxImage}`}
                                    >
                                      <img
                                        src='images/accounts/user_1.png'
                                        alt='$$$'
                                      />
                                    </span>
                                  </div>
                                  <div className='tableCardsOptions justify-content-end'>
                                    <i
                                      onClick={() => {
                                        setShow(true);
                                        setEditData(elem);
                                      }}
                                      className='fa-solid fa-pen'
                                    ></i>
                                    <TableMenuDropdown
                                      hasEditOption={false}
                                      // deleteHandler={() => {
                                      //   deleteCapacityHandler(elem.userid);
                                      // }}
                                    />
                                  </div>
                                </Card.Title>
                                <Row>
                                  <Col xs={6} className='tableCardsElements'>
                                    <strong>name</strong>
                                    <span>{elem.user_name}</span>
                                  </Col>
                                  <Col xs={6} className='tableCardsElements'>
                                    <strong>max</strong>
                                    <span>{elem.max}</span>
                                  </Col>
                                  <Col xs={6} className='tableCardsElements'>
                                    <strong>unit</strong>
                                    <span>{elem.unit}</span>
                                  </Col>
                                  <Col xs={6} className='tableCardsElements'>
                                    <strong>time</strong>
                                    <span>{elem.time}</span>
                                  </Col>
                                  <Col xs={6} className='tableCardsElements'>
                                    <strong>Segment</strong>
                                    <span className='textCapitalize'>
                                      {elem.segment}
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
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}

interface CapacityTableProps {
  setShow: (show: boolean) => void;
  TableData: TableDataProps;
  setEditData: any;
}

interface TableDataProps {
  heading: string;
  data: Array<CapacityTableData>;
}

interface CapacityTableData {
  userid: number;
  user_name: string;
  user_image: string;
  max: number | null;
  unit: string | number | null;
  time: string | number | null;
  segment: string | number | null;
}
