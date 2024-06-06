import { NormalSearch, NormalSelect, NormalButton } from 'components/common';
import { USER_LIST } from 'services/constants';
import { useState } from 'react';

export const UserFilter = ({ onChange = () => {} }) => {
  const [filterObject, setFilterObject] = useState({
    userName: '',
    userType: ''
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
      userName: '',
      userType: ''
    };
    onChange(filterValue);
    setFilterObject(filterValue);
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <NormalSearch
          placeholder="Name"
          name="userName"
          value={filterObject.userName}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-2">
        <NormalSelect
          isLabel={false}
          option={USER_LIST}
          label="User Type"
          name="userType"
          value={filterObject.userType}
          onChange={handleInputChange}
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
