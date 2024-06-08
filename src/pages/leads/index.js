import { Normalbreadcrumb, NormalModal, Normaltabs } from 'components/common';
import { LeadFilter, LeadList, LeadForm } from 'components/pages';
import { useState, useEffect } from 'react';
import { getAllUser } from 'api/user';
import { getAllCourse } from 'api/course';

export const LeadPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [editLeadObject, setEditLeadObject] = useState(null);
  const [leadFromList, setLeadFromList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [activeTabe, setActiveTabe] = useState('');
  const [filterObject, setFilterObject] = useState({});
  const tabData = [
    'All',
    'Requested',
    'Processing',
    'Interested',
    'Not Interested',
    'Not Responding',
    'Joined'
  ];

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
    setEditLeadObject(null);
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
  };

  const handleChangeFilter = (filterObj) => {
    setFilterObject(filterObj);
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
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
