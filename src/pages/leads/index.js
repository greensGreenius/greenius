import { Normalbreadcrumb, NormalModal, Normaltabs } from 'components/common';
import { LeadFilter, LeadList, LeadForm } from 'components/pages';
import { useState, useEffect } from 'react';
import { getAllUser } from 'api/user';
import { getAllCourse } from 'api/course';
import { COURSE_ENQUIRY_STATUS_LIST } from 'services/constants';
import { multySearchObjects } from 'services/helperFunctions';
import { getAllLead } from 'api/lead';

export const LeadPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [editLeadObject, setEditLeadObject] = useState(null);
  const [leadFromList, setLeadFromList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [activeTabe, setActiveTabe] = useState(-1);
  const [filterObject, setFilterObject] = useState({});
  const [leadList, setLeadList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const tabData = [
    {
      label: 'All',
      value: -1
    },
    ...COURSE_ENQUIRY_STATUS_LIST
  ];

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
    setEditLeadObject(null);
  };

  const handleGetLeadList = async (value = -1) => {
    try {
      setLeadList([]);
      setLoading(true);
      const leadResList = await getAllLead(value);
      console.log('leadResList---', leadResList);
      setLeadList(leadResList);
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
      setLeadFromList(list);
      console.log('userResList--------->', userResList);
    } catch (e) {
      console.log('e--------->', e);
    }
  };

  useEffect(() => {
    handleGetUserList();
    handleGetLeadList();
  }, []);

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
  useEffect(() => {
    handleGetCourseList();
  }, []);

  const handleSaveLeade = () => {
    setIsOpenForm(false);
    handleGetUserList();
  };

  const handleLeadEdit = (data) => {
    setEditLeadObject(data);
    setIsOpenForm(true);
  };

  const handleChangeTab = (value) => {
    console.log('value--------', value);
    setActiveTabe(value);
    handleGetLeadList(value);
  };

  const handleChangeFilter = (filterObj) => {
    setFilterObject(filterObj);
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        count={multySearchObjects(leadList, filterObject)?.length}
        title="Lead"
        btnLabel="Add Lead"
      />
      <div className="row">
        <div className="col-12">
          <Normaltabs data={tabData} onChange={handleChangeTab} />
        </div>
      </div>
      <LeadFilter leadFromList={leadFromList} onChange={handleChangeFilter} />
      <LeadList
        leadstatus={activeTabe}
        courseList={courseList}
        leadFromList={leadFromList}
        onEdit={handleLeadEdit}
        filterObject={filterObject}
        leadList={leadList}
        isLoading={isLoading}
      />

      <NormalModal
        toggle={handleOpenLeadModal}
        title="Add Lead"
        isShow={isOpenForm}
      >
        <LeadForm
          leadFromList={leadFromList}
          courseList={courseList}
          onSucess={handleSaveLeade}
          editLeadObject={editLeadObject}
        />
      </NormalModal>
    </>
  );
};
