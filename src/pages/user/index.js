import { Normalbreadcrumb, NormalModal } from 'components/common';
import { UserFilter, UserList, UserForm } from 'components/pages';
import { useState } from 'react';

export const UserPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="User"
        btnLabel="Add User"
      />
      <UserFilter />
      <UserList />

      <NormalModal
        toggle={handleOpenLeadModal}
        title="Add User"
        isShow={isOpenForm}
      >
        <UserForm onSucess={handleOpenLeadModal} />
      </NormalModal>
    </>
  );
};
