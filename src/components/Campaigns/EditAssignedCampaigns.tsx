import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { usePostAssignCampaignsMutation } from 'services/campaignsApi';

import { toast } from 'react-toastify';
import { useAppSelector } from 'app/hooks';
import Loading from 'shared/Loading';

export default function EditAssignedCampaigns(editModelData) {
  const navigate = useNavigate();
  const [fieldsData, setFieldsData] = useState<LooseObject>(
    editModelData.editModelData
  );
  const [activeAccountName, setactiveAccountName] = useState(
    fieldsData.account
  );
  let allCampaignsOptions: Array<options> = [];

  const campaignsAssignSchema = Yup.object().shape({
    segments: Yup.string().nullable().required('Field is required'),
    // ad_account_id: Yup.string().nullable().required('Field is required'),
    campaign_name: Yup.string().nullable().required('Field is required'),
    account: Yup.string().nullable().required('Field is required')
  });

  const [formData, setFormData] = useState({
    client_name: fieldsData.client_name,
    campaign_id: fieldsData.campaign_id,
    campaign_name: fieldsData.campaign_name,
    segments: '',
    account: fieldsData.account,
    ad_account_id: fieldsData.ad_account_id
  });
  const [assignCampaignsAction, AssignCampaignResponse] =
    usePostAssignCampaignsMutation();

  const id_token = useAppSelector(state => state.authentication.id_token);

  const [ActiveAccount, setActiveAccount] = useState<Array<any> | null>(null);
  const googleCampaigns = useAppSelector(
    state => state.campaigns.GoogleUpdatedCampaigns
  );
  const facebookCampaigns = useAppSelector(
    state => state.campaigns.FacebookCampaigns
  );
  const bingCampaigns = useAppSelector(state => state.campaigns.BingCampaigns);
  const createCampaignsEntry = async data => {
    let temp = data;

    try {
      const response: any = await assignCampaignsAction({
        data: temp,
        id_token: id_token
      }).unwrap();

      if (response) {
        toast.success(response);
        navigate('/campaigns');
      }
    } catch (err: any) {
      toast.error('There is some Error. Please try again.');
      console.log(err);
    }
  };
  useEffect(() => {
    if (activeAccountName === 'fb') {
      setActiveAccount(facebookCampaigns);
    } else if (activeAccountName === 'google') {
      setActiveAccount(googleCampaigns);
    } else if (activeAccountName === 'bing') {
      setActiveAccount(bingCampaigns);
    }
  }, [activeAccountName]);
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={formData}
        validationSchema={campaignsAssignSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, actions) => {
          actions.resetForm({ values: formData });
          createCampaignsEntry(values);
          actions.setSubmitting(false);
        }}
      >
        {props => {
          const { setFieldValue, errors } = props;
          allCampaignsOptions = [];
          ActiveAccount &&
            ActiveAccount.map((elem, index) => {
              const campaign_name: string = !elem.name
                ? elem.campaign_name
                : elem.name;
              const campaign_id: string | number = !elem.campaignid
                ? elem.campaign_id
                : elem.campaignid;
              const campaignValue = campaign_name.toLowerCase();
              if (campaign_id) {
                const temp = {
                  value: campaignValue,
                  label: campaign_name,
                  id: campaign_id
                };
                allCampaignsOptions.push(temp);
              }
              return null;
            });
          return (
            <Form>
              <Container>
                <Row className='mb-4'>
                  <Col lg={12} className='mt-5 mb-5'>
                    <div className={styles.AdsContainer}>
                      <h3 className={styles.addsConnectivityHead}>
                        Edit Assign Campaigns
                      </h3>
                    </div>
                  </Col>
                  <div className={styles.formContainer}>
                    <Col className='mx-auto' lg={8}>
                      <Col lg={12} className={styles.fieldContainer}>
                        <Row>
                          <ReactSelectFormik
                            fields={[
                              { label: 'Service', value: 'service' },
                              { label: 'Sales', value: 'sales' },
                              { label: 'Install', value: 'install' },
                              { label: 'Ignore', value: 'ignore' }
                            ]}
                            fieldName='segments'
                            label='Segments'
                            col={6}
                            hasError={errors.segments}
                            value={
                              fieldsData?.segments &&
                              fieldsData?.segments.toLowerCase()
                            }
                          />
                          <ReactSelectFormik
                            fields={[
                              { label: 'Facebook', value: 'fb' },
                              { label: 'Google', value: 'google' },
                              { label: 'Bing', value: 'bing' }
                            ]}
                            fieldName='account'
                            label='account'
                            col={6}
                            hasError={errors.account}
                            onChange={choice => {
                              setactiveAccountName(choice.value);
                            }}
                            disabled={true}
                            value={
                              fieldsData?.account &&
                              fieldsData?.account.toLowerCase()
                            }
                          />
                          <Col lg={12}>
                            <label className={styles2.labelStyle}>
                              CAMPAIGNS
                              <ErrorMessage
                                component='span'
                                name='campaign_name'
                              />
                            </label>
                            <Field
                              autoFocus={true}
                              className={`form-control  h-38 ${styles2.formField}`}
                              type='text'
                              name='campaign_name'
                              disabled
                              value={fieldsData.campaign_name}
                            />
                          </Col>
                          <Field
                            autoFocus={true}
                            className={`form-control h-38 ${styles.formField}`}
                            type='hidden'
                            name='campaign_id'
                          />
                        </Row>
                      </Col>

                      <Col lg={12} className={styles.fieldContainer}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {AssignCampaignResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : (
                            <>Assign Campaign</>
                          )}
                        </Button>
                      </Col>
                    </Col>
                  </div>
                </Row>
              </Container>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

type options = {
  value: string | number;
  label: string | number;
};
interface LooseObject {
  [key: string]: string;
}
