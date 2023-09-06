import { Card, Col, Form, Row, Table } from 'react-bootstrap';
import styles from 'css/Dashboard.module.css';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useMediaQuery } from 'react-responsive';
import { useState } from 'react';
import SlideToggle from 'react-slide-toggle';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useUpdateDashboardLogsMutation } from 'services/dashboardApi';
export default function DashboardTable({
  TableData,
  setEditShow,
  setEditData
}: DashboardTableProps) {
  const navigate = useNavigate();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const [data, setData] = useState(TableData.data);
  const [UpdateDashboardLogsAction, UpdateDashboardLogsResponse] =
    useUpdateDashboardLogsMutation();

  const deleteHandler = (index: number) => {
    let temp = [...data];

    const newData = temp.filter((v, i) => i !== index);
    setData(newData);
  };

  const UpdateDashboardEntry = async (data, agree) => {
    const temp = { ...data };
    temp.agree = agree;

    try {
      const response: any = await UpdateDashboardLogsAction(temp).unwrap();

      if (response) {
        toast.success(response);
        navigate('/dashboard');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const formatDate = (date: any) => {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const month = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    let ap = hours === 0 ? 'am' : hours >= 12 ? 'am' : 'pm';
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, '0');
    let mergeTime = hours + ':' + minutes + ap;
    const completeOnDate =
      month + 1 + '/' + day + '/' + year + ' @ ' + mergeTime;
    return completeOnDate;
  };
  return (
    <>
      <Row className={`customTableStyle ${styles.dashboardTableData}`}>
        <SlideToggle
          render={({ toggle, setCollapsibleElement, range }) => (
            <div className='my-collapsible'>
              <Col lg={12}>
                <h2 className={styles.actionTableSort}>
                  {TableData.heading}
                  <i
                    onClick={toggle}
                    className={`my-collapsible__toggle ${
                      !range ? 'fa-solid fa-angle-up' : 'fa-solid fa-angle-down'
                    }`}
                  ></i>
                </h2>
              </Col>
              <div
                className='my-collapsible__content'
                ref={setCollapsibleElement}
              >
                {isTabletOrMobile ? (
                  <Row>
                    {TableData.dashboardData.map((elem, index) => {
                      const date = new Date(elem.on);

                      const onFormatted = formatDate(date);
                      return (
                        <Col sm={6}>
                          <Card
                            className='responsiveTableCards mb-4 '
                            style={{ width: '100%' }}
                          >
                            <Card.Body>
                              <Card.Title className='mb-3'>
                                <div className=' tableImage'></div>
                                <div className='tableCardsOptions'>
                                  <TableMenuDropdown
                                    hasEditOption={true}
                                    editOnClick={() => {
                                      setEditData(elem);
                                      setEditShow(true);
                                    }}
                                    deleteHandler={() => deleteHandler(index)}
                                  />
                                </div>
                              </Card.Title>

                              <Row>
                                <Col className='tableCardsElements' xs={12}>
                                  <strong>ON</strong>
                                  <span style={{ textTransform: 'none' }}>
                                    {onFormatted}
                                  </span>
                                </Col>
                                <Col className='tableCardsElements' xs={6}>
                                  <strong>SEGMENT</strong>
                                  <span>{elem.segment}</span>
                                </Col>
                                <Col className='tableCardsElements' xs={6}>
                                  <strong>METRIC</strong>
                                  <span>{elem.metric}</span>
                                </Col>
                                <Col className='tableCardsElements' xs={6}>
                                  <strong>HAD CONDITION</strong>
                                  <span>{elem.had_condition}</span>
                                </Col>
                                <Col className='tableCardsElements' xs={6}>
                                  <strong>OF</strong>
                                  <span>{elem.of}</span>
                                </Col>
                                <Col className='tableCardsElements' xs={12}>
                                  <strong>ACTION TAKEN</strong>
                                  <span>{elem.action_taken}</span>
                                </Col>

                                <Col className='tableCardsElements' xs={12}>
                                  <strong>Agree</strong>
                                  <span>
                                    <Form.Check
                                      inline
                                      label='Yes'
                                      name={`${Math.random()}group ${index}`}
                                      type='radio'
                                      defaultChecked={
                                        elem.agree === 'yes' && true
                                      }
                                      onChange={() => {
                                        UpdateDashboardEntry(elem, 'yes');
                                      }}
                                    />
                                    <Form.Check
                                      inline
                                      label='No'
                                      name={`${Math.random()}group ${index}`}
                                      type='radio'
                                      defaultChecked={
                                        elem.agree === 'no' && true
                                      }
                                      onChange={() => {
                                        UpdateDashboardEntry(elem, 'no');
                                      }}
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
                  <Col lg={12}>
                    <div
                      style={{
                        height:
                          TableData.dashboardData.length > 6
                            ? '450px'
                            : 'inherit'
                      }}
                      className={
                        TableData.dashboardData.length > 6
                          ? 'tableScrollWrap'
                          : ''
                      }
                    >
                      <Table className='fulcrumDefaultTable'>
                        <tbody>
                          {TableData.dashboardData &&
                            TableData.dashboardData.map((elem, index) => {
                              const date = new Date(elem.on);

                              const onFormatted = formatDate(date);
                              return (
                                <tr key={index} className='trBorder'>
                                  <td>
                                    <strong>ON</strong>
                                    <span style={{ textTransform: 'none' }}>
                                      {onFormatted}
                                    </span>
                                  </td>
                                  <td>
                                    <strong>SEGMENT</strong>
                                    <span>{elem.segment}</span>
                                  </td>
                                  <td>
                                    <strong>METRIC</strong>
                                    <span>{elem.metric}</span>
                                  </td>
                                  <td>
                                    <strong>HAD CONDITION</strong>
                                    <span>{elem.had_condition}</span>
                                  </td>
                                  <td>
                                    <strong>OF</strong>
                                    <span>{elem.of}</span>
                                  </td>
                                  <td>
                                    <strong>ACTION TAKEN</strong>
                                    <span>{elem.action_taken}</span>
                                  </td>

                                  <td>
                                    <strong>Agree</strong>
                                    <span>
                                      <Form.Check
                                        inline
                                        label='Yes'
                                        name={`${Math.random()}group ${index}`}
                                        type='radio'
                                        defaultChecked={
                                          elem.agree === 'yes' && true
                                        }
                                        onChange={() => {
                                          UpdateDashboardEntry(elem, 'yes');
                                        }}
                                      />
                                      <Form.Check
                                        inline
                                        label='No'
                                        name={`${Math.random()}group ${index}`}
                                        type='radio'
                                        defaultChecked={
                                          elem.agree === 'no' && true
                                        }
                                        onChange={() => {
                                          UpdateDashboardEntry(elem, 'no');
                                        }}
                                      />
                                    </span>
                                  </td>
                                  <td>
                                    <TableMenuDropdown
                                      hasEditOption={true}
                                      editOnClick={() => {
                                        setEditData(elem);
                                        setEditShow(true);
                                      }}
                                      deleteHandler={() => deleteHandler(index)}
                                    />
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </Table>
                    </div>
                  </Col>
                )}
              </div>
            </div>
          )}
        />
      </Row>
    </>
  );
}
interface DashboardTableProps {
  TableData: TableDataProps;
  setEditShow: (show: boolean) => void;
  setEditData: any;
}

interface TableDataProps {
  heading: string;
  icon: string;
  data: Array<Array<TableContentProps>>;
  dashboardData: Array<DashboardTableContentProps>;
}
interface TableContentProps {
  key: number;
  ActionName: string;
  ActionData: string;
}
interface DashboardTableContentProps {
  on: string;
  service_titan_id: string;
  action_taken: string;
  segment: string;
  agree: string;
  of: string;
  condition_date: string;
  metric: string;
  had_condition: string;
}
