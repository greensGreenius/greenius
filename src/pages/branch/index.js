import { Normalbreadcrumb, NormalModal } from 'components/common';
import { LeadFilter, LeadList, LeadForm } from 'components/pages';
import { useState } from 'react';

export const BranchPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="Lead"
        btnLabel="Add Lead"
      />
      <LeadFilter />
      <LeadList />

      <NormalModal
        toggle={handleOpenLeadModal}
        title="Add Lead"
        isShow={isOpenForm}
      >
        <LeadForm />
      </NormalModal>
    </>
  );
};
