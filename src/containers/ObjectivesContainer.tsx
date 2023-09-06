import React, { useEffect, useState } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import ObjectivesTable from 'components/Objectives/ObjectivesTable';
import {
  ObjectivesOpportunityFilter,
  ObjectivesRevenueFilter
} from 'static/ObjectivesTableFilter';

import FulcrumCustomModel from 'shared/FulcrumCustomModel';
import AssignObjectives from 'components/Objectives/AssignObjectives';
import FulcrumNavBar from 'shared/FulcrumNavBar';
import EditObjectives from 'components/Objectives/EditObjectives';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  useGetBingCampaignsMutation,
  useGetFacebookCampaignsMutation,
  useGetGoogleCampaignsMutation
} from 'services/campaignsApi';
import {
  setBingCampaignsData,
  setFacebookCampaignsData,
  setGoogleCampaignsData
} from 'features/campaigns/campaignsSlice';
import { toast } from 'react-toastify';
import { useGetObjectivesMutation } from 'services/objectivesApi';
import { PropagateLoader } from 'react-spinners';

export default function ObjectivesContainer() {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState(false);
  const [editModelshow, setEditModelShow] = useState(false);
  const [editModelData, setEditModelData] = useState(null);

  const [opportunityData, setopportunityData] = useState<
    Array<GetObjectivesResponse>
  >([]);
  const [revenueData, setrevenueData] = useState<Array<GetObjectivesResponse>>(
    []
  );

  //App Data
  const activeFbClient = useAppSelector(
    state => state.facebookAccount.ActiveClient
  );
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const googleCampaigns = useAppSelector(
    state => state.campaigns.GoogleCampaigns
  );
  const facebookCampaigns = useAppSelector(
    state => state.campaigns.FacebookCampaigns
  );
  const bingCampaigns = useAppSelector(state => state.campaigns.BingCampaigns);
  const id_token = useAppSelector(state => state.authentication.id_token);
  const clientName = useAppSelector(
    state => state.clientsData.ActiveClient?.crm_client_name
  );

  //Mutations
  const [GetObjectivesAction, GetObjectivesResponse] =
    useGetObjectivesMutation();
  const [getGoogleCampaignsAction] = useGetGoogleCampaignsMutation();
  const [getFacebookCampaignsAction] = useGetFacebookCampaignsMutation();
  const [getBingCampaignsAction] = useGetBingCampaignsMutation();
  //Custom Functions
  const getAllGoogleCampaings = async () => {
    try {
      const response: any = await getGoogleCampaignsAction(
        activeCRMClient ? activeCRMClient.google_client_id : ''
      ).unwrap();
      if (response) {
        // setgoogleCampaigns(response);
        dispatch(setGoogleCampaignsData({ GoogleCampaigns: response }));
      }
    } catch (err: any) {
      // toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const getAllBingCampaings = async () => {
    try {
      const response: Array<any> = await getBingCampaignsAction(
        activeCRMClient !== null ? activeCRMClient.bing_client_id : ''
      ).unwrap();
      if (response) {
        dispatch(setBingCampaignsData({ BingCampaigns: response }));
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      dispatch(setBingCampaignsData({ BingCampaigns: [] }));
      console.log(err);
    }
  };
  const getAllFbCampaings = async () => {
    try {
      const response: Array<any> = await getFacebookCampaignsAction(
        activeCRMClient !== null ? activeCRMClient.fb_client_id : activeFbClient
      ).unwrap();
      if (response) {
        dispatch(setFacebookCampaignsData({ FacebookCampaigns: response }));
      }
    } catch (err: any) {
      // toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const getObjectivesData = async () => {
    try {
      const response: any = await GetObjectivesAction({
        id_token: id_token,
        client_name: clientName
      }).unwrap();
      if (response) {
        const opportunityDataSet = response.filter(
          opp =>
            opp.objective === 'Opportunity' || opp.objective === 'opportunity'
        );
        const revenueDataSet = response.filter(
          opp => opp.objective === 'Revenue' || opp.objective === 'revenue'
        );
        setopportunityData(opportunityDataSet);
        setrevenueData(revenueDataSet);
      }
    } catch (err: any) {
      // toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };

  useEffect(() => {
    if (activeCRMClient === null) {
      toast.warning('Please Select a Client');
    } else {
      getAllFbCampaings();
      getAllGoogleCampaings();
      getObjectivesData();
      getAllBingCampaings();
    }
  }, [activeCRMClient]);

  return (
    <>
      {show && (
        <FulcrumCustomModel
          show={show}
          setShow={setShow}
          ComponentForm={
            <AssignObjectives
              fbCampaigns={facebookCampaigns}
              googleCampaigns={googleCampaigns}
              bingCampaigns={bingCampaigns}
            />
          }
        />
      )}

      {editModelshow && (
        <FulcrumCustomModel
          show={editModelshow}
          setShow={setEditModelShow}
          ComponentForm={
            <EditObjectives
              fbCampaigns={facebookCampaigns}
              googleCampaigns={googleCampaigns}
              bingCampaigns={bingCampaigns}
              editModelData={editModelData}
            />
          }
        />
      )}

      <Container>
        <Col lg={12}>
          <FulcrumNavBar
            NavData={{
              NavHeading: 'Objectives',
              NavText:
                'This is what your budget allocation will optimize towar',
              hasButton: true,
              buttonText: 'Assign Objectives',
              buttonOnClick: () => {
                setShow(true);
              },
              hasAlert: false
            }}
          />
        </Col>

        <Row>
          <Col lg={12}>
            <Container>
              {!GetObjectivesResponse.isLoading ? (
                <>
                  <ObjectivesTable
                    ObjectivesTableFilters={ObjectivesOpportunityFilter}
                    TableData={{
                      heading: 'Opportunity',
                      data: opportunityData
                    }}
                    show={editModelshow}
                    setShow={setEditModelShow}
                    setEditData={setEditModelData}
                  />
                  <ObjectivesTable
                    ObjectivesTableFilters={ObjectivesRevenueFilter}
                    TableData={{
                      heading: 'Revenue',
                      data: revenueData
                    }}
                    show={editModelshow}
                    setShow={setEditModelShow}
                    setEditData={setEditModelData}
                  />
                </>
              ) : (
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
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

type GetObjectivesResponse = {
  date_added: string;
  cpa: string;
  budget_shift: string;
  segment: string;
  account: string;
  objective: string;
  client_name: string;
  campaign_id: string;
  ad_account_id: string;
  fulcrum_email: string;
};
