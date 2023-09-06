import React, { useEffect } from 'react';
import { Card, Col, Container } from 'react-bootstrap';
import styles from 'css/Navbar.module.css';
import DatePicker from 'react-datepicker';
import { forwardRef, useState } from 'react';
import MediaQuery, { useMediaQuery } from 'react-responsive';
import BellDropdown from 'shared/BellDropdown';
import { useLocation } from 'react-router-dom';
import SelectField from 'shared/SelectField';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  resetActiveClientStateData,
  setActiveClientStateData
} from 'features/clients/clientsSlice';
import { useGetDashboardLogsByDateMutation } from 'services/dashboardApi';
import { toast } from 'react-toastify';
import {
  setEarlierDashboardLogs,
  setTodayDashboardLogs
} from 'features/dashboard/dashboardSlice';

export default function DashboardNav() {
  const [dateRange, setDateRange] = useState<any>([null, null]);
  const [startDate, endDate] = dateRange;
  const isTabletOrMobile = useMediaQuery({ maxWidth: 992 });
  const location = useLocation();
  const allClients = useAppSelector(state => state.clientsData.AllClients);
  const activeClients = useAppSelector(state => state.clientsData.ActiveClient);
  const dispatch = useAppDispatch();
  const [GetDashboardLogsByDateAction, GetDashboardLogsByDateResponse] =
    useGetDashboardLogsByDateMutation();

  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const getDashboardLogs = async update => {
    const [startDate, endDate] = update;

    if (startDate !== null && endDate !== null) {
      dispatch(setTodayDashboardLogs({ todayDashboardLogs: [] }));
      dispatch(setEarlierDashboardLogs({ earlierDashboardLogs: [] }));
      const startDay = String(startDate.getDate()).padStart(2, '0');
      const startMonth = String(startDate.getMonth() + 1).padStart(2, '0');
      const startYear = startDate.getFullYear();
      const completeStartDate = startYear + '-' + startMonth + '-' + startDay;
      const endDay = String(endDate.getDate()).padStart(2, '0');
      const endMonth = String(endDate.getMonth() + 1).padStart(2, '0');
      const endYear = endDate.getFullYear();
      const completeEndDate = endYear + '-' + endMonth + '-' + endDay;
      if (activeCRMClient === null) {
        toast.warning('Please Select a Client');
        setDateRange([null, null]);
      } else {
        try {
          const response: Array<GetDashboardLogsResponse> =
            await GetDashboardLogsByDateAction({
              service_titan_id: activeCRMClient?.service_titan_client_id,
              start_date: completeStartDate,
              end_date: completeEndDate
            }).unwrap();
          if (response) {
            sortLogs(response);
          }
        } catch (err: any) {
          toast.error('There is some Error. Please try again.');
          console.log(err);
        }
      }
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

  let allClientsData: Array<options> = [];
  const setActiveCRMClient = (val: string) => {
    if (val !== 'default') {
      const activeClient = allClients.filter(el => el.crm_client_name === val);
      dispatch(setActiveClientStateData({ ActiveClient: activeClient[0] }));
    } else {
      dispatch(resetActiveClientStateData());
    }
  };
  const ExampleCustomInput = forwardRef(
    ({ value, onClick }: props, ref: any) => (
      <button className={styles.customInputButton} onClick={onClick} ref={ref}>
        <span>
          <i
            className='fa-solid fa-calendar-days'
            style={{ fontSize: '17px', marginRight: '8px' }}
          ></i>
          {startDate &&
            `${new Date(startDate).toLocaleString('en-us', {
              month: 'long'
            })} ${new Date(startDate).getDate()},${new Date(
              startDate
            ).getFullYear()}`}
          -
          {startDate &&
            `${new Date(endDate).toLocaleString('en-us', {
              month: 'long'
            })} ${new Date(endDate).getDate()},${new Date(
              endDate
            ).getFullYear()}`}
          <i
            className='fa-solid fa-angle-down'
            style={{ fontSize: '17px', marginLeft: '11px' }}
          ></i>
        </span>
      </button>
    )
  );
  return (
    <>
      <div className={styles.NavCol}>
        <Col lg={8} md={12}>
          <div className={styles.navHeadingWrapper}>
            <div className={styles.NavHeadingContainer}>
              <h1 className={styles.NavHeading}>Dashboard</h1>
              <p className={styles.NavText}>
                What happened with your budget as a result of your capacity
                rules and objective optimizations.
              </p>
            </div>
            <MediaQuery maxWidth={992}>
              <BellDropdown />
            </MediaQuery>
          </div>
        </Col>
        <Col
          className={
            isTabletOrMobile
              ? 'd-flex justify-content-center actionDatepicker '
              : 'd-flex justify-content-end actionDatepicker '
          }
          lg={4}
          md={12}
        >
          <DatePicker
            customInput={<ExampleCustomInput />}
            selectsRange={true}
            startDate={startDate}
            endDate={endDate}
            onChange={update => {
              setDateRange(update);

              getDashboardLogs(update);
            }}
          />
          <MediaQuery minWidth={992}>
            <BellDropdown />
          </MediaQuery>
        </Col>
      </div>
      {location.pathname !== '/accounts' &&
      location.pathname !== '/settings' ? (
        <Col lg={12}>
          <Card className='mb-3'>
            <Card.Body>
              <div className='clientSelectSection'>
                {allClients &&
                  allClients.map((elem, index) => {
                    const temp = {
                      value: elem.crm_client_name,
                      label: elem.crm_client_name
                    };
                    allClientsData.push(temp);

                    return null;
                  })}
                {!allClients.length && (
                  <p
                    className={`d-flex align-items-center h-100 ${styles.NavText}`}
                  >
                    No Client Found
                  </p>
                )}
                <SelectField
                  fieldSelect
                  col={4}
                  disabled={false}
                  fieldName='Clients'
                  fields={allClientsData}
                  label='Clients'
                  onChange={(val: any) => {
                    setActiveCRMClient(val);
                  }}
                  placeholder='Select Clients'
                  value={activeClients?.crm_client_name}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      ) : (
        <></>
      )}
    </>
  );
}

interface props {
  value?: string;
  onClick?: () => void;
}
type options = {
  value: string | number;
  label: string | number;
};
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
