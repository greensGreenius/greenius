import { NormalSearch, NormalSelect } from 'components/common';
import { COURSE_ENQUIRY_STATUS_LIST, LEAD_TYPE_LIST } from 'services/constants';

export const LeadFilter = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <NormalSearch placeholder="Name" />
      </div>
      <div className="col-md-2">
        <NormalSelect
          option={COURSE_ENQUIRY_STATUS_LIST}
          isLabel={false}
          label="Status"
        />
      </div>
      <div className="col-md-2">
        <NormalSelect isLabel={false} label="Branch" />
      </div>
      <div className="col-md-2">
        <NormalSelect isLabel={false} label="Admin" />
      </div>
      <div className="col-md-2">
        <NormalSelect
          option={LEAD_TYPE_LIST}
          isLabel={false}
          label="Lead Type"
        />
      </div>
    </div>
  );
};
