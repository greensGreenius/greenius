import { NormalSearch, NormalSelect } from 'components/common';
import { LEAD_TYPE_LIST } from 'services/constants';

export const BatchFilter = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <NormalSearch placeholder="Batch" />
      </div>
      <div className="col-md-3">
        <NormalSelect isLabel={false} label="Day" />
      </div>
      <div className="col-md-3">
        <NormalSelect option={LEAD_TYPE_LIST} isLabel={false} label="Trainer" />
      </div>
    </div>
  );
};
