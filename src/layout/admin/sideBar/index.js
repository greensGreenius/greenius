/* eslint-disable jsx-a11y/anchor-is-valid */
// import { Outlet } from 'react-router-dom';
import './sideBar.scss';
import { MENU, EXIST_LOCAL_STORAGE } from 'services/constants';
import { NavLink } from 'react-router-dom';
import { getStorage } from 'services/helperFunctions';
// import { EXIST_LOCAL_STORAGE } from 'services/constants';

export const SideBar = () => {
  const handleGetLoginUserDetail = () => {
    let userData = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
    if (userData) {
      userData = JSON.parse(userData);
      return userData;
    }
    return null;
  };

  return (
    // <!-- Sidebar-->
    <div className="border-end bg-white" id="sidebar-wrapper">
      {/* <div className="sidebar-heading border-bottom bg-white">  
        Start Bootstrap
      </div> */}
      {/* <div className="list-group list-group-flush">
        <a
          className="list-group-item list-group-item-action list-group-item-white p-3"
          href="#!"
        >
          Dashboard
        </a>
        <a
          className="list-group-item list-group-item-action list-group-item-white p-3"
          href="#!"
        >
          Shortcuts
        </a>
        <a
          className="list-group-item list-group-item-action list-group-item-white p-3"
          href="#!"
        >
          Overview
        </a>
        <a
          className="list-group-item list-group-item-action list-group-item-white p-3"
          href="#!"
        >
          Events
        </a>
        <a
          className="list-group-item list-group-item-action list-group-item-white p-3"
          href="#!"
        >
          Profile
        </a>
        <a
          className="list-group-item list-group-item-action list-group-item-white p-3"
          href="#!"
        >
          Status
        </a>
      </div> */}

      <ul className="nav nav-pills flex-column side-menu-list mb-auto">
        {MENU.map(
          ({ title, icon, link, userType = [] }) =>
            userType.includes(handleGetLoginUserDetail()?.userType) && (
              <li className="nav-item">
                <NavLink
                  to={link}
                  activeClassName="active"
                  className="nav-link"
                  aria-current="page"
                >
                  <span className="material-icons">{icon}</span> {title}
                </NavLink>
              </li>
            )
        )}
      </ul>
    </div>
  );
};
