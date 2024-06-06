import { Normalbreadcrumb, NormalModal } from 'components/common';
import { UserFilter, UserList, UserForm } from 'components/pages';
import { useState, useEffect } from 'react';
import { getAllUser } from 'api/user';

export const UserPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [userList, setUserList] = useState([]);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [filterObject, setFilterObject] = useState({});
  const [editUserObject, setEditUserObject] = useState(null);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };

  const handleGetUserList = async () => {
    try {
      setIsUserLoading(true);
      const userResList = await getAllUser();
      setIsUserLoading(false);
      setUserList(userResList);
    } catch (e) {
      setIsUserLoading(false);
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetUserList();
  }, []);

  const handleChangeFilter = (filterObj) => {
    setFilterObject(filterObj);
  };

  const handleUserEdit = (data) => {
    setEditUserObject(data);
    setIsOpenForm(true);
  };

  const handleUserEditSucess = (data) => {
    if (data?.id) {
      const existIndex = userList.findIndex(({ id }) => id === data.id);

      if (existIndex !== -1) {
        userList[existIndex] = data;
        setUserList([...userList]);
      } else {
        setUserList([data, ...userList]);
      }
    } else {
      setUserList([data, ...userList]);
    }

    setIsOpenForm(!isOpenForm);
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="User"
        btnLabel="Add User"
      />
      <UserFilter onChange={handleChangeFilter} />
      <UserList
        filterObject={filterObject}
        userList={userList}
        isUserLoading={isUserLoading}
        onEdit={handleUserEdit}
      />

      <NormalModal
        toggle={handleOpenLeadModal}
        title="Add User"
        isShow={isOpenForm}
      >
        <UserForm
          editUserObject={editUserObject}
          onSucess={handleUserEditSucess}
        />
      </NormalModal>
    </>
  );
};
