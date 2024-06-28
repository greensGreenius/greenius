import { NormalSearch, NormalSelect, NormalButton } from 'components/common';
import { WEEK_LIST, USER_TYPE } from 'services/constants';
import {
  userGetByRole,
  getCurentUserTrainerId
} from 'services/helperFunctions';
import { useState } from 'react';

export const BatchFilter = ({ onChange = () => {}, userList = [] }) => {
  const [filterObject, setFilterObject] = useState({
    name: '',
    classDays: '',
    trainerId: getCurentUserTrainerId()
  });

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name }
    } = event;

    const filterValue = {
      ...filterObject,
      [name]: type === 'checkbox' ? checked : value
    };

    setFilterObject(filterValue);

    onChange(filterValue);
  };
  const handleClearFilter = () => {
    const filterValue = {
      name: '',
      classDays: '',
      trainerId: ''
    };
    onChange(filterValue);
    setFilterObject(filterValue);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <NormalSearch
          placeholder="Batch"
          name="name"
          value={filterObject.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-3">
        <NormalSelect
          option={WEEK_LIST}
          name="classDays"
          value={filterObject.classDays}
          onChange={handleInputChange}
          isLabel={false}
          label="Day"
        />
      </div>
      <div className="col-md-3">
        <NormalSelect
          option={userGetByRole(userList, USER_TYPE.TRAINER)}
          isLabel={false}
          name="trainerId"
          value={filterObject.trainerId}
          onChange={handleInputChange}
          label="Trainer"
        />
      </div>
      <div className="col-md-2">
        {/* <NormalButton label="Search" /> */}
        <NormalButton
          className=" ms-3 btn btn-secondary"
          onClick={handleClearFilter}
          label="Clear"
        />
      </div>
    </div>
  );
};
