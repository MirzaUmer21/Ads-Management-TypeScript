import React, { useState } from 'react';
import { Card, Col, Row, Table } from 'react-bootstrap';
import styles from 'css/Segments.module.css';
import TableFilters from 'shared/TableFilters';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useMediaQuery } from 'react-responsive';
import SlideToggle from 'react-slide-toggle';
export default function SegmentsTable({
  SegmentsTableFilters,
  TableData,
  show,
  setShow,
  setEditData
}: SegmentsTableProps) {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const [data, setData] = useState(TableData.data);
  const deleteSegmentHandler = (id: number) => {
    const temp = [...data];
    const newData = temp.filter(elem => elem.id !== id);
    setData(newData);
  };
  return (
    <>
      <SlideToggle
        render={({ toggle, setCollapsibleElement, range }) => (
          <div className='my-collapsible'>
            <div>
              <h2 className={styles.tableHeading}>{TableData.heading} </h2>
              <TableFilters
                TableFiltersData={SegmentsTableFilters}
                toggle={toggle}
                range={range}
              />
            </div>
            <div
              className='my-collapsible__content'
              ref={setCollapsibleElement}
            >
              <div>
                {isTabletOrMobile ? (
                  <Row>
                    {!data.length ? (
                      <p>No Record Found</p>
                    ) : (
                      data.map((elem, index) => {
                        return (
                          <Col sm={6}>
                            <Card
                              className='responsiveTableCards mb-4 '
                              style={{ width: '100%' }}
                            >
                              <Card.Body>
                                <Card.Title className='mb-3'>
                                  <div className=' tableImage'>
                                    <img src={elem.imageUrl} alt='' />
                                  </div>
                                  <div className='tableCardsOptions'>
                                    <i
                                      className='fa-solid fa-pen'
                                      onClick={() => {
                                        setShow(true);
                                        setEditData(elem);
                                      }}
                                    ></i>
                                    <TableMenuDropdown
                                      hasEditOption={false}
                                      deleteHandler={() => {
                                        deleteSegmentHandler(elem.id);
                                      }}
                                    />
                                  </div>
                                </Card.Title>
                                <Row>
                                  {elem.content.map((el, ind) => {
                                    return (
                                      <Col
                                        xs={6}
                                        className='tableCardsElements'
                                        key={ind}
                                      >
                                        <strong>{el.SegmentName}</strong>
                                        <span>{el.SegmentData}</span>
                                      </Col>
                                    );
                                  })}
                                  <Col
                                    xs={12}
                                    className='tableCardsElements pb-0'
                                  >
                                    <p className={`mb-0 status ${elem.status}`}>
                                      {elem.status.toUpperCase()}
                                    </p>
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
                      height: data.length > 2 ? '170px' : 'inherit'
                    }}
                    className={data.length > 2 ? 'tableScrollWrap' : ''}
                  >
                    <Table
                      className={`${styles.segmentsTable} fulcrumDefaultTable`}
                    >
                      <tbody>
                        {!data.length ? (
                          <p>No Record Found</p>
                        ) : (
                          data.map((elem, index) => {
                            return (
                              <tr key={index}>
                                <td>
                                  <img src={elem.imageUrl} alt='' />
                                </td>
                                {elem.content.map((el, ind) => {
                                  return (
                                    <td key={ind}>
                                      <strong>{el.SegmentName}</strong>
                                      <span>{el.SegmentData}</span>
                                    </td>
                                  );
                                })}
                                <td className='statusCol'>
                                  <p className={`status ${elem.status}`}>
                                    {elem.status.toUpperCase()}
                                  </p>
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
                                    deleteHandler={() => {
                                      deleteSegmentHandler(elem.id);
                                    }}
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
              </div>
            </div>
          </div>
        )}
      />
    </>
  );
}
interface SegmentsTableProps {
  SegmentsTableFilters: Array<SegmentsTableFiltersProps>;
  TableData: TableDataProps;
  show: boolean;
  setShow: (show: boolean) => void;
  setEditData: any;
}
interface SegmentsTableFiltersProps {
  key: number;
  value: string;
}
interface TableDataProps {
  heading: string;
  data: Array<TableContentProps>;
}
interface TableContentProps {
  id: number;
  imageUrl: string;
  status: string;
  content: Array<TableContentArrayProps>;
}
interface TableContentArrayProps {
  key: number;
  SegmentName: string;
  SegmentData: string;
}
