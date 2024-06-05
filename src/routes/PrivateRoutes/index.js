import { Outlet, Navigate } from 'react-router-dom';
import { EXIST_LOCAL_STORAGE } from 'services/constants';
import { getStorage } from 'services/helperFunctions';

const PrivateRoutes = ({ Layout }) => {
  const AuthToken = getStorage(EXIST_LOCAL_STORAGE.AUTHTOKEN);

  return (
    // <Layout>
    // <h4>fdfdfdfd</h4>
    AuthToken ? (
      <Layout>
        {' '}
        <Outlet />
      </Layout>
    ) : (
      <Navigate to="/" />
    )

    // </Layout>
  );
};

export default PrivateRoutes;
