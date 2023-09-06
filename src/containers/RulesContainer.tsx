import { Col, Container } from 'react-bootstrap';
import {
  SegmentTable,
  RulesAccountsTableData,
  CampaignsTable
} from 'static/RulesTableData';
import RulesTable from 'components/Rules/RulesTable';
import { useEffect, useState } from 'react';
import FulcrumCustomModel from 'shared/FulcrumCustomModel';
import AssignRules from 'components/Rules/AssignRules';
import FulcrumNavBar from 'shared/FulcrumNavBar';
import EditRulesSegmentTable from 'components/Rules/EditRulesSegmentTable';
import EditRulesServiceTable from 'components/Rules/EditRulesServiceTable';
import EditRulesCampaignsTable from 'components/Rules/EditRulesCampaignsTable';
import {
  useGetCampaignsRulesMutation,
  useGetSegmentRulesMutation,
  useGetServiceRulesMutation
} from 'services/rulesApi';
import { toast } from 'react-toastify';
import { useAppSelector } from 'app/hooks';
import { PropagateLoader } from 'react-spinners';
import AddRulesSegmentTable from 'components/Rules/AddRulesSegmentTable';
import AddRulesServiceTable from 'components/Rules/AddRulesServiceTable';
import AddRulesCampaignsTable from 'components/Rules/AddRulesCampaignsTable';

