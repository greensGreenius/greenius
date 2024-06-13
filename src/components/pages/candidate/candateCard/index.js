/* eslint-disable consistent-return */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import './candidate.scss';
import {
  // getJoinAndLeadStatus,
  // getYesNotStatus,
  getIdByLabel,
  getLeadType,
  multySearchObjects,
  getCoursebyIdLabel,
  candidateComplitePer
} from 'services/helperFunctions';
import {
  BRANCH_LIST,
  CLASS_MODE_LIST,
  CANDIDATE_CLASS_STATUS_LIST,
  YES_NO_LIST
} from 'services/constants';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const CandidateList = ({
  candidateList = [],
  courseList = [],
  userList = [],
  batchList = [],
  filterObject = {},
  isLoading = false
}) => {
  const navigate = useNavigate();
  const handleRenderCouseView = (courses = []) => {
    const data = getCoursebyIdLabel(courseList, courses);
    const firstCourse = data[0];
    const remainingCount = courses.length - 1;

    if (!firstCourse) {
      return null; // Handle empty courses array
    }

    return (
      <>
        <span key={firstCourse.value}>{firstCourse.label}</span>
        {remainingCount > 0 && (
          <span className="ms-1 text-primary">+{remainingCount}</span>
        )}
      </>
    );
  };
  const handleCandidateRouteEdit = (id) => {
    navigate(`/candidate/${id}`);
  };

  // eslint-disable-next-line consistent-return
  const handleGetBatch = (batchId) => {
    try {
      const batch = batchList?.find(({ value }) => value === batchId);
      if (batch) {
        return batch;
      }
    } catch (e) {
      return 'some error occurred';
    }
  };

  return (
    <div className="row">
      {isLoading && candidateList.length === 0 ? (
        <h4>Loading...</h4>
      ) : (
        (candidateList.length === 0 ||
          multySearchObjects(candidateList, filterObject).length === 0) && (
          <h4>No Data Found...</h4>
        )
      )}

      {multySearchObjects(candidateList, filterObject)?.map((candidate) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          key={candidate?.id}
          className="col-md-12"
          onClick={() => handleCandidateRouteEdit(candidate?.id)}
        >
          <div className="card  batch-card mb-4">
            <div className="card-body">
              <div className="row mb-2">
                <div className="col-md-6">
                  <h4 className="title-batch mb-1 lh-sm flex-1 me-5">
                    {candidate.name}
                  </h4>
                  <small className="text-gray fw-bold">
                    {' '}
                    {getIdByLabel(batchList, candidate?.batchId)}
                  </small>
                </div>
                <div className="col-md-6">
                  <span className="badge badge fs-10 float-end mb-4 badge-success">
                    {getIdByLabel(
                      CANDIDATE_CLASS_STATUS_LIST,
                      candidate?.classStatus
                    )}
                  </span>
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td>Phone</td>
                        <td>{candidate.phone}</td>
                      </tr>
                      <tr>
                        <td>Email</td>
                        <td>{candidate.email}</td>
                      </tr>
                      <tr>
                        <td>Course</td>
                        <td>{handleRenderCouseView(candidate.courses)}</td>
                      </tr>
                      <tr>
                        <td>Branch</td>
                        <td>{getIdByLabel(BRANCH_LIST, candidate.branch)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td>Lead Type</td>
                        <td>{getLeadType(candidate?.leadType)}</td>
                      </tr>
                      <tr>
                        <td>Lead Form</td>
                        {getIdByLabel(userList, candidate?.leadFrom)}
                      </tr>
                      <tr>
                        <td>Trainer</td>
                        {getIdByLabel(
                          userList,
                          handleGetBatch(candidate.batchId)?.trainerId
                        )}
                      </tr>
                      <tr>
                        <td>Class Type</td>
                        {getIdByLabel(CLASS_MODE_LIST, candidate?.classMode)}
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="col-md-4">
                  <table className="table table-sm table-borderless">
                    <tbody>
                      <tr>
                        <td>Total Fees</td>
                        <td>{candidate?.totfees}</td>
                      </tr>
                      <tr>
                        <td>Pending Fees</td>
                        <td>{candidate?.totfees - candidate?.payedfees}</td>
                      </tr>
                      <tr>
                        <td>Job Status</td>
                        {getIdByLabel(YES_NO_LIST, candidate?.jobStatus)}
                      </tr>
                      <tr>
                        <td>Project</td>
                        <td>
                          {getIdByLabel(YES_NO_LIST, candidate?.projectStatus)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <div className="d-flex mt-4 justify-content-between text-body-tertiary fw-semibold">
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
            </div> */}
              <div className="mt-4">
                <p className="mb-0 fw-bold fs-9 mb-2">
                  Started :
                  <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                    {' '}
                    {moment(
                      handleGetBatch(candidate.batchId)?.stDate,
                      'YYYY-MM-DD'
                    ).format('DD MMM YYYY')}
                  </span>
                </p>
                <p className="mb-0 fw-bold fs-9">
                  Deadline :{' '}
                  <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                    {' '}
                    {moment(
                      handleGetBatch(candidate.batchId)?.endDate,
                      'YYYY-MM-DD'
                    ).format('DD MMM YYYY')}
                  </span>
                </p>
              </div>
            </div>
            <div className="progress bg-success-subtle">
              <div
                className="progress-bar rounded-0 bg-success"
                role="progressbar"
                aria-label="Success example"
                style={{
                  width: candidateComplitePer(batchList, candidate?.batchId)
                }}
                aria-valuenow={candidateComplitePer(
                  batchList,
                  candidate?.batchId
                )}
                title={`${candidateComplitePer(
                  batchList,
                  candidate?.batchId
                )}%`}
                aria-valuemin="0"
                aria-valuemax="100"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
