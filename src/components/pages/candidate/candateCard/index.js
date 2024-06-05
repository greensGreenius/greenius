import './candidate.scss';

export const CandidateList = () => {
  return (
    <div className="row">
      <div className="col-md-3">
        <div className="card  batch-card">
          <div className="card-body">
            <h4 className="mb-2 title-batch lh-sm flex-1 me-5">Raj Kumar</h4>
            <span className="badge badge fs-10 mb-4 badge-success">
              completed
            </span>

            <div className="row">
              <div className="col-md-12">
                <table className="table table-sm table-borderless">
                  <tbody>
                    <tr>
                      <td>Phone</td>
                      <td>856936261</td>
                    </tr>
                    <tr>
                      <td>Email</td>
                      <td>Raj@gmail.com</td>
                    </tr>
                    <tr>
                      <td>Course</td>
                      <td>Master Course</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                  17th Nov. 2020
                </span>
              </p>
              <p className="mb-0 fw-bold fs-9">
                Deadline :{' '}
                <span className="fw-semibold text-body-tertiary text-opactity-85 ms-1">
                  {' '}
                  21st May 2028
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