export default function RulesContainer() {
  const [show, setShow] = useState(false);
  const [showCampaigns, setshowCampaigns] = useState(false);
  const [showSegment, setshowSegment] = useState(false);

  const [editSegmentModelshow, setEditSegmentModelShow] = useState(false);
  const [editSegmentModelData, setEditSegmentModelData] = useState(null);
  const [addSegmentModelshow, setAddSegmentModelShow] = useState(false);

  const [editServiceModelshow, setEditServiceModelShow] = useState(false);
  const [editServiceModelData, setEditServiceModelData] = useState(null);
  const [addServiceModelshow, setAddServiceModelShow] = useState(false);

  const [editCampaignsModelshow, setEditCampaignsModelShow] = useState(false);
  const [editCampaignsModelData, setEditCampaignsModelData] = useState(null);
  const [addCampaignsModelshow, setAddCampaignsModelShow] = useState(false);

  const [serviceRulesData, setserviceRulesData] = useState<
    Array<GetServiceRulesResponse>
  >([]);

  const [GetServiceRulesAction, GetServiceRulesResponse] =
    useGetServiceRulesMutation();

  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );

  const getServiceRules = async () => {
    try {
      const response: Array<GetServiceRulesResponse> =
        await GetServiceRulesAction(activeCRMClient?.crm_client_name).unwrap();
      if (response) {
        setserviceRulesData(response);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };

  const [campaignsRulesData, setcampaignsRulesData] = useState<
    Array<GetCampaignsRulesResponse>
  >([]);

  const [GetCampaignsRulesAction, GetCampaignsRulesResponse] =
    useGetCampaignsRulesMutation();

  const getCampaignsRules = async () => {
    try {
      const response: Array<GetCampaignsRulesResponse> =
        await GetCampaignsRulesAction(
          activeCRMClient?.crm_client_name
        ).unwrap();
      if (response) {
        setcampaignsRulesData(response);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };

  // get segmets rules
  const [SegmentRulesResData, setSegmentRulesResData] = useState<
    Array<GetSegmentRulesResponse>
  >([]);

  const [GetSegmentRulesAction, GetSegmentRulesResponse] =
    useGetSegmentRulesMutation();

  const getSegmentRules = async () => {
    try {
      const response: Array<GetSegmentRulesResponse> =
        await GetSegmentRulesAction(activeCRMClient?.crm_client_name).unwrap();
      if (response) {
        setSegmentRulesResData(response);
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  useEffect(() => {
    if (activeCRMClient === null) {
      toast.warning('Please Select a Client');
    } else {
      getServiceRules();
      getCampaignsRules();
      getSegmentRules();
    }
  }, [activeCRMClient]);

  return (
    <>
      <FulcrumCustomModel
        show={show}
        setShow={setShow}
        ComponentForm={<AssignRules />}
      />
      {editSegmentModelshow && (
        <FulcrumCustomModel
          show={editSegmentModelshow}
          setShow={setEditSegmentModelShow}
          ComponentForm={
            <EditRulesSegmentTable editModelData={editSegmentModelData} />
          }
        />
      )}
      {addSegmentModelshow && (
        <FulcrumCustomModel
          show={addSegmentModelshow}
          setShow={setAddSegmentModelShow}
          ComponentForm={<AddRulesSegmentTable />}
        />
      )}
      {editServiceModelshow && (
        <FulcrumCustomModel
          show={editServiceModelshow}
          setShow={setEditServiceModelShow}
          ComponentForm={
            <EditRulesServiceTable editModelData={editServiceModelData} />
          }
        />
      )}
      {addServiceModelshow && (
        <FulcrumCustomModel
          show={addServiceModelshow}
          setShow={setAddServiceModelShow}
          ComponentForm={<AddRulesServiceTable />}
        />
      )}
      {editCampaignsModelshow && (
        <FulcrumCustomModel
          show={editCampaignsModelshow}
          setShow={setEditCampaignsModelShow}
          ComponentForm={
            <EditRulesCampaignsTable editModelData={editCampaignsModelData} />
          }
        />
      )}
      {addCampaignsModelshow && (
        <FulcrumCustomModel
          show={addCampaignsModelshow}
          setShow={setAddCampaignsModelShow}
          ComponentForm={<AddRulesCampaignsTable />}
        />
      )}
      <Container>
        <Col lg={12}>
          <FulcrumNavBar
            NavData={{
              NavHeading: 'Rules',
              NavText: 'What you want to happen under what capacity conditions',
              hasButton: false,
              buttonText: 'Assign Rules',
              buttonOnClick: () => {
                setShow(true);
              },
              hasAlert: false
            }}
          />
        </Col>

        {/* <RulesTable
          TableData={{
            heading: 'Segment',
            icon: 'fa-solid fa-angle-down',
            data: SegmentTable,
            serviceRulesData: serviceRulesData,
          }}
          show={editSegmentModelshow}
          setShow={setEditSegmentModelShow}
          displayRows={2}
          setEditData={setEditSegmentModelData}
        /> */}

        {GetServiceRulesResponse.isLoading ||
        GetCampaignsRulesResponse.isLoading ||
        GetSegmentRulesResponse.isLoading ? (
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
            <RulesTable
              TableData={{
                heading: '',
                icon: 'fa-solid fa-angle-down',
                data: RulesAccountsTableData,
                segmentRulesData: SegmentRulesResData,
                serviceRulesData: serviceRulesData,
                campaignsRulesData: campaignsRulesData
              }}
              show={editServiceModelshow}
              setShow={setEditServiceModelShow}
              displayRows={3}
              setEditData={setEditServiceModelData}
              setShowAddService={setAddServiceModelShow}
              showCampaigns={editServiceModelshow}
              setShowCampaigns={setEditCampaignsModelShow}
              setCampaignsEditData={setEditCampaignsModelData}
              setShowAddCampaigns={setAddCampaignsModelShow}
              showSegment={editServiceModelshow}
              setShowSegment={setEditSegmentModelShow}
              setSegmentEditData={setEditSegmentModelData}
              setShowAddSegment={setAddSegmentModelShow}
            />
          </>
        )}
      </Container>
    </>
  );
}

type GetServiceRulesResponse = {
  service_name: string;
  rollup_budget: string;
  service_titan_id: string;
  crm_client_name: string;
  rollup_scalability: string;
  ad_account_id: string;
  rollup_cpa: string;
  rollup_campaigns: string;
};

type GetCampaignsRulesResponse = {
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

type GetSegmentRulesResponse = {
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
