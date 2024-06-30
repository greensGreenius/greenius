import { NormalSearch, NormalSelect, NormalButton } from 'components/common';
import {
  LEAD_TYPE_LIST,
  BRANCH_LIST,
  DEMO_STATUS_LIST
} from 'services/constants';
import { useState } from 'react';

export const LeadFilter = ({ onChange = () => {}, leadFromList = [] }) => {
  const [filterObject, setFilterObject] = useState({
    name: '',
    branch: '',
    leadFrom: '',
    leadType: '',
    demoStatus: ''
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
      branch: '',
      leadFrom: '',
      demoStatus: '',
      leadType: ''
    };
    onChange(filterValue);
    setFilterObject(filterValue);
  };
  return (
    <div className="row">
      <div className="col-md-3">
        <NormalSearch
          placeholder="Name"
          name="name"
          value={filterObject.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-2">
        <NormalSelect
          isLabel={false}
          label="Branch"
          name="branch"
          value={filterObject.branch}
          onChange={handleInputChange}
          option={BRANCH_LIST}
        />
      </div>
      <div className="col-md-2">
        <NormalSelect
          isLabel={false}
          label="Demo Status"
          name="demoStatus"
          value={filterObject.demoStatus}
          onChange={handleInputChange}
          option={DEMO_STATUS_LIST}
        />
      </div>
      <div className="col-md-2">
        <NormalSelect
          isLabel={false}
          label="Admin"
          option={leadFromList}
          name="leadFrom"
          value={filterObject.leadFrom}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-2">
        <NormalSelect
          option={LEAD_TYPE_LIST}
          isLabel={false}
          name="leadType"
          value={filterObject.leadType}
          onChange={handleInputChange}
          label="Lead Type"
        />
      </div>
      <div className="col-md-1">
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
