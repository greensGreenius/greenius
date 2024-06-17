import { Normalbreadcrumb, NormalModal } from 'components/common';
import { BatchFilter, BatchList, BatchForm } from 'components/pages';
import { useState, useEffect } from 'react';
import { STATUS } from 'services/constants';
import { multySearchObjects } from 'services/helperFunctions';
import { getAllUser } from 'api/user';
import { getAllBatch } from 'api/batch';

export const BatchPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [userList, setUserList] = useState([]);
  const [allBatchList, setAllBatchList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [editBatchObject, setEditBatchObject] = useState({});
  const [filterObject, setFilterObject] = useState({});

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
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
      setAllBatchList([]);
      setLoading(true);
      const batchResList = await getAllBatch();
      setAllBatchList(batchResList);
      console.log('userResList--------->', batchResList);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetUserList();
    handleGetBatchList();
  }, []);

  const handleBatchEdit = (data) => {
    try {
      const trainer = data.trainerIds.find(
        ({ status }) => status === STATUS.ACTIVE
      );
      const batchObj = {
        ...data,
        trainerId: trainer?.trainerId
      };
      setEditBatchObject(batchObj);

      setIsOpenForm(true);
    } catch (e) {
      console.error(e);
    }
  };
  const handleChangeFilter = (filterObj) => {
    setFilterObject(filterObj);
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="Batch"
        btnLabel="Add Batch"
        count={multySearchObjects(allBatchList, filterObject).length}
      />
      <BatchFilter userList={userList} onChange={handleChangeFilter} />

      <BatchList
        isLoading={isLoading}
        userList={userList}
        allBatchList={allBatchList}
        onEdit={handleBatchEdit}
        filterObject={filterObject}
      />

      <NormalModal
        toggle={handleOpenLeadModal}
        title={`${editBatchObject?.id ? 'Update' : 'Add'} Batch`}
        isShow={isOpenForm}
      >
        <BatchForm
          editBatchObject={editBatchObject}
          userList={userList}
          onSucess={handleOpenLeadModal}
        />
      </NormalModal>
    </>
  );
};
