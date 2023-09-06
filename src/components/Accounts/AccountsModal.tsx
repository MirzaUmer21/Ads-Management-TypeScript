import { useState } from 'react';
import { CloseButton } from 'react-bootstrap';
import ConnectCRMForm from './ConnectCRMForm';

export default function AccountsModal({ show, setShow }: AccountsModalProps) {
  const [active, setActive] = useState(1);

  return (
    <>
      <div
        className='customFulcrumModel'
        style={{ display: show ? 'block' : 'none' }}
      >
        <div className='customFulcrumModelHeader'>
          <CloseButton
            className='accountsModelCustomClose'
            onClick={() => {
              setShow(false);
              setActive(1);
              document
                .getElementsByTagName('body')[0]
                .setAttribute('style', '');
            }}
          />
        </div>
        <div className='customFulcrumModelDialog'>
          <div className='customFulcrumModelContent'>
            <ConnectCRMForm setActive={setActive} active={active} />
          </div>
        </div>
      </div>
    </>
  );
}
interface AccountsModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
}
