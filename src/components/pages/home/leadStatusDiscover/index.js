/* eslint-disable import/no-extraneous-dependencies */
// import './enrollmentCount.scss';
import { COURSE_ENQUIRY_STATUS } from 'services/constants';
import ReactApexChart from 'react-apexcharts';
import './leadStatusDiscover.scss';

export const LeadStatusDiscover = ({ candidateData = {} }) => {
  const donutOptions = {
    chart: {
      type: 'donut'
    },
    labels: [
      'Interested',
      'Joined',
      'Processing',
      'Requested',
      'Not Interested',
      'Not Responding'
    ],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  const handleGetCurentMonthLeadDescover = (status) => {
    const candidateList = candidateData?.overAllCandidateList;
    if (candidateList && candidateList.length > 0) {
      return candidateList.filter(
        ({ leadstatus }) => Number(leadstatus) === Number(status)
      ).length;
    }
    return 0;
  };

  return (
    <div className="card h-100">
      <div className="card-body">
        <div className="row lead-status-count-section">
          <div className="col-sm-12 col-md-12 col-xxl-12 mb-3 mb-lg-0">
            <h4>Lead Status Discover</h4>
            <p className="text-body-tertiary">
              Details across all Branch This month
            </p>
            <div className="row">
              {/* <div className="col-12"> */}
              <div className=" col-md-5">
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 fw-bold">Total Lead </p>
                  <p className="mb-0 fs-9">
                    Total count{' '}
                    <span className="fw-bold">
                      {candidateData?.overAllCandidateList?.length ?? 0}
                    </span>
                  </p>
                </div>
                <hr className="bg-body-secondary mb-2 mt-2" />
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <p className="mb-0 fw-semibold text-body lh-sm flex-1">
                    <span className="d-inline-block  bullet-item interested me-2" />{' '}
                    Interested
                  </p>
                  <h5 className="mb-0 text-body">
                    {' '}
                    {handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.INTERESTED
                    )}
                  </h5>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <p className="mb-0 fw-semibold text-body lh-sm flex-1">
                    <span className="d-inline-block  bullet-item joined me-2" />{' '}
                    Joined
                  </p>
                  <h5 className="mb-0 text-body">
                    {' '}
                    {handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.JOINED
                    )}
                  </h5>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <p className="mb-0 fw-semibold text-body lh-sm flex-1">
                    <span className="d-inline-block  bullet-item me-2 processing" />{' '}
                    Processing
                  </p>
                  <h5 className="mb-0 text-body">
                    {' '}
                    {handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.PROCESSING
                    )}
                  </h5>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-1">
                  <p className="mb-0 fw-semibold text-body lh-sm flex-1">
                    <span className="d-inline-block  bullet-item me-2 requested" />{' '}
                    Requested
                  </p>
                  <h5 className="mb-0 text-body">
                    {' '}
                    {handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.REQUESTED
                    )}
                  </h5>
                </div>

                <div className="d-flex align-items-center justify-content-between mb-1">
                  <p className="mb-0 fw-semibold text-body lh-sm flex-1">
                    <span className="d-inline-block  bullet-item me-2 not-interested" />{' '}
                    Not Interested
                  </p>
                  <h5 className="mb-0 text-body">
                    {' '}
                    {handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.NOT_INTERESTED
                    )}
                  </h5>
                </div>
                <div className="d-flex align-items-center justify-content-between mb-1">
                  <p className="mb-0 fw-semibold text-body lh-sm flex-1">
                    <span className="d-inline-block  bullet-item me-2 not-responding" />{' '}
                    Not Responding
                  </p>
                  <h5 className="mb-0 text-body">
                    {' '}
                    {handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.NOT_RESPONDING
                    )}
                  </h5>
                </div>

                {/* <button className="btn btn-outline-primary mt-5">See Details<svg className="svg-inline--fa fa-angle-right ms-2 fs-10 text-center" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="angle-right" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" data-fa-i2svg=""><path fill="currentColor" d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"></path></svg><!-- <span className="fas fa-angle-right ms-2 fs-10 text-center"></span> Font Awesome fontawesome.com --></button> */}
              </div>

              <div className=" col-md-7">
                <ReactApexChart
                  options={donutOptions}
                  series={[
                    handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.INTERESTED
                    ),
                    handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.JOINED
                    ),
                    handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.PROCESSING
                    ),
                    handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.REQUESTED
                    ),
                    handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.NOT_INTERESTED
                    ),
                    handleGetCurentMonthLeadDescover(
                      COURSE_ENQUIRY_STATUS.NOT_RESPONDING
                    )
                  ]}
                  type="donut"
                  height={400}
                />
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* <div classNameName="col-sm-5 col-md-4 col-xxl-4 my-3 my-sm-0">
                <div classNameName="position-relative d-flex flex-center mb-sm-4 mb-xl-0 echart-contact-by-source-container mt-sm-7 mt-lg-4 mt-xl-0">
                  <div classNameName="echart-contact-by-source" style="min-height: 245px; width: 100%; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); position: relative;" _echarts_instance_="ec_1719736166387"><div style="position: relative; width: 235px; height: 245px; padding: 0px; margin: 0px; border-width: 0px; cursor: default;"><canvas data-zr-dom-id="zr_0" width="235" height="245" style="position: absolute; left: 0px; top: 0px; width: 235px; height: 245px; user-select: none; -webkit-tap-highlight-color: rgba(0, 0, 0, 0); padding: 0px; margin: 0px; border-width: 0px;"></canvas></div><div classNameName="" style="position: absolute; display: block; border-style: solid; white-space: nowrap; box-shadow: rgba(0, 0, 0, 0.2) 1px 2px 10px; background-color: rgb(255, 255, 255); border-width: 0px; border-radius: 4px; color: rgb(102, 102, 102); font: 14px / 21px &quot;Microsoft YaHei&quot;; padding: 10px; top: 0px; left: 0px; transform: translate3d(-50px, 64px, 0px); border-color: rgb(56, 116, 255); z-index: 1000; pointer-events: none; visibility: hidden; opacity: 0;"><div style="margin: 0px 0 0;line-height:1;"><div style="font-size:14px;color:#666;font-weight:400;line-height:1;">Contacts by Source</div><div style="margin: 10px 0 0;line-height:1;"><div style="margin: 0px 0 0;line-height:1;"><span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:#3874ff;"></span><span style="font-size:14px;color:#666;font-weight:400;margin-left:2px">Organic Search</span><span style="float:right;margin-left:20px;font-size:14px;color:#666;font-weight:900">80</span><div style="clear:both"></div></div><div style="clear:both"></div></div><div style="clear:both"></div></div></div></div>
                  <div classNameName="position-absolute rounded-circle bg-primary-subtle top-50 start-50 translate-middle d-flex flex-center" style="height:100px; width:100px;">
                    <h3 classNameName="mb-0 text-primary-dark fw-bolder" data-label="data-label">560</h3>
                  </div>
                </div>
              </div> */}
        </div>
      </div>
    </div>
  );
};
