import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';
import { useNavigate } from 'react-router-dom';
import { useCreateCampaignsRuleMutation } from 'services/rulesApi';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Loading from 'shared/Loading';
import {
  setBingCampaignsData,
  setFacebookCampaignsData,
  setGoogleUpdatedCampaignsData
} from 'features/campaigns/campaignsSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import {
  useGetBingCampaignsMutation,
  useGetFacebookCampaignsMutation,
  useGetGoogleUpdatedCampaignsMutation
} from 'services/campaignsApi';

export default function AddRulesCampaignsTable() {
  let allCampaignsOptions: Array<options> = [];
  const [updatedGoogleCampaigns, setupdatedGoogleCampaigns] = useState<
    Array<any>
  >([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [CreateCampaignsRuleAction, CreateCampaignsRuleResponse] =
    useCreateCampaignsRuleMutation();
  const [getFacebookCampaignsAction] = useGetFacebookCampaignsMutation();
  const [getGoogleUpdatedCampaignsAction] =
    useGetGoogleUpdatedCampaignsMutation();
  const [getBingCampaignsAction] = useGetBingCampaignsMutation();
  const googleCampaigns = useAppSelector(
    state => state.campaigns.GoogleUpdatedCampaigns
  );
  const facebookCampaigns = useAppSelector(
    state => state.campaigns.FacebookCampaigns
  );
  const bingCampaigns = useAppSelector(state => state.campaigns.BingCampaigns);
  const activeCRMClient = useAppSelector(
    state => state.clientsData.ActiveClient
  );
  const ruleCreateSchema = Yup.object().shape({
    crm_client_name: Yup.string().nullable().required('Field is Required'),
    service_titan_id: Yup.string().nullable().required('Field is Required'),
    campaign_name: Yup.string().nullable().required('Field is Required'),
    campaign_id: Yup.string().nullable().required('Field is Required'),
    budget: Yup.string().nullable().required('Field is Required'),
    cpa: Yup.string().nullable().required('Field is Required'),
    roas: Yup.string().nullable().required('Field is Required'),
    scale: Yup.string().nullable().required('Field is Required'),
    spend: Yup.string().nullable().required('Field is Required')
  });
  const [formData, setFormData] = useState({
    crm_client_name: activeCRMClient?.crm_client_name,
    service_titan_id: activeCRMClient?.service_titan_client_id,
    campaign_name: '',
    campaign_id: '',
    budget: '',
    cpa: '',
    roas: '',
    scale: '',
    spend: ''
  });
  const CreateCampaignsRuleEntry = async data => {
    try {
      const response: any = await CreateCampaignsRuleAction(data).unwrap();

      if (response) {
        toast.success(response);
        navigate('/rules');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  const getAllGoogleCampaings = async () => {
    try {
      const response: any = await getGoogleUpdatedCampaignsAction({
        db: activeCRMClient !== null ? activeCRMClient.crm_client_name : '',
        page: 1,
        page_size: 1000
      }).unwrap();
      if (response) {
        dispatch(
          setGoogleUpdatedCampaignsData({
            GoogleUpdatedCampaigns: response.data
          })
        );
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      dispatch(
        setGoogleUpdatedCampaignsData({
          GoogleUpdatedCampaigns: []
        })
      );
      console.log(err);
    }
  };
  const getAllFbCampaings = async () => {
    try {
      const response: Array<any> = await getFacebookCampaignsAction(
        activeCRMClient !== null ? activeCRMClient.fb_client_id : ''
      ).unwrap();
      if (response) {
        dispatch(setFacebookCampaignsData({ FacebookCampaigns: response }));
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
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
  useEffect(() => {
    getAllFbCampaings();
    getAllGoogleCampaings();
    getAllBingCampaings();
    const updatedData = googleCampaigns.map(item => {
      return {
        ...item,
        campaign_name: item.name,
        campaign_id: item.campaignid
      };
    });
    setupdatedGoogleCampaigns(updatedData);
  }, [activeCRMClient]);

  let mergeCampaigns = [
    ...updatedGoogleCampaigns,
    ...facebookCampaigns,
    ...bingCampaigns
  ];

  return (
    <>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>
                Add Campaign Rules
              </h3>
            </div>
          </Col>
          <div>
            <Col className='mx-auto' lg={8}>
              <Formik
                enableReinitialize={true}
                initialValues={formData}
                validationSchema={ruleCreateSchema}
                validateOnChange={false}
                validateOnBlur={false}
                onSubmit={(values, actions) => {
                  actions.resetForm({ values: formData });
                  // console.log(values);
                  CreateCampaignsRuleEntry(values);
                  actions.setSubmitting(false);
                }}
              >
                {props => {
                  const { setFieldValue, errors } = props;
                  allCampaignsOptions = [];
                  mergeCampaigns &&
                    mergeCampaigns.map((elem, index) => {
                      const campaign_name: string | number = !elem.campaign_name
                        ? ''
                        : elem.campaign_name;
                      const campaign_id: string | number = !elem.campaign_id
                        ? ''
                        : elem.campaign_id;
                      if (campaign_id) {
                        const temp = {
                          value: campaign_name,
                          label: campaign_name,
                          id: campaign_id
                        };
                        allCampaignsOptions.push(temp);
                      }
                      return null;
                    });

                  return (
                    <Form>
                      <Col lg={12}>
                        <Row>
                          <ReactSelectFormik
                            fields={allCampaignsOptions}
                            fieldName='campaign_name'
                            label='Campaign Name'
                            col={6}
                            hasError={errors.campaign_name}
                            stateCampaignChange={setFieldValue}
                          />
                          {/* <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              Campaign ID
                              <ErrorMessage component='span' name='budget' />
                            </label> */}
                          <Field
                            autoFocus={true}
                            className={`form-control h-38 ${styles.formField}`}
                            type='hidden'
                            name='campaign_id'
                          />
                          {/* </Col> */}
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              BUDGET
                              <ErrorMessage component='span' name='budget' />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='budget'
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12}>
                        <Row>
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              CPA
                              <ErrorMessage component='span' name='cpa' />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='cpa'
                            />
                          </Col>
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              ROAS
                              <ErrorMessage component='span' name='roas' />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='roas'
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12}>
                        <Row>
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              SPEND
                              <ErrorMessage component='span' name='spend' />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='spend'
                            />
                          </Col>
                          <Col lg={6}>
                            <label className={styles2.labelStyle}>
                              SCALE
                              <ErrorMessage component='span' name='scale' />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control h-38 ${styles.formField}`}
                              type='text'
                              name='scale'
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {CreateCampaignsRuleResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : (
                            <>Add RULE</>
                          )}
                        </Button>
                      </Col>
                    </Form>
                  );
                }}
              </Formik>
            </Col>
          </div>
        </Row>
      </Container>
    </>
  );
}

type options = {
  value: string | number;
  label: string | number;
};
