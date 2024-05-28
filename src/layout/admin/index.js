import { Outlet } from 'react-router-dom';
import { SideBar } from './sideBar';
import { Header } from './header';

export const Adminlayout = () => {
  return (
    <>
      <Header />
      <div className="d-flex" id="wrapper">
        <SideBar />
        <div id="page-content-wrapper">
          <div className="container-fluid mt-4">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
