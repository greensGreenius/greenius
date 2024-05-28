import { NormalSearch, NormalSelect } from 'components/common';
import { USER_LIST } from 'services/constants';

export const UserFilter = () => {
  return (
    <div className="row">
      <div className="col-md-4">
        <NormalSearch placeholder="Name" />
      </div>
      <div className="col-md-2">
        <NormalSelect isLabel={false} option={USER_LIST} label="User Type" />
      </div>
    </div>
  );
};
