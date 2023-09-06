import { useAppDispatch, useAppSelector } from 'app/hooks';
import { logout } from 'features/auth/authSlice';
import React, { useState } from 'react';
import { Card, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { sideBottomTabs, sideTabs } from 'static/sidetabs';
import styles from '../css/Sidebar.module.css';
export default function SidebarMobile() {
  const location = window.location.pathname;
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const profileImage = useAppSelector(
    state => state.profile.data?.profile_picture_url
  );
  const profileData = useAppSelector(state => state.profile.data);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={styles.customSidebarMobile}>
      <i
        className={` ${styles.mobileMenuIcon} fa-solid fa-bars `}
        onClick={handleShow}
      ></i>
      <Offcanvas show={show} onHide={handleClose} style={{ width: '300px' }}>
        <Offcanvas.Header closeButton>
          <div className={`${styles.userProfileMobile} clearfix`}>
            {profileImage && (
              <img
                className={styles.thumbnailImage}
                src={profileImage}
                alt='user profile'
              />
            )}
            <div className={styles.userProfileText}>
              <strong>
                {profileData?.first_name} {profileData?.last_name}
              </strong>
              <span>{profileData?.username}</span>
            </div>
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body className='p-0'>
          <Card
            style={{ height: '100%' }}
            className={styles.sidebarCard}
            id={styles.sidebar}
          >
            <Card.Body className='p-0'>
              <div className={styles.sidebarContent}>
                <nav className={styles.sidebarItems}>
                  <ul>
                    {sideTabs &&
                      sideTabs.map((tab, index) => {
                        return (
                          <>
                            <li
                              className={
                                tab.url === location ? `${styles.active}` : ''
                              }
                              key={index}
                            >
                              <Link to={tab.url} onClick={handleClose}>
                                <i className={tab.icon}></i>

                                <span className={styles.linkText}>
                                  {tab.name}
                                </span>
                              </Link>
                            </li>
                          </>
                        );
                      })}
                    <div
                      className={
                        (styles.sideBarBottomTabs,
                        styles.sideBarBottomTabsMobile)
                      }
                    >
                      {sideBottomTabs &&
                        sideBottomTabs.map((tab, index) => {
                          return (
                            <>
                              <li
                                className={
                                  tab.url === location ? `${styles.active}` : ''
                                }
                                key={index}
                              >
                                <Link to={tab.url}>
                                  <i className={tab.icon}></i>
                                  <span className={styles.linkText}>
                                    {tab.name}
                                  </span>
                                </Link>
                              </li>
                            </>
                          );
                        })}
                      <li>
                        <div onClick={logoutHandler}>
                          <i className='fa-solid fa-arrow-right-from-bracket'></i>
                          <span className={styles.linkText}>Logout</span>
                        </div>
                      </li>
                    </div>
                  </ul>
                </nav>
              </div>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </div>
  );
}
