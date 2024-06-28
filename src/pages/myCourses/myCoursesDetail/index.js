import { Normalbreadcrumb, NormalModal } from 'components/common';
import {
  MyCourseVideoCard,
  MyCourseContent,
  CourseForm
} from 'components/pages';
import { useState } from 'react';

export const MyCourseDetailPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };
  return (
    <>
      <Normalbreadcrumb title="My Course" isCount={false} />
      <div className="row">
        <div className="col-md-8 mb-4">
          <MyCourseVideoCard />
        </div>
        <div className="col-md-4 mb-4">
          <MyCourseContent />
        </div>
      </div>

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
