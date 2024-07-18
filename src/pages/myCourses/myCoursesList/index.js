import { Normalbreadcrumb, NormalModal } from 'components/common';
import { MyCourseCard, RecordingClassesFrom } from 'components/pages';
import { useEffect, useState } from 'react';
import { getRecordingByBatchId } from 'api/recordingClass';
import { useParams } from 'react-router-dom';
import { getStorage } from 'services/helperFunctions';
import { EXIST_LOCAL_STORAGE, USER_TYPE } from 'services/constants';

export const MyCourseListPage = () => {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const { batchId } = useParams();
  const [recordingClass, setRecordingClass] = useState([]);

  const handeGetRecordingByBatchId = async () => {
    try {
      let curentUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
      curentUser = JSON.parse(curentUser);
      if (curentUser && curentUser.userType === USER_TYPE.CANDIDATE) {
        curentUser.batchIds.map(async (data) => {
          const resBody = await getRecordingByBatchId(data?.batchId);
          setRecordingClass([...recordingClass, ...resBody]);
        });
      } else if (batchId) {
        const resBody = await getRecordingByBatchId(batchId);
        setRecordingClass(resBody);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handeGetRecordingByBatchId();
  }, []);

  const handleOpenLeadModal = () => {
    setIsOpenForm(!isOpenForm);
  };

  const handleGetLoginUserDetail = () => {
    let userData = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
    if (userData) {
      userData = JSON.parse(userData);
      return userData;
    }
    return null;
  };

  return (
    <>
      <Normalbreadcrumb
        onBtnClick={handleOpenLeadModal}
        title="My Course"
        btnLabel={
          ![USER_TYPE.CANDIDATE].includes(
            handleGetLoginUserDetail()?.userType
          ) && 'Add Course'
        }
        isCount={false}
      />
      <MyCourseCard recordingClass={recordingClass} />
      <NormalModal
        toggle={handleOpenLeadModal}
        title="Add Recording Class"
        isShow={isOpenForm}
      >
        <RecordingClassesFrom onSucess={handleOpenLeadModal} />
      </NormalModal>
    </>
  );
};
