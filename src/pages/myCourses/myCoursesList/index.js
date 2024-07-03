import { Normalbreadcrumb, NormalModal } from 'components/common';
import { MyCourseCard, RecordingClassesFrom } from 'components/pages';
import { useState } from 'react';

export const MyCourseListPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };
  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="My Course"
        btnLabel="Add Course"
        isCount={false}
      />
      <MyCourseCard />
      <NormalModal
        toggle={handleOpenLeadModal}
        title="Add Recording Class"
        isShow={isOpenForm}
      >
        <RecordingClassesFrom onSucess={handleOpenLeadModal} />
      </NormalModal>
    </>
  );
};
