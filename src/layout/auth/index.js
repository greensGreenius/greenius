/* eslint-disable import/no-extraneous-dependencies */
import './authLayout.scss';
import brnadLogo from 'assets/img/greenius_logo_sm.svg';
import brnadFullLogo from 'assets/img/GREENIUS_logo.svg';
import loginRightBg from 'assets/img/login-right-bg.png';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <div className="auth_Layout login-wrapper">
      <div className="total_height">
        <div className="brand-logo">
          <img alt="doodle_logo" className="brand_logo" src={brnadLogo} />
        </div>

        <div className="justify-content-center d-flex">
          <div className="w-100">
            <div className="login_page">
              <div className="ms-5 mt-5 brand_name">
                <img
                  src={brnadFullLogo}
                  className="brand-name-logo"
                  alt="Avatar"
                />
                <h3 className="text-center mt-3 font-regular-29">Log in</h3>
                <Outlet />
              </div>
              <div className="doodlechat_top">
                <img src={loginRightBg} alt="loginRightBg" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
