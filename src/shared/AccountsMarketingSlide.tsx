import React, { useState } from 'react';
import { Button, ButtonGroup, Form } from 'react-bootstrap';
import styles from 'css/Accounts.module.css';

export default function AccountsMarketingSlide({
  data,
  functionalData
}: AccountsMarketingSlideProps) {
  const [userEmail, setuserEmail] = useState<string>(
    functionalData.activeAccount &&
      data.connected_emails.includes(functionalData.activeAccount)
      ? functionalData.activeAccount
      : ''
  );
  return (
    <div className={styles.accountsGrid}>
      <div className={styles.accountsItems}>
        <>
          <img
            style={{
              width: '86px',
              height: '86px',
              marginBottom: '10px'
            }}
            src={data.imageUrl}
            alt='description'
          />
          <h4>{data.heading}</h4>
          <p>{data.description}</p>

          {functionalData.connectedStatus ? (
            <p className='d-flex align-items-center mb-0'>
              <span className='activeDot '></span> Connected:
              {functionalData.activeClientName}
            </p>
          ) : (
            <p className='d-flex align-items-center mb-0'></p>
          )}
        </>
      </div>

      {data.connected_emails.length || data.yelpConnectedStatus ? (
        <ButtonGroup
          aria-label='Basic example'
          className={styles.marketingButtonactive}
          style={{ marginBottom: '10px' }}
        >
          <Button
            onClick={() => functionalData.handleDisconnect(userEmail)}
            className={styles.marketingButtonactive}
          >
            Disconnect
          </Button>
          {!data.yelpConnectedStatus && (
            <Button
              style={{ width: '45px', padding: '0' }}
              className={styles.marketingButtonactive}
              onClick={() => functionalData.handleConnect()}
            >
              <i className='fa-solid fa-plus'></i>
            </Button>
          )}
        </ButtonGroup>
      ) : (
        <Button
          onClick={() => functionalData.handleConnect()}
          className={styles.marketingButton}
        >
          Connect
        </Button>
      )}

      {data.connected_emails.length ? (
        <Form.Select
          defaultValue={userEmail}
          className={`customFulcrumSelect ${styles.customSliderSelect}`}
          onChange={e => {
            functionalData.getManagersAccounts &&
              functionalData.getManagersAccounts(e.target.value);
            setuserEmail(e.target.value);
          }}
          placeholder='Select User'
        >
          <option style={{ display: 'none' }}>Select Account</option>
          <optgroup label='Connected Accounts'>
            {data.connected_emails.length &&
              data.connected_emails.map((elem, index) => {
                return <option value={elem}>{elem}</option>;
              })}
          </optgroup>
        </Form.Select>
      ) : (
        <></>
      )}
    </div>
  );
}
interface AccountsMarketingSlideProps {
  data: MarketingSlideData;
  functionalData: MarketingSlideFunctionalData;
}
interface MarketingSlideData {
  connected_emails: Array<string>;
  yelpConnectedStatus?: boolean;
  description: string;
  heading: string;
  imageUrl: string;
  slug: string;
}
interface MarketingSlideFunctionalData {
  activeAccount?: string;
  activeClientName?: string;
  connectedStatus: boolean;
  handleDisconnect: (email: string) => void;
  handleConnect: () => void;
  getManagersAccounts?: (email: string) => void;
}
