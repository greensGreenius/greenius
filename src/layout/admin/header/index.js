import { Link } from 'react-router-dom';
import brnadFullLogo from 'assets/img/GREENIUS_logo.svg';
import './header.scss';

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow app-header">
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
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <Link className="navbar-brand" to="/home">
                Home
              </Link>
            </li>
          </ul>
          {/* <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success" type="submit">
              Search
            </button>
          </form> */}
        </div>
      </div>
    </nav>
  );
};
