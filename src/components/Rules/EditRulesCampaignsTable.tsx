import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import SelectField from 'shared/SelectField';
import styles from 'css/AssignCampaign.module.css';
import styles2 from 'css/Accounts.module.css';

import InputField from 'shared/InputField';
import { useNavigate } from 'react-router-dom';
import { useCreateCampaignsRuleMutation } from 'services/rulesApi';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import ReactSelectFormik from 'shared/ReactSelectFormik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import Loading from 'shared/Loading';
import { useAppSelector } from 'app/hooks';

export default function EditRulesCampaignsTable(editModelData: any) {
  const [fieldsData, setFieldsData] = useState<LooseObject>(
    editModelData.editModelData
  );
  const [updatedGoogleCampaigns, setupdatedGoogleCampaigns] = useState<
    Array<any>
  >([]);
  const [campaignsData, setcampaignsData] = useState([]);
  const navigate = useNavigate();
  const [CreateCampaignsRuleAction, CreateCampaignsRuleResponse] =
    useCreateCampaignsRuleMutation();
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
    crm_client_name: fieldsData?.crm_client_name,
    service_titan_id: fieldsData?.service_titan_id,
    campaign_name: fieldsData?.campaign_name,
    campaign_id: fieldsData?.campaign_id,
    budget: fieldsData?.budget,
    cpa: fieldsData?.cpa,
    roas: fieldsData?.roas,
    scale: fieldsData?.scale,
    spend: fieldsData?.spend
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
  let allCampaignsOptions: Array<options> = [];

  const googleCampaigns = useAppSelector(
    state => state.campaigns.GoogleUpdatedCampaigns
  );
  const facebookCampaigns = useAppSelector(
    state => state.campaigns.FacebookCampaigns
  );
  const bingCampaigns = useAppSelector(state => state.campaigns.BingCampaigns);

  useEffect(() => {
    const updatedData = googleCampaigns.map(item => {
      return {
        ...item,
        campaign_name: item.name,
        campaign_id: item.campaignid
      };
    });
    setupdatedGoogleCampaigns(updatedData);
  }, []);
  let mergeCampaigns = [
    ...updatedGoogleCampaigns,
    ...facebookCampaigns,
    ...bingCampaigns
  ];

  if (!fieldsData) return <></>;
  console.log(campaignsData);
  return (
    <>
      <Container>
        <Row className='mb-4'>
          <Col lg={12} className='mt-5 mb-5'>
            <div className={styles.AdsContainer}>
              <h3 className={styles.addsConnectivityHead}>Edit Rules</h3>
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
                  CreateCampaignsRuleEntry(values);
                  actions.setSubmitting(false);
                }}
              >
                {props => {
                  const { setFieldValue, errors } = props;
                  allCampaignsOptions = [];
                  mergeCampaigns &&
                    mergeCampaigns.map((elem, index) => {
                      const campaign_name: string = !elem.campaign_name
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
                          {/* <ReactSelectFormik
                            fields={[
                              { label: 'Marketing', value: 'Marketing' },
                              { label: 'Ads', value: 'Ads' }
                            ]}
                            fieldName='campaign_name'
                            label='Campaign Name'
                            col={6}
                            value={fieldsData?.campaign_name}
                            hasError={errors.campaign_name}
                          /> */}
                          <ReactSelectFormik
                            fields={allCampaignsOptions}
                            fieldName='campaign_name'
                            label='Campaign Name'
                            col={6}
                            hasError={errors.campaign_name}
                            stateCampaignChange={setFieldValue}
                            value={fieldsData?.campaign_name}
                          />
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
                              defaultValue={fieldsData?.budget}
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
                              defaultValue={fieldsData?.cpa}
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
                              defaultValue={fieldsData?.cpa}
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
                              defaultValue={fieldsData?.spend}
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
                              defaultValue={fieldsData?.scale}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col lg={12}>
                        <Button type='submit' className='ModelCustomBtn'>
                          {CreateCampaignsRuleResponse.isLoading ? (
                            <Loading loaderText='Please wait' />
                          ) : (
                            <>UPDATE RULE</>
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
interface LooseObject {
  [key: string]: string;
}

interface CreateCampaignsRuleResponse {
  crm_client_name: string;
  service_titan_id: string;
  campaign_name: string;
  campaign_id: string;
  budget: string;
  cpa: string;
  roas: string;
  scale: string;
  spend: string;
}
type options = {
  value: string | number;
  label: string | number;
};
