import React, { memo, useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const BellDropdown = () => {
  const [show, setshow] = useState(false);
  const menyToggole = () => {
    setshow(!show);
  };
  const closeToggle = () => {
    setshow(false);
  };
  document.addEventListener('mousedown', closeToggle);

  return (
    <>
      <Dropdown drop='start' show={show}>
        <i onClick={menyToggole} className='fa-regular fa-bell customBell'></i>
        <Dropdown.Menu className='customNotificationMenus'>
          <Dropdown.Item>Notification 1</Dropdown.Item>
          <Dropdown.Item>Notification 2</Dropdown.Item>
          <Dropdown.Item>Notification 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};
export default memo(BellDropdown);
