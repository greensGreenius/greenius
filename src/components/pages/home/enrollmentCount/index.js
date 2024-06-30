import './enrollmentCount.scss';

export const EnrollmentCount = ({ candidateData = {} }) => {
  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="row enroll-count-section">
          <div className="col-sm-12 col-md-12 col-xxl-12 mb-3 mb-lg-0">
            <h4>Enrolment Count</h4>
            <p className="text-body-tertiary">Details across all Branch</p>
            <div className="row g-0">
              <div className="col-6 col-xl-4">
                <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1 border-bottom border-end border-translucent">
                  <div className="d-flex align-items-center mb-1">
                    <span className="square fs-11 me-2 bg-primary" />{' '}
                    <span className="mb-0 fs-9 text-body">Today Enrolment</span>
                  </div>
                  <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3 text-primary">
                    {candidateData?.enrollCounts?.todayCount ?? 0}
                  </h3>
                </div>
              </div>

              <div className="col-6 col-xl-4">
                <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1 border-bottom border-end border-translucent">
                  <div className="d-flex align-items-center mb-1">
                    <span className="square fs-11 me-2 bg-info" />{' '}
                    <span className="mb-0 fs-9 text-body">
                      This Weekely Enroll
                    </span>
                  </div>
                  <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3 text-info">
                    {candidateData?.enrollCounts?.weekCount ?? 0}
                  </h3>
                </div>
              </div>

              <div className="col-6 col-xl-4">
                <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1 border-bottom border-translucent">
                  <div className="d-flex align-items-center mb-1">
                    <span className="square fs-11 me-2 bg-warning" />{' '}
                    <span className="mb-0 fs-9 text-body">
                      This Month Enroll
                    </span>
                  </div>
                  <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3  text-warning">
                    {candidateData?.enrollCounts?.monthSummary ?? 0}
                  </h3>
                </div>
              </div>

              <div className="col-6 col-xl-4">
                <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1 border-end border-translucent">
                  <div className="d-flex align-items-center mb-1">
                    <span className="square fs-11 me-2 bg-success" />{' '}
                    <span className="mb-0 fs-9 text-body">
                      Last Three Months Enroll
                    </span>
                  </div>
                  <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3 text-success">
                    {candidateData?.enrollCounts?.lastThreeMonthSummary ?? 0}
                  </h3>
                </div>
              </div>

              <div className="col-6 col-xl-4">
                <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1  border-end border-translucent">
                  <div className="d-flex align-items-center mb-1">
                    <span className="square fs-11 me-2 bg-secondary" />{' '}
                    <span className="mb-0 fs-9 text-body">OverAll Enroll</span>
                  </div>
                  <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3 text-secondary">
                    {candidateData?.enrollCounts?.totalEnrollCount ?? 0}
                  </h3>
                </div>
              </div>
              <div className="col-6 col-xl-4">
                <div className="d-flex flex-column flex-center align-items-sm-start flex-md-row justify-content-md-between flex-xxl-column p-3 ps-sm-3 ps-md-4 p-md-3 h-100 border-1  border-translucent">
                  <div className="d-flex align-items-center mb-1">
                    <span className="square fs-11 me-2 bg-danger" />{' '}
                    <span className="mb-0 fs-9 text-body">Pending Lead</span>
                  </div>
                  <h3 className="fw-semibold ms-xl-3 ms-xxl-0 pe-md-2 pe-xxl-0 mb-0 mb-sm-3 text-danger">
                    {candidateData?.enrollCounts?.pendingLeadCount ?? 0}
                  </h3>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="col-sm-5 col-md-4 col-xxl-4 my-3 my-sm-0">
                <div className="position-relative d-flex flex-center mb-sm-4 mb-xl-0 echart-contact-by-source-container mt-sm-7 mt-lg-4 mt-xl-0">
                  <div className="echart-contact-by-source" style="min-height: 245px; width: 100%; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); position: relative;" _echarts_instance_="ec_1719736166387"><div style="position: relative; width: 235px; height: 245px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas data-zr-dom-id="zr_0" width="235" height="245" style="position: absolute; left: 0px; top: 0px; width: 235px; height: 245px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div className="" style="position: absolute; display: block; border-style: solid; white-space: nowrap; box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; background-color: rgb(255, 255, 255); border-width: 0px; border-radius: 4px; color: rgb(102, 102, 102); font: 14px / 21px &quot;Microsoft YaHei&quot;; padding: 10px; top: 0px; left: 0px; transform: translate3d(-50px, 64px, 0px); border-color: rgb(56, 116, 255); z-index: 1000; pointer-events: none; visibility: hidden; opacity: 0;"><div style="margin: 0px 0 0;line-height:1;"><div style="font-size:14px;color:#666;font-weight:400;line-height:1;">Contacts by Source</div><div style="margin: 10px 0 0;line-height:1;"><div style="margin: 0px 0 0;line-height:1;"><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#3874ff;"></span><span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">Organic Search</span><span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">80</span><div style="clear:both"></div></div><div style="clear:both"></div></div><div style="clear:both"></div></div></div></div>
                  <div className="position-absolute rounded-circle bg-primary-subtle top-50 start-50 translate-middle d-flex flex-center" style="height:100px; width:100px;">
                    <h3 className="mb-0 text-primary-dark fw-bolder" data-label="data-label">560</h3>
                  </div>
                </div>
              </div> */}
        </div>
      </div>
    </div>
  );
};
