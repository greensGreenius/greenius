import { Normalbreadcrumb, NormalModal } from 'components/common';
import { BatchFilter, CandidateList, LeadForm } from 'components/pages';
import { useState } from 'react';

export const CandidatePage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="Candidate"
        btnLabel="Add Candidate"
      />
      <BatchFilter />

      <CandidateList />

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
