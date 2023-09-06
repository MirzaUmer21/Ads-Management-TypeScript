import React, { useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { stats } from '../../static/stats';
import styles from 'css/Dashboard.module.css';
import { useMediaQuery } from 'react-responsive';
import TableMenuDropdown from 'shared/TableMenuDropdown';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useGetDashboardStatsMutation } from 'services/dashboardApi';
import { setDashboardStats } from 'features/dashboard/dashboardSlice';
import { toast } from 'react-toastify';
import Loading from 'shared/Loading';

export default function Statistics() {
  const dispatch = useAppDispatch();
  const isTablet = useMediaQuery({ query: '(max-width: 992px)' });
  const clientName = useAppSelector(
    state => state.clientsData.ActiveClient?.crm_client_name
  );
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const dashboardStats = useAppSelector(
    state => state.dashboard.dashboardStats
  );
  const [GetDashboardStatsAction, GetDashboardStatsResponse] =
    useGetDashboardStatsMutation();
  const getDashboardStats = async () => {
    try {
      const response = await GetDashboardStatsAction({
        db: clientName ? clientName : '',
        page: 1,
        page_size: 1000
      }).unwrap();
      if (response) {
        dispatch(setDashboardStats({ dashboardStats: response.data }));
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  useEffect(() => {
    if (activeCRMClient !== null) {
      getDashboardStats();
    }
  }, [activeCRMClient]);
  return (
    <>
      <div className={styles.dashboardtatisticsWrapper}>
        <Card
          style={{
            height: (() => {
              if (!isTablet) {
                return '330px';
              }
            })()
          }}
        >
          <Card.Body>
            <Row>
              <Col lg={10} md={10} sm={10} xs={10}>
                <h2 className={styles.statsTitle}>Statistics</h2>
              </Col>
              <Col lg={2} ms={2} sm={2} xs={2} className={styles.dashboardMode}>
                <TableMenuDropdown hasEditOption={true} />
              </Col>
            </Row>
            <Row className={styles.statsContainer}>
              {GetDashboardStatsResponse.isLoading ? (
                <div className='d-flex justify-content-center align-items-center'>
                  <Loading hasText={false} />
                </div>
              ) : (
                <>
                  <Col lg={6} md={3} sm={3} xs={6}>
                    <div>
                      <h1 className={styles.statsNumber}>
                        {dashboardStats?.service}
                      </h1>
                      <p className={styles.statsHeading}>service</p>
                    </div>
                  </Col>
                  <Col lg={6} md={3} sm={3} xs={6}>
                    <div>
                      <h1 className={styles.statsNumber}>
                        {dashboardStats?.sales}
                      </h1>
                      <p className={styles.statsHeading}>sales</p>
                    </div>
                  </Col>
                  <Col lg={6} md={3} sm={3} xs={6}>
                    <div>
                      <h1 className={styles.statsNumber}>
                        {dashboardStats?.install}
                      </h1>
                      <p className={styles.statsHeading}>install</p>
                    </div>
                  </Col>
                  <Col lg={6} md={3} sm={3} xs={6}>
                    <div>
                      <h1 className={styles.statsNumber}>
                        {dashboardStats?.maintenance}
                      </h1>
                      <p className={styles.statsHeading}>maintenance</p>
                    </div>
                  </Col>
                </>
              )}
            </Row>
          </Card.Body>
        </Card>
      </div>
    </>
  );
}
