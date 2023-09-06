import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import styles from 'css/Accounts.module.css';
import { AddAccountFooterText } from 'static/AddAccountFooterText';
import AddAccountForm from 'components/AccountSetup/AddAccountForm';
import FulcrumNavBar from 'shared/FulcrumNavBar';
import FulcrumCustomModel from 'shared/FulcrumCustomModel';
import EditAccountsAsignCompaign from 'components/AccountSetup/EditAccountsAsignCompaign';
import EditAccountsAssignBudget from 'components/AccountSetup/EditAccountsAssignBudget';
import EditAccountsCreateRule from 'components/AccountSetup/EditAccountsCreateRule';

export default function AccountSetupContainer() {
  const [active, setActive] = useState(1);
  const [campaignEditModelshow, setCampaignEditModelShow] = useState(false);
  const [campaignEditModelData, setCampaignEditModelData] = useState(null);
  const [budgetEditModelshow, setBudgetEditModelShow] = useState(false);
  const [budgetEditModelData, setBudgetEditModelData] = useState(null);
  const [rulesEditModelshow, setRulesEditModelShow] = useState(false);
  const [rulesEditModelData, setRulesEditModelData] = useState(null);

  const increament = () => {
    setActive(active + 1);
  };
  const decreament = () => {
    setActive(active - 1);
  };
  return (
    <>
      {campaignEditModelshow && (
        <FulcrumCustomModel
          show={campaignEditModelshow}
          setShow={setCampaignEditModelShow}
          ComponentForm={
            <EditAccountsAsignCompaign editModelData={campaignEditModelData} />
          }
        />
      )}
      {budgetEditModelshow && (
        <FulcrumCustomModel
          show={budgetEditModelshow}
          setShow={setBudgetEditModelShow}
          ComponentForm={
            <EditAccountsAssignBudget editModelData={budgetEditModelData} />
          }
        />
      )}
      {rulesEditModelshow && (
        <FulcrumCustomModel
          show={rulesEditModelshow}
          setShow={setRulesEditModelShow}
          ComponentForm={
            <EditAccountsCreateRule editModelData={rulesEditModelData} />
          }
        />
      )}
      <Container className='position-relative'>
        <Col lg={12}>
          <FulcrumNavBar
            NavData={{
              NavHeading: 'Setup Account',
              NavText:
                'Connect your CRM + ad accounts to leverage your budget toward your goals + utilization rate.',
              hasButton: false
            }}
          />
        </Col>
        <Col lg={12}>
          <AddAccountForm
            setCampaignEditModelShow={setCampaignEditModelShow}
            setCampaignEditModelData={setCampaignEditModelData}
            setBudgetEditModelShow={setBudgetEditModelShow}
            setBudgetEditModelData={setBudgetEditModelData}
            setRulesEditModelShow={setRulesEditModelShow}
            setRulesEditModelData={setRulesEditModelData}
            active={active}
          />
        </Col>
      </Container>
      {active === 8 ? (
        <div className={styles.accountFormBottom}>
          <Container className={styles.formSubmitContain}>
            {AddAccountFooterText &&
              AddAccountFooterText.filter(elem => elem.key === active).map(
                (el, index) => {
                  return <p>{el.text}</p>;
                }
              )}
            <div className={styles.addAcoountFooterButtons}>
              <button className='mr-5 greyBtn' onClick={e => decreament()}>
                Back
              </button>
              <button className={styles.CompleteAccountBtn}>COMPLETE</button>
            </div>
          </Container>
        </div>
      ) : (
        <div className={styles.accountFormFooter}>
          <Container className={styles.formSubmitContain}>
            {AddAccountFooterText &&
              AddAccountFooterText.filter(elem => elem.key === active).map(
                (el, index) => {
                  return <p>{el.text}</p>;
                }
              )}

            <div className={styles.addAcoountFooterButtons}>
              <button
                className='mr-5 greyBtn'
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
    </>
  );
}
