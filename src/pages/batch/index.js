import { Normalbreadcrumb, NormalModal } from 'components/common';
import { BatchFilter, BatchList, LeadForm } from 'components/pages';
import { useState } from 'react';

export const BatchPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="Batch"
        btnLabel="Add Batch"
      />
      <BatchFilter />

      <BatchList />

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
