import { Normalbreadcrumb } from 'components/common';
import { CandidateFilter, CandidateList } from 'components/pages';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getBatchIdByCandate } from 'api/lead';
import { getAllCourse } from 'api/course';
import { getAllUser } from 'api/user';
import { getAllBatch } from 'api/batch';
import { multySearchObjects } from 'services/helperFunctions';

export const BatchDetailPage = () => {
  const { batchId } = useParams();
  const navigate = useNavigate();
  const [candidateList, setCandidateList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [filterObject, setFilterObject] = useState({});

  const handleOpenLeadModal = () => {
    navigate('/myCourse');
  };

  const handleGetCandidateList = async () => {
    try {
      setCandidateList([]);
      setLoading(true);
      const leadResList = await getBatchIdByCandate(batchId);
      setCandidateList(leadResList);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleGetCourseList = async () => {
    try {
      const courseResList = await getAllCourse();
      const list = courseResList.map(({ name, id }) => ({
        value: id,
        label: name
      }));
      setCourseList(list);
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
    } catch (e) {
      console.log('e--------->', e);
    }
  };

  const handleGetBatchList = async () => {
    try {
      const batchResList = await getAllBatch();
      const list = batchResList.map(
        ({ name, id, trainerId, stDate, endDate }) => ({
          value: id,
          label: name,
          trainerId,
          stDate,
          endDate
        })
      );
      setBatchList(list);
    } catch (e) {
      console.log('e--------->', e);
    }
  };

  useEffect(() => {
    handleGetCandidateList();
    handleGetCourseList();
    handleGetUserList();
    handleGetBatchList();
  }, []);

  const handleChangeFilter = (filterObj) => {
    setFilterObject(filterObj);
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="Batch Details"
        btnLabel="Add Record Class"
        count={multySearchObjects(candidateList, filterObject).length}
      />

      <CandidateFilter
        batchList={batchList}
        userList={userList}
        filterObject={filterObject}
        onChange={handleChangeFilter}
      />

      <CandidateList
        filterObject={filterObject}
        candidateList={candidateList}
        isLoading={isLoading}
        courseList={courseList}
        userList={userList}
        // leadstatus={activeTabe}
        batchList={batchList}
      />
    </>
  );
};
