import { Normalbreadcrumb } from 'components/common';
import { CandidateForm } from 'components/pages';
import { useEffect, useState } from 'react';
import { getAllCourse } from 'api/course';
import { getAllUser } from 'api/user';
import { getAllBatch } from 'api/batch';

export const CandidateFormPage = () => {
  const [courseList, setCourseList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [batchList, setBatchList] = useState([]);

  const handleGetCourseList = async () => {
    try {
      const courseResList = await getAllCourse();
      const list = courseResList.map(({ name, id }) => ({
        value: id,
        label: name
      }));
      setCourseList(list);
      console.log('userResList--------->', list);
    } catch (e) {
      console.log('e--------->', e);
    }
  };
  const handleGetUserList = async () => {
    try {
      const userResList = await getAllUser();
      const list = userResList.map(({ fname, lname, id, userType }) => ({
        value: id,
        label: `${fname} ${lname}`,
        userType
      }));
      setUserList(list);
      console.log('userResList--------->', userResList);
    } catch (e) {
      console.log('e--------->', e);
    }
  };

  const handleGetBatchList = async () => {
    try {
      const batchResList = await getAllBatch();
      const list = batchResList.map(({ name, id, trainerId }) => ({
        value: id,
        label: name,
        trainerId
      }));
      setBatchList(list);
    } catch (e) {
      console.log('e--------->', e);
    }
  };

  useEffect(() => {
    handleGetCourseList();
    handleGetUserList();
    handleGetBatchList();
  }, []);

  return (
    <>
      <Normalbreadcrumb title="New Candidate" />

      <CandidateForm
        courseList={courseList}
        batchList={batchList}
        userList={userList}
      />
    </>
  );
};
