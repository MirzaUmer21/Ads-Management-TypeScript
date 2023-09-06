import { useAppDispatch, useAppSelector } from 'app/hooks';
import CapacityTable from 'components/Capacity/CapacityTable';
import CreateCapacity from 'components/Capacity/CreateCapacity';
import EditCapacity from 'components/Capacity/EditCapacity';
import {
  setActiveCapacityPage,
  setCapacityMembersdata
} from 'features/capacity/capacitySlice';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import { PropagateLoader } from 'react-spinners';
import { toast } from 'react-toastify';
import { useGetCapacityMembersMutation } from 'services/capacityApi';
import FulcrumCustomModel from 'shared/FulcrumCustomModel';
import FulcrumNavBar from 'shared/FulcrumNavBar';

export default function CapacityContainer() {
  const [show, setShow] = useState(false);
  const [totalMembers, settotalMembers] = useState(0);
  const [editModelshow, setEditModelShow] = useState(false);
  const [editModelData, setEditModelData] = useState(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const activeCapacityPage = useAppSelector(
    state => state.capacity.activeCapacityPage
  );
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const [serviceCapacityMembers, setserviceCapacityMembers] =
    useState<Array<CapacityTableData> | null>(null);
  const [salesCapacityMembers, setsalesCapacityMembers] =
    useState<Array<CapacityTableData> | null>(null);
  const [installCapacityMembers, setinstallCapacityMembers] =
    useState<Array<CapacityTableData> | null>(null);
  const [allCapacityMembers, setallCapacityMembers] =
    useState<Array<CapacityTableData> | null>(null);
  const [getCapacityMembersAction, { isLoading }] =
    useGetCapacityMembersMutation();

  const getCapacityMembers = async () => {
    setserviceCapacityMembers(null);
    setsalesCapacityMembers(null);
    setinstallCapacityMembers(null);
    setallCapacityMembers(null);
    try {
      const response: any = await getCapacityMembersAction({
        db: activeCRMClient ? activeCRMClient.crm_client_name : '',
        page: activeCapacityPage
      }).unwrap();
      if (response.data) {
        settotalMembers(response.total);
        dispatch(setCapacityMembersdata({ capacityMembers: response.data }));
        const serviceData = response.data.filter(employee => {
          return employee.segment === 'service';
        });
        const salesData = response.data.filter(employee => {
          return employee.segment === 'sales';
        });
        const installData = response.data.filter(employee => {
          return employee.segment === 'install';
        });
        const allData = response.data.filter(employee => {
          return (
            employee.segment !== 'service' &&
            employee.segment !== 'sales' &&
            employee.segment !== 'install'
          );
        });
        setserviceCapacityMembers(serviceData);
        setsalesCapacityMembers(salesData);
        setinstallCapacityMembers(installData);
        setallCapacityMembers(allData);
      }
    } catch (err: any) {
      setserviceCapacityMembers([]);
      setsalesCapacityMembers([]);
      setinstallCapacityMembers([]);
      setallCapacityMembers([]);
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  useEffect(() => {
    if (activeCRMClient === null) {
      toast.warning('Please Select a Client');
    } else {
      getCapacityMembers();
    }
  }, [activeCRMClient, activeCapacityPage]);
  return (
    <>
      <FulcrumCustomModel
        show={show}
        setShow={setShow}
        ComponentForm={<CreateCapacity />}
      />
      {editModelshow && (
        <FulcrumCustomModel
          show={editModelshow}
          setShow={setEditModelShow}
          ComponentForm={<EditCapacity editModelData={editModelData} />}
        />
      )}
      <Container>
        <Col lg={12}>
          <FulcrumNavBar
            NavData={{
              NavHeading: 'Capacity',
              NavText:
                'Specify what you consider 100% full capacity by segment',
              hasButton: true,
              buttonText: 'Assign Capacity',
              buttonOnClick: () => {
                setShow(true);
              },
              hasAlert: true,
              AlertText: 'You have 10 new Team members to assign to capacity to'
            }}
          />
        </Col>

        <Row>
          <Col lg={12}>
            <Container>
              {!isLoading &&
              serviceCapacityMembers !== null &&
              salesCapacityMembers !== null &&
              installCapacityMembers !== null &&
              allCapacityMembers !== null ? (
                <>
                  <CapacityTable
                    setShow={setEditModelShow}
                    TableData={{
                      heading: 'Service',
                      data: serviceCapacityMembers
                    }}
                    setEditData={setEditModelData}
                  />
                  <CapacityTable
                    setShow={setEditModelShow}
                    TableData={{
                      heading: 'Sales',
                      data: salesCapacityMembers
                    }}
                    setEditData={setEditModelData}
                  />
                  <CapacityTable
                    setShow={setEditModelShow}
                    TableData={{
                      heading: 'Install',
                      data: installCapacityMembers
                    }}
                    setEditData={setEditModelData}
                  />
                  <CapacityTable
                    setShow={setEditModelShow}
                    TableData={{
                      heading: 'All',
                      data: allCapacityMembers
                    }}
                    setEditData={setEditModelData}
                  />
                </>
              ) : (
                isLoading && (
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
                )
              )}
            </Container>
          </Col>
        </Row>

        <Row className='reactPaginateCustom'>
          <Col lg={12}>
            <ReactPaginate
              breakLabel='...'
              nextLabel='>'
              onPageChange={e => {
                dispatch(setActiveCapacityPage(e.selected + 1));
              }}
              pageRangeDisplayed={4}
              initialPage={activeCapacityPage - 1}
              pageCount={Math.ceil(totalMembers / 25)}
              previousLabel='<'
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              activeClassName={'active'}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
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
