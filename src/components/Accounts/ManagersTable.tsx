import React from 'react';
import { Button, Card, Col, Row, Table } from 'react-bootstrap';
import TableStyles from 'css/Dashboard.module.css';
import styles from 'css/Capacity.module.css';
import SlideToggle from 'react-slide-toggle';
import { useMediaQuery } from 'react-responsive';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { setGoogleActiveManager } from 'features/accounts/googleAccountSlice';
import { setFacebookActiveManager } from 'features/accounts/facebookAccountSlice';
import { setClientsPopupAction } from 'features/accounts/accountsSlice';
import { setBingActiveManager } from 'features/accounts/bingAccountSlice';
import { setActiveYelpBusinessData } from 'features/accounts/yelpAccountSlice';
import { useSetYelpActiveBusinessesMutation } from 'services/yelpConnectApi';
import { toast } from 'react-toastify';

export default function ManagersTable({ setClientShow }: ManagersTableProps) {
  const dispatch = useAppDispatch();
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });

  const [setYelpActiveBusinessesAction] = useSetYelpActiveBusinessesMutation();
  //App Data
  const id_token = useAppSelector(state => state.authentication.id_token);

  const GoogleManagerData: any = useAppSelector(
    state => state.googleAccount.ManagerAccounts
  );
  const FacebookManagerData: any = useAppSelector(
    state => state.facebookAccount.ManagerAccounts
  );
  const BingManagerData: any = useAppSelector(
    state => state.bingAccount.ManagerAccounts
  );
  const YelpBusinessesData: Array<any> = useAppSelector(
    state => state.yelpAccount.yelpBusinesses
  );
  const GoogleAccountTitle: any = useAppSelector(
    state => state.googleAccount.AccountTitle
  );
  const FacebookAccountTitle: any = useAppSelector(
    state => state.facebookAccount.AccountTitle
  );
  const BingAccountTitle: any = useAppSelector(
    state => state.bingAccount.AccountTitle
  );
  const YelpAccountTitle: any = useAppSelector(
    state => state.yelpAccount.AccountTitle
  );
  const GoogleUser: any = useAppSelector(
    state => state.googleAccount.ActiveUser
  );
  const yelpSetActive = async (yelpEntry: Array<string>) => {
    const bodyData = {
      yelp_business_id: yelpEntry[0],
      yelp_business_name: yelpEntry[1],
      campaign_id: yelpEntry[2],
      yelp_program_type: yelpEntry[3],
      yelp_program_status: yelpEntry[4],
      yelp_program_pause_status: yelpEntry[5],
      yelp_program_budget: yelpEntry[6],
      yelp_program_start_date: yelpEntry[7]
    };
    try {
      const response = await setYelpActiveBusinessesAction({
        id_token,
        bodyData
      }).unwrap();
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
    }
  };
  return (
    <>
      {/* Google */}
      <div style={{ marginBottom: '30px' }}>
        <SlideToggle
          render={({ toggle, setCollapsibleElement, range }) => (
            <div className='my-collapsible'>
              <Col lg={12}>
                <h2 className={TableStyles.actionTableSort}>
                  Google Managers
                  <i
                    onClick={toggle}
                    style={{ marginLeft: '10px' }}
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
                <Col lg={12}>
                  {isTabletOrMobile ? (
                    <Row>
                      {GoogleManagerData &&
                        GoogleManagerData.map((elem, index) => {
                          return (
                            <Col sm={6} key={index}>
                              <Card
                                className='responsiveTableCards mb-4 '
                                style={{ width: '100%' }}
                              >
                                <Card.Body>
                                  <Card.Title className='mb-3'>
                                    <div className=' tableImage'></div>
                                  </Card.Title>
                                  <Row>
                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>Account</strong>
                                      <span>{GoogleAccountTitle}</span>
                                    </Col>
                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>Manager Id</strong>
                                      <span>{elem}</span>
                                    </Col>
                                    <Col xs={12} className='tableCardsElements'>
                                      <strong>Connected User</strong>
                                      <span>{GoogleUser}</span>
                                    </Col>
                                    <Col
                                      xs={12}
                                      className='tableCardsElements statusCol'
                                    >
                                      <Button
                                        onClick={() => {
                                          dispatch(
                                            setGoogleActiveManager({
                                              ActiveManager: elem
                                            })
                                          );
                                          dispatch(
                                            setClientsPopupAction({
                                              clientsPopupAction: 'google'
                                            })
                                          );

                                          setClientShow(true);
                                        }}
                                        className={`defaultButton`}
                                      >
                                        Show Clients
                                      </Button>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                    </Row>
                  ) : (
                    <>
                      <div
                        style={{
                          height:
                            GoogleManagerData.length > 6 ? ' 445px' : 'inherit'
                        }}
                        className={
                          GoogleManagerData.length > 6 ? 'tableScrollWrap' : ''
                        }
                      >
                        {GoogleManagerData.length ? (
                          <Table className='fulcrumDefaultTable'>
                            <tbody>
                              {GoogleManagerData &&
                                GoogleManagerData.map((elem, index) => {
                                  return (
                                    <tr key={index} className='trBorder'>
                                      <td>
                                        <strong>Account</strong>
                                        <span>{GoogleAccountTitle}</span>
                                      </td>
                                      <td>
                                        <strong>Connected User</strong>
                                        <span>{GoogleUser}</span>
                                      </td>
                                      <td>
                                        <strong>Manager Id</strong>
                                        <span>{elem}</span>
                                      </td>

                                      <td className='statusCol'>
                                        <Button
                                          onClick={() => {
                                            dispatch(
                                              setGoogleActiveManager({
                                                ActiveManager: elem
                                              })
                                            );
                                            dispatch(
                                              setClientsPopupAction({
                                                clientsPopupAction: 'google'
                                              })
                                            );
                                            setClientShow(true);
                                          }}
                                          className={`defaultButton`}
                                        >
                                          Show Clients
                                        </Button>
                                      </td>
                                    </tr>
                                  );
                                })}
                            </tbody>
                          </Table>
                        ) : (
                          <p>No Record Found.</p>
                        )}
                      </div>
                    </>
                  )}
                </Col>
              </div>
            </div>
          )}
        />
      </div>
      {/* Facebook */}
      <div style={{ marginBottom: '30px' }}>
        <SlideToggle
          render={({ toggle, setCollapsibleElement, range }) => (
            <div className='my-collapsible'>
              <Col lg={12}>
                <h2 className={TableStyles.actionTableSort}>
                  Facebook Managers
                  <i
                    onClick={toggle}
                    style={{ marginLeft: '10px' }}
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
                <Col lg={12}>
                  {isTabletOrMobile ? (
                    <Row>
                      {FacebookManagerData &&
                        FacebookManagerData.map((elem, index) => {
                          return (
                            <Col sm={6}>
                              <Card
                                className='responsiveTableCards mb-4 '
                                style={{ width: '100%' }}
                              >
                                <Card.Body>
                                  <Card.Title className='mb-3'>
                                    <div className='d-flex align-items-center'>
                                      <span
                                        className={` ${styles.capacityBoxImage}`}
                                      >
                                        <img src={elem.picture} alt='$$$' />
                                      </span>
                                    </div>
                                  </Card.Title>
                                  <Row>
                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>Name</strong>
                                      <span>{elem.name}</span>
                                    </Col>
                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>Account</strong>
                                      <span>{FacebookAccountTitle}</span>
                                    </Col>
                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>Manager Id</strong>
                                      <span>{elem.account_id}</span>
                                    </Col>
                                    <Col xs={6} className='tableCardsElements'>
                                      <strong>Connected User</strong>
                                      <span>{elem.fb_email}</span>
                                    </Col>
                                    <Col
                                      xs={12}
                                      className='tableCardsElements statusCol'
                                    >
                                      <Button
                                        onClick={() => {
                                          dispatch(
                                            setFacebookActiveManager({
                                              ActiveManager: elem.account_id
                                            })
                                          );
                                          dispatch(
                                            setClientsPopupAction({
                                              clientsPopupAction: 'fb'
                                            })
                                          );
                                          setClientShow(true);
                                        }}
                                        className={`defaultButton`}
                                      >
                                        Show Clients
                                      </Button>
                                    </Col>
                                  </Row>
                                </Card.Body>
                              </Card>
                            </Col>
                          );
                        })}
                    </Row>
                  ) : (
                    <>
                      <div
                        style={{
                          height:
                            FacebookManagerData.length > 6 ? '445px' : 'inherit'
                        }}
                        className={
                          FacebookManagerData.length > 6
                            ? 'tableScrollWrap'
                            : ''
                        }
                      >
                        <Table className=' fulcrumDefaultTable'>
                          <tbody>
                            {!FacebookManagerData.length ? (
                              <p>No Record Found.</p>
                            ) : (
                              FacebookManagerData &&
                              FacebookManagerData.map((elem, index) => {
                                return (
                                  <tr key={index} className='trBorder'>
                                    <td
                                      style={{
                                        width: '56px'
                                      }}
                                    >
                                      <img
                                        style={{
                                          width: '44px',
                                          height: '44px',
                                          borderRadius: '6px'
                                        }}
                                        src={elem.picture}
                                        alt=''
                                      />
                                    </td>
                                    <td>
                                      <strong>Name</strong>
                                      <span>{elem.name}</span>
                                    </td>
                                    <td>
                                      <strong>Account</strong>
                                      <span>{FacebookAccountTitle}</span>
                                    </td>
                                    <td>
                                      <strong>Connected User</strong>
                                      <span>{elem.fb_email}</span>
                                    </td>

                                    <td>
                                      <strong>Manager Id</strong>
                                      <span>{elem.account_id}</span>
                                    </td>
                                    <td className='statusCol'>
                                      <Button
                                        onClick={() => {
                                          dispatch(
                                            setFacebookActiveManager({
                                              ActiveManager: elem.account_id
                                            })
                                          );
                                          dispatch(
                                            setClientsPopupAction({
                                              clientsPopupAction: 'fb'
                                            })
                                          );
                                          setClientShow(true);
                                        }}
                                        className={`defaultButton`}
                                      >
                                        Show Clients
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </>
                  )}
                </Col>
              </div>
            </div>
          )}
        />
      </div>
      {/* Bing */}
      <div style={{ marginBottom: '30px' }}>
        <SlideToggle
          render={({ toggle, setCollapsibleElement, range }) => (
            <div className='my-collapsible'>
              <Col lg={12}>
                <h2 className={TableStyles.actionTableSort}>
                  Bing Managers
                  <i
                    onClick={toggle}
                    style={{ marginLeft: '10px' }}
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
                <Col lg={12}>
                  {isTabletOrMobile && BingManagerData ? (
                    <Row>
                      <Col sm={6}>
                        <Card
                          className='responsiveTableCards mb-4 '
                          style={{ width: '100%' }}
                        >
                          <Card.Body>
                            <Card.Title className='mb-3'>
                              <div className='d-flex align-items-center'>
                                <span className={` ${styles.capacityBoxImage}`}>
                                  {/* <img src={elem.picture} alt='$$$' /> */}
                                </span>
                              </div>
                            </Card.Title>
                            <Row>
                              <Col xs={6} className='tableCardsElements'>
                                <strong>Name</strong>
                                <span>{BingManagerData.bing_name}</span>
                              </Col>
                              <Col xs={6} className='tableCardsElements'>
                                <strong>Account</strong>
                                <span>{BingAccountTitle}</span>
                              </Col>
                              <Col xs={6} className='tableCardsElements'>
                                <strong>Manager Id</strong>
                                <span>{BingManagerData.bing_id}</span>
                              </Col>
                              <Col xs={6} className='tableCardsElements'>
                                <strong>Connected User</strong>
                                <span>{BingManagerData.bing_email}</span>
                              </Col>
                              <Col
                                xs={12}
                                className='tableCardsElements statusCol'
                              >
                                <Button
                                  onClick={() => {
                                    dispatch(
                                      setBingActiveManager({
                                        ActiveManager: BingManagerData.bing_id
                                      })
                                    );
                                    dispatch(
                                      setClientsPopupAction({
                                        clientsPopupAction: 'bing'
                                      })
                                    );
                                    setClientShow(true);
                                  }}
                                  className={`defaultButton`}
                                >
                                  Show Clients
                                </Button>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Card>
                      </Col>
                    </Row>
                  ) : (
                    <>
                      <div>
                        <Table className=' fulcrumDefaultTable'>
                          <tbody>
                            {BingManagerData === null ? (
                              <p>No Record Found.</p>
                            ) : (
                              <tr className='trBorder'>
                                <td>
                                  <strong>Name</strong>
                                  <span>{BingManagerData.bing_name}</span>
                                </td>
                                <td>
                                  <strong>Account</strong>
                                  <span>{BingAccountTitle}</span>
                                </td>
                                <td>
                                  <strong>Connected User</strong>
                                  <span>{BingManagerData.bing_email}</span>
                                </td>

                                <td>
                                  <strong>Manager Id</strong>
                                  <span>{BingManagerData.bing_id}</span>
                                </td>
                                <td className='statusCol'>
                                  <Button
                                    onClick={() => {
                                      dispatch(
                                        setBingActiveManager({
                                          ActiveManager: BingManagerData.bing_id
                                        })
                                      );
                                      dispatch(
                                        setClientsPopupAction({
                                          clientsPopupAction: 'bing'
                                        })
                                      );
                                      setClientShow(true);
                                    }}
                                    className={`defaultButton`}
                                  >
                                    Show Clients
                                  </Button>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </>
                  )}
                </Col>
              </div>
            </div>
          )}
        />
      </div>
      {/* Yelp */}
      <div style={{ marginBottom: '30px' }}>
        <SlideToggle
          render={({ toggle, setCollapsibleElement, range }) => (
            <div className='my-collapsible'>
              <Col lg={12}>
                <h2 className={TableStyles.actionTableSort}>
                  Yelp Businesses
                  <i
                    onClick={toggle}
                    style={{ marginLeft: '10px' }}
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
                <Col lg={12}>
                  {isTabletOrMobile ? (
                    YelpBusinessesData &&
                    YelpBusinessesData.map((yelpEntry, ind) => {
                      return (
                        <Row>
                          <Col sm={6}>
                            <Card
                              className='responsiveTableCards mb-4 '
                              style={{ width: '100%' }}
                            >
                              <Card.Body>
                                <Card.Title className='mb-3'>
                                  <div className='d-flex align-items-center'>
                                    <span
                                      className={` ${styles.capacityBoxImage}`}
                                    >
                                      {/* <img src={elem.picture} alt='$$$' /> */}
                                    </span>
                                  </div>
                                </Card.Title>
                                <Row>
                                  <Col xs={6} className='tableCardsElements'>
                                    <strong>Business Name</strong>
                                    <span>{yelpEntry[1]}</span>
                                  </Col>
                                  <Col xs={6} className='tableCardsElements'>
                                    <strong>Account</strong>
                                    <span>{YelpAccountTitle}</span>
                                  </Col>
                                  <Col xs={6} className='tableCardsElements'>
                                    <strong>Status</strong>
                                    <span>{yelpEntry[4]}</span>
                                  </Col>
                                  <Col xs={6} className='tableCardsElements'>
                                    <strong>Budget</strong>
                                    <span>{yelpEntry[6]}</span>
                                  </Col>
                                  <Col
                                    xs={12}
                                    className='tableCardsElements statusCol'
                                  >
                                    <Button
                                      onClick={() => {
                                        yelpSetActive(yelpEntry);
                                        dispatch(
                                          setActiveYelpBusinessData({
                                            activeBusinesses: yelpEntry
                                          })
                                        );
                                        dispatch(
                                          setClientsPopupAction({
                                            clientsPopupAction: 'yelp'
                                          })
                                        );
                                        setClientShow(true);
                                      }}
                                      className={`defaultButton`}
                                    >
                                      Show Clients
                                    </Button>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      );
                    })
                  ) : (
                    <>
                      <div
                        style={{
                          height:
                            YelpBusinessesData.length > 5 ? '350px' : 'inherit'
                        }}
                        className={
                          YelpBusinessesData.length > 5 ? 'tableScrollWrap' : ''
                        }
                      >
                        <Table className=' fulcrumDefaultTable'>
                          <tbody>
                            {!YelpBusinessesData.length ? (
                              <p>No Record Found.</p>
                            ) : (
                              YelpBusinessesData &&
                              YelpBusinessesData.map((yelpEntry, ind) => {
                                return (
                                  <tr className='trBorder'>
                                    <td>
                                      <strong>Business Name</strong>
                                      <span>{yelpEntry[1]}</span>
                                    </td>
                                    <td>
                                      <strong>Account</strong>
                                      <span>{YelpAccountTitle}</span>
                                    </td>
                                    <td>
                                      <strong>Status</strong>
                                      <span>{yelpEntry[4]}</span>
                                    </td>

                                    <td>
                                      <strong>Budget</strong>
                                      <span>{yelpEntry[6]}</span>
                                    </td>
                                    <td className='statusCol'>
                                      <Button
                                        onClick={() => {
                                          yelpSetActive(yelpEntry);
                                          dispatch(
                                            setActiveYelpBusinessData({
                                              activeBusinesses: yelpEntry
                                            })
                                          );
                                          dispatch(
                                            setClientsPopupAction({
                                              clientsPopupAction: 'yelp'
                                            })
                                          );
                                          setClientShow(true);
                                        }}
                                        className={`defaultButton`}
                                      >
                                        Show Clients
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })
                            )}
                          </tbody>
                        </Table>
                      </div>
                    </>
                  )}
                </Col>
              </div>
            </div>
          )}
        />
      </div>
    </>
  );
}
interface ManagersTableProps {
  setClientShow: (show: boolean) => void;
}
