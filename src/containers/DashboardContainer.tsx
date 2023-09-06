import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Chart from 'shared/Chart';
import styles from 'css/Dashboard.module.css';
import { DashboardFilters } from 'static/DashboardFilters';
import DashboardNav from 'components/Dashboard/DashboardNav';
import Statistics from 'components/Dashboard/Statistics';
import DashboardTableFilters from 'components/Dashboard/DashboardTableFilters';
import DashboardTable from 'components/Dashboard/DashboardTable';
import FulcrumCustomModel from 'shared/FulcrumCustomModel';
import EditDashboardTable from 'components/Dashboard/EditDashboardTable';
import { useGetDashboardLogsMutation } from 'services/dashboardApi';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { PropagateLoader } from 'react-spinners';
import {
  setEarlierDashboardLogs,
  setTodayDashboardLogs
} from 'features/dashboard/dashboardSlice';

export default function Dashboard() {
  const dispatch = useAppDispatch();
  const [editModelshow, setEditModelShow] = useState(false);
  const [editModelData, setEditModelData] = useState(null);
  const dashboardLogsTodayData = useAppSelector(
    state => state.dashboard.todayDashboardLogs
  );
  const dashboardLogsEarlierData = useAppSelector(
    state => state.dashboard.earlierDashboardLogs
  );
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const [GetDashboardLogsAction, GetDashboardLogsResponse] =
    useGetDashboardLogsMutation();

  const getDashboardLogs = async () => {
    dispatch(setTodayDashboardLogs({ todayDashboardLogs: [] }));
    dispatch(setEarlierDashboardLogs({ earlierDashboardLogs: [] }));
    try {
      const response: Array<GetDashboardLogsResponse> =
        await GetDashboardLogsAction(
          activeCRMClient?.service_titan_client_id
        ).unwrap();
      if (response) {
        sortLogs(response);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const sortLogs = (data: any) => {
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const todayData: Array<GetDashboardLogsResponse> = data.filter(elem => {
      let logDate = new Date(elem.on);
      logDate.setHours(0, 0, 0, 0);

      return logDate.getTime() === currentDate.getTime();
    });
    const earlierData: Array<GetDashboardLogsResponse> = data.filter(elem => {
      let logDate = new Date(elem.on);
      logDate.setHours(0, 0, 0, 0);

      return logDate.getTime() < currentDate.getTime();
    });

    dispatch(setTodayDashboardLogs({ todayDashboardLogs: todayData }));
    dispatch(setEarlierDashboardLogs({ earlierDashboardLogs: earlierData }));
  };
  useEffect(() => {
    if (activeCRMClient !== null) {
      getDashboardLogs();
    }
  }, [activeCRMClient]);

  return (
    <>
      {editModelshow && (
        <FulcrumCustomModel
          show={editModelshow}
          setShow={setEditModelShow}
          ComponentForm={<EditDashboardTable editModelData={editModelData} />}
        />
      )}
      <Container>
        <Col lg={12} md={12} sm={12}>
          <DashboardNav />
        </Col>
        <>
          <Row>
            <Col lg={8} md={12} sm={12}>
              <Chart />
            </Col>

            <Col lg={4} md={12} sm={12}>
              <Statistics />
            </Col>
          </Row>
          <Row className={styles.dashboardTableFilter}>
            <DashboardTableFilters DashboardFilters={DashboardFilters} />
          </Row>
          {GetDashboardLogsResponse.isLoading ? (
            <div
              style={{
                display: 'flex',
                height: '30px',
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <PropagateLoader color='#5600d6' />
            </div>
          ) : (
            <>
              <DashboardTable
                TableData={{
                  heading: 'Today',
                  icon: 'fa-solid fa-angle-down',
                  data: [],
                  dashboardData: dashboardLogsTodayData
                }}
                setEditShow={setEditModelShow}
                setEditData={setEditModelData}
              />
              <DashboardTable
                TableData={{
                  heading: 'Earlier',
                  icon: 'fa-solid fa-angle-down',
                  data: [],
                  dashboardData: dashboardLogsEarlierData
                }}
                setEditShow={setEditModelShow}
                setEditData={setEditModelData}
              />
            </>
          )}
        </>
      </Container>
    </>
  );
}
interface GetDashboardLogsResponse {
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
