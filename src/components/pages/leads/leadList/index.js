/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-danger */
/* eslint-disable no-undef */
// import { NormalTable } from 'components/common';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { getAllLead } from 'api/lead';
import { BRANCH_LIST, COURSE_ENQUIRY_STATUS } from 'services/constants';
import {
  getJoinAndLeadStatus,
  getYesNotStatus,
  getIdByLabel,
  getLeadType,
  multySearchObjects,
  getCoursebyIdLabel
} from 'services/helperFunctions';
import moment from 'moment';
import './leadList.scss';

export const LeadList = ({
  onEdit = () => {},
  leadFromList = [],
  leadstatus = null,
  filterObject = '',
  courseList = []
}) => {
  const [leadList, setLeadList] = useState([]);
  const [isLoading, setLoading] = useState(false);
  // const candidateHeader = [
  //   {
  //     lable: 'S.no'
  //   },
  //   {
  //     lable: 'Name'
  //   },
  //   {
  //     lable: 'Phone'
  //   },
  //   {
  //     lable: 'Email'
  //   },

  //   {
  //     lable: 'Status'
  //   },
  //   {
  //     lable: 'Comment'
  //   },
  //   {
  //     lable: 'Next Follow up'
  //   },
  //   {
  //     lable: 'Action'
  //   }
  // ];

  const handleGetCourseList = async () => {
    try {
      setLeadList([]);
      setLoading(true);
      const leadResList = await getAllLead(leadstatus);
      console.log('leadResList---', leadResList);
      setLeadList(leadResList);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleGetCourseList();
  }, [leadstatus]);

  const handleRenderCouseView = (courses = []) => {
    const data = getCoursebyIdLabel(courseList, courses);
    const firstCourse = data[0];
    const remainingCount = courses.length - 1;
    console.log(!firstCourse, '-------', data);

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
  return (
    <div className="row mt-2">
      {isLoading && leadList.length === 0 ? (
        <h4>Loading...</h4>
      ) : (
        (leadList.length === 0 ||
          multySearchObjects(leadList, filterObject).length === 0) && (
          <h4>No Data Found...</h4>
        )
      )}
      {!isLoading &&
        multySearchObjects(leadList, filterObject).map((lead) => (
          <div className="col-12 ">
            <div
              className={`card lead-card  ${
                moment(lead.nextFollUp).isSameOrBefore(new Date()) &&
                COURSE_ENQUIRY_STATUS.JOINED !== lead.leadstatus &&
                COURSE_ENQUIRY_STATUS.NOT_INTERESTED !== lead.leadstatus &&
                'follow-near'
              }`}
            >
              <div className="card-body">
                <div className="row">
                  <div className="col-12">
                    <span className="badge float-end rounded-pill text-bg-primary">
                      {getJoinAndLeadStatus(lead?.leadstatus)}
                    </span>
                    <h4>
                      {lead?.name}{' '}
                      <IconButton color="success" onClick={() => onEdit(lead)}>
                        <EditIcon />
                      </IconButton>
                      {/* <IconButton color="success">
                      <EditIcon />
                    </IconButton> */}
                    </h4>
                    {/* <span>{lead?.branch}</span> */}
                  </div>
                  <div className="col-12">
                    <div className="row">
                      <div className="col-md-4">
                        <table className="table table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>Phone</td>
                              <td>{lead?.phone}</td>
                            </tr>
                            <tr>
                              <td>Email</td>
                              <td>{lead?.email}</td>
                            </tr>
                            <tr>
                              <td>Course</td>
                              <td>{handleRenderCouseView(lead.courses)}</td>
                            </tr>
                            <tr>
                              <td>Enquiry Date</td>
                              <td>
                                {moment(lead.enqDate).format('DD MMM YYYY')}
                              </td>
                            </tr>
                            <tr>
                              <td>Branch</td>
                              <td>{getIdByLabel(BRANCH_LIST, lead.branch)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md-4">
                        <table className="table table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>Lead Type</td>
                              <td>{getLeadType(lead?.leadType)}</td>
                            </tr>
                            <tr>
                              <td>Lead Form</td>
                              <td>
                                {getIdByLabel(leadFromList, lead?.leadFrom)}
                              </td>
                            </tr>
                            <tr>
                              <td>Demo Taken</td>
                              <td>
                                {getIdByLabel(leadFromList, lead?.demoBy)}
                              </td>
                            </tr>
                            <tr>
                              <td>Demo Status</td>
                              <td>{getYesNotStatus(lead?.demoStatus)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md-4">
                        <table className="table table-sm table-borderless">
                          <tbody>
                            <tr>
                              <td>Total Fees</td>
                              <td>{lead?.totfees}</td>
                            </tr>
                            <tr>
                              <td>Next Follow up</td>
                              <td>
                                {moment(lead.nextFollUp).format('DD MMM YYYY')}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div className="col-md-12">
                        <span className="text-gray">Comment</span>
                        {lead.comments.map(({ notes }) => (
                          <span
                            className="notes"
                            dangerouslySetInnerHTML={{ __html: notes }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
