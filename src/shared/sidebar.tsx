import { Fragment, useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import { sideBottomTabs, sideTabs } from '../static/sidetabs';
import { Link } from 'react-router-dom';
import styles from '../css/Sidebar.module.css';
import { logout } from 'features/auth/authSlice';
import { useAppDispatch, useAppSelector } from 'app/hooks';
export default function SideBar() {
  const location = window.location.pathname;
  const dispatch = useAppDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };
  const profileData = useAppSelector(state => state.profile.data);
  const profileImage = useAppSelector(
    state => state.profile.data?.profile_picture_url
  );

  useEffect(() => {}, [profileImage]);
  const userFullName =
    profileData?.first_name && profileData?.last_name
      ? profileData?.first_name + ' ' + profileData?.last_name
      : 'Laura Barbosa';
  return (
    <Fragment>
      <Card
        style={{ height: '100%' }}
        className={styles.sidebarCard}
        id={styles.sidebar}
      >
        <Card.Body>
          <div className={`${styles.userProfile} clearfix`}>
            {profileImage ? (
              <img
                className={styles.thumbnailImage}
                src={profileImage}
                alt='user profile'
              />
            ) : (
              <img
                className={styles.thumbnailImage}
                src='images/accounts/profile.png'
                alt='user profile'
              />
            )}

            <div className={styles.userProfileText}>
              <strong className='textCapitalize'>{userFullName}</strong>
              <span className='textCapitalize'>{profileData?.username}</span>
            </div>
          </div>
          <div className={styles.sidebarContent}>
            <nav className={styles.sidebarItems}>
              <ul>
                {sideTabs &&
                  sideTabs.map((tab, index) => {
                    return (
                      <li
                        className={
                          tab.url === location ? `${styles.active}` : ''
                        }
                        key={index}
                      >
                        <Link to={tab.url}>
                          <i className={tab.icon}></i>

                          <span className={styles.linkText}>{tab.name}</span>
                        </Link>
                      </li>
                    );
                  })}
                <div className={styles.sideBarBottomTabs}>
                  {sideBottomTabs &&
                    sideBottomTabs.map((tab, index) => {
                      return (
                        <li
                          className={
                            tab.url === location ? `${styles.active}` : ''
                          }
                          key={index}
                        >
                          <Link to={tab.url}>
                            <i className={tab.icon}></i>
                            <span className={styles.linkText}>{tab.name}</span>
                          </Link>
                        </li>
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
    </Fragment>
  );
}
