import { NormalSearch, NormalSelect, NormalButton } from 'components/common';
import { CLASS_MODE_LIST } from 'services/constants';
import { useState } from 'react';

export const CandidateFilter = ({ onChange = () => {}, batchList = [] }) => {
  const [filterObject, setFilterObject] = useState({
    name: '',
    branch: '',
    batchId: '',
    classMode: ''
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
      batchId: '',
      classMode: ''
    };
    onChange(filterValue);
    setFilterObject(filterValue);
  };
  return (
    <div className="row">
      <div className="col-md-4">
        <NormalSearch
          placeholder="Name"
          name="name"
          value={filterObject.name}
          onChange={handleInputChange}
        />
      </div>
      {/* <div className="col-md-2">
        <NormalSelect
          isLabel={false}
          label="Branch"
          name="branch"
          value={filterObject.branch}
          onChange={handleInputChange}
          option={BRANCH_LIST}
        />
      </div> */}
      <div className="col-md-2">
        <NormalSelect
          isLabel={false}
          label="Batch"
          option={batchList}
          name="batchId"
          value={filterObject.batchId}
          onChange={handleInputChange}
        />
      </div>
      <div className="col-md-2">
        <NormalSelect
          option={CLASS_MODE_LIST}
          isLabel={false}
          name="classMode"
          value={filterObject.classMode}
          onChange={handleInputChange}
          label="Class Mode"
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
