import moment from 'moment';
import {
  getIdByLabel,
  getBatchStatus,
  multySearchObjects
} from 'services/helperFunctions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import './batch.scss';

export const BatchList = ({
  allBatchList = [],
  isLoading = false,
  userList = [],
  onEdit = () => {},
  filterObject = ''
}) => {
  return (
    <div className="row">
      {isLoading && allBatchList.length === 0 ? (
        <h4>Loading...</h4>
      ) : (
        multySearchObjects(allBatchList, filterObject).length === 0 && (
          <h4>No Data Found...</h4>
        )
      )}
      {multySearchObjects(allBatchList, filterObject).map((batch) => (
        <div className="col-md-3">
          <div className="card  batch-card">
            <div className="card-body">
              <h4 className="mb-2 title-batch lh-sm flex-1 me-5">
                {batch.name}

                <IconButton color="success" onClick={() => onEdit(batch)}>
                  <EditIcon />
                </IconButton>
              </h4>
              <span className="badge badge fs-10 mb-4 badge-success">
                {getBatchStatus(batch?.status)}
              </span>
              <div className="d-flex align-items-center mb-2">
                <p className="fw-bold mb-0  text-truncate lh-1">
                  <span className="text-batch-qu"> Trainer :</span>{' '}
                  <span className="fw-semibold text-primary ms-1">
                    {getIdByLabel(userList, batch?.trainerId)}
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <p className="fw-bold mb-0  text-truncate lh-1">
                  <span className="text-batch-qu"> Time :</span>{' '}
                  <span className="fw-semibold  ms-1">
                    {' '}
                    {moment(batch?.batSTime, 'h:mm').format(
                      'h:mm:ss A'
                    )} To {moment(batch?.batETime, 'h:mm').format('h:mm:ss A')}
                  </span>
                </p>
              </div>
              <div className="d-flex align-items-center mb-2">
                <p className="fw-bold mb-0  text-truncate lh-1">
                  <span className="text-batch-qu"> Total candidates :</span>{' '}
                  <span className="fw-semibold  ms-1">
                    {batch?.countCandidate}
                  </span>
                </p>
              </div>
              <div className="d-flex mt-4 justify-content-between text-body-tertiary fw-semibold">
                <p className="mb-2"> Progress</p>
                <p className="mb-2 text-body-emphasis">100%</p>
              </div>

              <div className="progress bg-success-subtle">
                <div
                  className="progress-bar rounded bg-success"
                  role="progressbar"
                  aria-label="Success example"
                  style={{ width: '100%' }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div>
              <div className="mt-4">
                <p className="mb-0 fw-bold fs-9 mb-2">
                  Started :
                  <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                    {' '}
                    {moment(batch.stDate).format('DD MMM YYYY')}
                  </span>
                </p>
                <p className="mb-0 fw-bold fs-9">
                  Deadline :{' '}
                  <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                    {moment(batch.endDate).format('DD MMM YYYY')}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
