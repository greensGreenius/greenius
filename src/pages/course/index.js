import { Normalbreadcrumb, NormalModal } from 'components/common';
import { CourseList, CourseForm } from 'components/pages';
import { useState } from 'react';

export const CoursePage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };
  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="Course"
        btnLabel="Add Course"
        isCount={false}
      />
      <CourseList />
      <NormalModal
        toggle={handleOpenLeadModal}
        title="Add Lead"
        isShow={isOpenForm}
      >
        <CourseForm onSucess={handleOpenLeadModal} />
      </NormalModal>
    </>
  );
};
