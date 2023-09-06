import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { MultiStepForm, Step } from 'react-multi-form';
import styles from 'css/Accounts.module.css';
import AdsConnectivityModel from './AdsConnectivityModel';
import CRMLoginModel from './CRMLoginModel';
export default function ConnectCRMForm({
  active,
  setActive
}: modelStepperProps) {
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
  const increament = () => {
    setActive(active + 1);
  };
  const decreament = () => {
    setActive(active - 1);
  };

  useEffect(() => {
    if (document.getElementsByClassName('cusstomFormStyling')) {
      var childNodes: any =
        document.getElementsByClassName('cusstomFormStyling')[0].childNodes[0]
          .childNodes[0].childNodes;
      var childNodemain: any =
        document.getElementsByClassName('cusstomFormStyling')[0].childNodes[0]
          .childNodes[0];

      childNodemain.classList.add('customModelStepper');
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
    <div className='connectCRMFormWrapper'>
      <Container>
        <div className='cusstomFormStyling'>
          <MultiStepForm
            key={'topbar'}
            activeStep={active}
            accentColor={'#5600D6'}
          >
            <Step label='CRM LOGIN'>
              <CRMLoginModel dataHandler={handelFormData} data={formData} />
            </Step>
            <Step label='Ads Connectivity'>
              <AdsConnectivityModel />
            </Step>
          </MultiStepForm>
        </div>
      </Container>
      {active === 2 ? (
        <div className={styles.accountFormBottom}>
          <Container className={styles.formSubmitContain}>
            <p></p>
            <div className={styles.addAcoountFooterButtons}>
              <button
                className='mr-5  greyBtn mb-2'
                onClick={e => decreament()}
              >
                Back
              </button>
              <button
                style={{ background: '#5600D6 ' }}
                className={`mb-2 ${styles.CompleteAccountBtn}`}
              >
                Connect Account
              </button>
            </div>
          </Container>
        </div>
      ) : (
        <div className={styles.accountFormFooter}>
          <Container className={styles.formSubmitContain}>
            <p></p>

            <div className={styles.addAcoountFooterButtons}>
              <button
                className='mr-5 greyBtn '
                disabled={active === 1}
                onClick={e => decreament()}
              >
                Back
              </button>
              <button className='blackBtn' onClick={e => increament()}>
                Next
              </button>
            </div>
          </Container>
        </div>
      )}
    </div>
  );
}
interface modelStepperProps {
  active: number;
  setActive: (show: number) => void;
}
