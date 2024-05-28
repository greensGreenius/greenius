import { Normalbreadcrumb, NormalModal } from 'components/common';
import { LeadFilter, LeadList, LeadForm } from 'components/pages';
import { useState, useEffect } from 'react';
import { getAllUser } from 'api/user';
import { getAllCourse } from 'api/course';

export const LeadPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [leadFromList, setLeadFromList] = useState([]);
  const [courseList, setCourseList] = useState([]);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };

  const handleGetUserList = async () => {
    try {
      const userResList = await getAllUser();
      const list = userResList.map(({ fname, lname, id }) => ({
        value: id,
        label: `${fname} ${lname}`
      }));
      setLeadFromList(list);
      console.log('userResList--------->', userResList);
    } catch (e) {
      console.log('e--------->', e);
    }
  };

  useEffect(() => {
    handleGetUserList();
  }, []);

  const handleGetCourseList = async () => {
    const courseResList = await getAllCourse();
    const list = courseResList.map(({ name, id }) => ({
      value: id,
      label: name
    }));
    setCourseList(list);
    console.log('userResList--------->', list);
  };
  useEffect(() => {
    handleGetCourseList();
  }, []);

  const handleSaveLeade = () => {
    setIsOpenForm(false);
    handleGetUserList();
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
        <LeadForm
          leadFromList={leadFromList}
          courseList={courseList}
          onSucess={handleSaveLeade}
        />
      </NormalModal>
    </>
  );
};
