import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MultiStepForm, Step } from 'react-multi-form';
import AdsConnectivity from './AdsConnectivity';
import AccountCRMLoginForm from './AccountCRMLoginForm';
import CreateAccountSegment from './CreateAccountSegment';
import AssignAccountObjectives from './AssignAccountObjectives';
import AssignAccountBudget from './AssignAccountBudget';
import AssignAccountCapacity from './AssignAccountCapacity';
import CreateAccountRules from './CreateAccountRules';
import AssignAccountCampaign from './AssignAccountCampaign';

import { AssignCapacityOptions } from 'static/AssignCapacityOptions';
export default function AddAccountForm({
  active,
  setCampaignEditModelShow,
  setBudgetEditModelShow,
  setBudgetEditModelData,
  setRulesEditModelShow,
  setRulesEditModelData,
  setCampaignEditModelData
}: activePropsInterface) {
  const [formData, setFormData] = useState({
    segmentName: '',
    appKey: '',
    clientId: '',
    clientSecret: '',
    tenantId: ''
  });

  const handelFormData = (newData: any) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  useEffect(() => {
    if (document.getElementsByClassName('cusstomFormStyling')) {
      var childNodes: any =
        document.getElementsByClassName('cusstomFormStyling')[0].childNodes[0]
          .childNodes[0].childNodes;
      var childNodemain: any =
        document.getElementsByClassName('cusstomFormStyling')[0].childNodes[0]
          .childNodes[0];

      childNodemain.classList.add('customStepper');
      for (var i = 0; i < childNodes.length; i++) {
        if (
          getComputedStyle(childNodes[i], '::after').content !== 'none' ||
          getComputedStyle(childNodes[i], '::before').content !== 'none'
        ) {
          childNodes[i].classList.add('current' + i, 'current');
        }

        if (i % 2 !== 0) {
          childNodes[i].classList.add(`stepperDivider` + i, 'stepperDivider');
        }
      }
    }
  }, [active]);

  return (
    <>
      <Container>
        <div className='cusstomFormStyling'>
          <MultiStepForm
            key={'topbar'}
            activeStep={active}
            accentColor={'#5600D6'}
          >
            <Step label='CRM'>
              <AccountCRMLoginForm
                dataHandler={handelFormData}
                data={formData}
              />
            </Step>
            <Step label='Ad Account'>
              <AdsConnectivity />
            </Step>
            <Step label='segment'>
              <CreateAccountSegment />
            </Step>
            <Step label='Objectives'>
              <AssignAccountObjectives />
            </Step>
            <Step label='Campaign'>
              <AssignAccountCampaign
                setShow={setCampaignEditModelShow}
                setData={setCampaignEditModelData}
              />
            </Step>
            <Step label='Budget'>
              <AssignAccountBudget
                setShow={setBudgetEditModelShow}
                setData={setBudgetEditModelData}
              />
            </Step>
            <Step label='Capacity'>
              <AssignAccountCapacity UserData={AssignCapacityOptions} />
            </Step>
            <Step label='Rules'>
              <CreateAccountRules
                setShow={setRulesEditModelShow}
                setData={setRulesEditModelData}
              />
            </Step>
          </MultiStepForm>
        </div>
      </Container>
    </>
  );
}

interface activePropsInterface {
  active: number;
  setCampaignEditModelShow: (show: boolean) => void;
  setBudgetEditModelShow: (show: boolean) => void;
  setRulesEditModelShow: (show: boolean) => void;
  setBudgetEditModelData: any;
  setRulesEditModelData: any;
  setCampaignEditModelData: any;
}
