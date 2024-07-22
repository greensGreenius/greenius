import { Normalbreadcrumb, Normaltabs } from 'components/common';
import { CandidateFilter, CandidateList } from 'components/pages';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllCandidate } from 'api/lead';
import { CANDIDATE_CLASS_STATUS_LIST } from 'services/constants';
import { getAllCourse } from 'api/course';
import { getAllUser } from 'api/user';
import { getAllBatch } from 'api/batch';
// import { updateByCandidateLead } from 'api/lead';
import { multySearchObjects } from 'services/helperFunctions';

export const CandidatePage = () => {
  const [activeTabe, setActiveTabe] = useState('');
  const navigate = useNavigate();
  const [candidateList, setCandidateList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [batchList, setBatchList] = useState([]);
  const [filterObject, setFilterObject] = useState({});

  const tabData = [
    {
      label: 'All',
      value: -1
    },
    ...CANDIDATE_CLASS_STATUS_LIST
  ];
  const handleOpenLeadModal = () => {
    navigate('/candidate/new');
  };

  const handleGetCandidateList = async (classStatus = -1) => {
    try {
      setCandidateList([]);
      setLoading(true);
      const leadResList = await getAllCandidate(classStatus);

      // console.log('candidateBatch----------', candidateBatch);
      // candidateBatch

      setCandidateList(leadResList);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleChangeTab = (value) => {
    console.log('value-------', value);
    handleGetCandidateList(value);
    setActiveTabe(value);
  };

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
        title="Candidate"
        btnLabel="Add Candidate"
        count={multySearchObjects(candidateList, filterObject).length}
      />
      <div className="row">
        <div className="col-12">
          <Normaltabs data={tabData} onChange={handleChangeTab} />
        </div>
      </div>
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
        leadstatus={activeTabe}
        batchList={batchList}
      />
    </>
  );
};
