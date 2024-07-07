import { Outlet, Navigate } from 'react-router-dom';
import { EXIST_LOCAL_STORAGE, USER_TYPE } from 'services/constants';
import { getStorage } from 'services/helperFunctions';

const PrivateRoutes = ({ Layout }) => {
  const AuthToken = getStorage(EXIST_LOCAL_STORAGE.AUTHTOKEN);
  let user = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
  user = JSON.parse(user);
  return (
    // <Layout>
    // <h4>fdfdfdfd</h4>
    !!AuthToken || user?.userType === USER_TYPE.CANDIDATE ? (
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
