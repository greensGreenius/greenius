import { Normalbreadcrumb } from 'components/common';
import { CandidateProfileForm } from 'components/pages';
// import { useState, useEffect } from 'react';
// import { getAllUser } from 'api/user';
// import { multySearchObjects } from 'services/helperFunctions';

export const ProfilePage = () => {
  //   const [isOpenForm, setIsOpenForm] = useState(false);
  //   const [userList, setUserList] = useState([]);
  //   const [isUserLoading, setIsUserLoading] = useState(false);

  return (
    <>
      <Normalbreadcrumb title="Profile" isCount={false} />
      <CandidateProfileForm />
    </>
  );
};
