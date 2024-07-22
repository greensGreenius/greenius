import { Link, useNavigate } from 'react-router-dom';
import { NormalButton } from 'components/common';
import brnadFullLogo from 'assets/img/GREENIUS_logo.svg';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';
import LogoutIcon from '@mui/icons-material/Logout';
import './header.scss';

export const Header = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    Swal.fire({
      title: 'Are you sure you want to logout!',
      // text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  const handleOpenMenu = () => {
    try {
      const sideBar = document.getElementById('sidebar-wrapper');
      if (sideBar.style.marginLeft === '0px') {
        sideBar.style.marginLeft = '-17rem';
      } else {
        sideBar.style.marginLeft = 0;
      }
    } catch (e) {
      console.log('e-------', e);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-primary shadow app-header">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/lead">
          <img
            alt="doodle_logo"
            className="brand_logo"
            width={200}
            src={brnadFullLogo}
          />
        </Link>
        <button
          className="navbar-toggler"
          onClick={handleOpenMenu}
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item">
              {/* <Link className="navbar-brand" to="/home">
                Home
              </Link> */}
            </li>
          </ul>
          {/* { */}
          <NormalButton
            onClick={handleLogin}
            label={
              <span>
                <LogoutIcon /> Logout
              </span>
            }
            className="btn text-white"
            variant="outlined"
          />
          {/* } */}
        </div>
      </div>
    </nav>
  );
};
