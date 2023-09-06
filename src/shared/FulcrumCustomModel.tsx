import { useEffect } from 'react';
import { CloseButton } from 'react-bootstrap';

export default function FulcrumCustomModel({
  show,
  setShow,
  ComponentForm
}: fulcrumModelProps) {
  useEffect(() => {
    if (show) {
      document
        .getElementsByTagName('body')[0]
        .setAttribute('style', 'overflow:hidden');
    }
  }, [show]);
  const closeToggle = () => {
    setShow(false);
    document.getElementsByTagName('body')[0].setAttribute('style', '');
  };
  return (
    <>
      <div
        className='customFulcrumModel'
        style={{ display: show ? 'block' : 'none' }}
      >
        <div className='customFulcrumModelHeader'>
          <CloseButton
            className='accountsModelCustomClose'
            onClick={closeToggle}
          />
        </div>
        <div className='customFulcrumModelDialog'>
          <div className='customFulcrumModelContent'>{ComponentForm}</div>
        </div>
      </div>
    </>
  );
}
interface fulcrumModelProps {
  show: boolean;
  setShow: (show: boolean) => void;
  ComponentForm: React.ReactNode;
}
