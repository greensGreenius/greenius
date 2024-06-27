import { Normalbreadcrumb, NormalModal } from 'components/common';
import { MyCourseCard, CourseForm } from 'components/pages';
import { useState } from 'react';

export const MyCoursePage = () => {
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
        title="Add Lead"
        isShow={isOpenForm}
      >
        <CourseForm onSucess={handleOpenLeadModal} />
      </NormalModal>
    </>
  );
};
