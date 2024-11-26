import React, { useEffect, useState } from 'react';
import './sideBar.scss';
import { MENU } from 'services/constants';
import { NavLink } from 'react-router-dom';
import { getLoginUserDetail } from 'services/helperFunctions';

export const SideBar = () => {
  const [userDetails, setUserDetails] = useState(null); // To store the user details

  useEffect(() => {
    // Fetch the login user details when the component mounts
    const fetchUserDetails = async () => {
      try {
        const details = await getLoginUserDetail();
        setUserDetails(details);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchUserDetails();
  }, []); // Empty dependency array to run only once on component mount

  return (
    <div className="border-end bg-white" id="sidebar-wrapper">
      {userDetails ? (
        <ul className="nav nav-pills flex-column side-menu-list mb-auto">
          {MENU.map(({ title, icon, link, userType = [] }) =>
            userType.includes(userDetails.userType) ? (
              <li className="nav-item" key={title}>
                <NavLink
                  to={link}
                  activeClassName="active"
                  className="nav-link"
                  aria-current="page"
                >
                  <span className="material-icons">{icon}</span> {title}
                </NavLink>
              </li>
            ) : null
          )}
        </ul>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};
