import { NormalInput, NormalSelect, NormalButton } from 'components/common';
import { useState, useRef, useEffect } from 'react';

import {
  //   COURSE_ENQUIRY_STATUS_LIST,
  LEAD_TYPE_LIST,
  YES_NO_LIST,
  BRANCH_LIST,
  LEAD_TYPE,
  YES_NO_STATUS,
  STATUS,
  CLASS_MODE_LIST,
  CANDIDATE_CLASS_STATUS_LIST,
  DEMO_STATUS_LIST,
  COURSE_ENQUIRY_STATUS
} from 'services/constants';
import SimpleReactValidator from 'simple-react-validator';
import { candidateSchemaModule } from 'services/module';
import { userGetByRole } from 'services/helperFunctions';
import { getCandidateById, updateLead, createLead } from 'api/lead';
import { useParams, useNavigate } from 'react-router-dom';
import { Toast } from 'services/toast';

export const CandidateForm = ({
  // onSucess = () => {},
  userList = [],
  courseList = [],
  editLeadObject = null,
  batchList = []
}) => {
  const navigate = useNavigate();
  const { candidateId } = useParams();
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: 'error-message' })
  );
  const [candidateFormObject, setCandidateFormObject] = useState({
    batchIds: [],
    ...candidateSchemaModule,
    ...editLeadObject,
    leadstatus: COURSE_ENQUIRY_STATUS.JOINED
  });
  console.log('candidateFormObject-----', candidateFormObject);
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [, forceUpdate] = useState();

  const handleGetCandidateById = async () => {
    try {
      if (!candidateId) {
        setIsLoadingFrom(false);
        Toast({ message: 'Sorry Candidate Id is missing', type: 'error' });
        return;
      }
      if (candidateId === 'new') {
        setIsLoadingFrom(false);
        return;
      }
      setIsLoadingFrom(true);
      const candRes = await getCandidateById(candidateId);
      setIsLoadingFrom(false);
      setCandidateFormObject(candRes);
      console.log('userResList--------->', candRes);
    } catch (e) {
      setIsLoadingFrom(false);
      console.log('e--------->', e);
    }
  };
  useEffect(() => {
    handleGetCandidateById();
  }, []);

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name }
    } = event;

    setCandidateFormObject({
      ...candidateFormObject,
      [name]: type === 'checkbox' ? checked : value
    });
    simpleValidator.current.purgeFields();
  };

  const handleGetPendingFees = (totfees = 0, payedfe = 0) => {
    return totfees - payedfe;
  };

  const handleleadSubmit = async () => {
    try {
      const body = {
        ...candidateFormObject
      };
      if (!Array.isArray(candidateFormObject?.batchIds)) {
        candidateFormObject.batchIds = [];
      }
      const batchIds = candidateFormObject.batchIds?.map((trainer) => ({
        ...trainer,
        status: STATUS.DE_ACTIVE,
        eDate: new Date()
      }));
      // console.log('body.batchIds-----', candidateFormObject);
      body.batchIds = [
        ...batchIds,
        {
          batchId: candidateFormObject.batchId,
          sDate: new Date(),
          status: STATUS.ACTIVE
        }
      ];
      // delete body.batchId;

      const formValid = simpleValidator.current.allValid();

      if (formValid) {
        setIsLoadingFrom(true);
        console.log('body.batchIds-----', candidateFormObject);
        const res =
          candidateId === 'new'
            ? await createLead(body)
            : await updateLead(body, candidateId);
        console.log('res-----', res);
        navigate('/candidate');
      } else {
        console.log('---NOt valid');
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {
      console.log('---NOt valid', e);
      setIsLoadingFrom(false);
    }
  };

  return (
    <div className="row">
      {!isLoadingFrom ? (
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <h5>Basic Info</h5>
                </div>
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-3">
                      <NormalInput
                        label="Enter Name"
                        onChange={handleInputChange}
                        value={candidateFormObject.name}
                        name="name"
                        errorMessage={simpleValidator.current.message(
                          'Name',
                          candidateFormObject.name,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalInput
                        label="Enter Phone"
                        onChange={handleInputChange}
                        name="phone"
                        value={candidateFormObject.phone}
                        errorMessage={simpleValidator.current.message(
                          'Phone',
                          candidateFormObject.phone,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalInput
                        label="Enter Email"
                        onChange={handleInputChange}
                        name="email"
                        value={candidateFormObject.email}
                        errorMessage={simpleValidator.current.message(
                          'Email',
                          candidateFormObject.email,
                          'required|email'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalInput
                        label="Enter Enquiry Date"
                        type="date"
                        onChange={handleInputChange}
                        name="enqDate"
                        value={candidateFormObject.enqDate}
                        errorMessage={simpleValidator.current.message(
                          'Enquiry Date',
                          candidateFormObject.enqDate,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalSelect
                        multiple
                        label="Course"
                        name="courses"
                        option={courseList}
                        onChange={handleInputChange}
                        value={candidateFormObject.courses}
                        errorMessage={simpleValidator.current.message(
                          'Course',
                          candidateFormObject.courses,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalSelect
                        label="Lead Type"
                        name="leadType"
                        option={LEAD_TYPE_LIST}
                        onChange={handleInputChange}
                        value={candidateFormObject.leadType}
                        errorMessage={simpleValidator.current.message(
                          'Lead Type',
                          candidateFormObject.leadType,
                          'required'
                        )}
                      />
                    </div>
                    {candidateFormObject.leadType !== LEAD_TYPE.INSTAGRAM &&
                      candidateFormObject.leadType !== LEAD_TYPE.BRANCH && (
                        <div className="col-md-3">
                          <NormalSelect
                            label="Lead Form"
                            name="leadFrom"
                            option={userGetByRole(
                              userList,
                              candidateFormObject.leadType
                            )}
                            onChange={handleInputChange}
                            value={candidateFormObject.leadFrom}
                            errorMessage={simpleValidator.current.message(
                              'Lead Form',
                              candidateFormObject.leadFrom,
                              'required'
                            )}
                          />
                        </div>
                      )}
                    <div className="col-md-3">
                      <NormalSelect
                        label="Demo Taken"
                        name="demoBy"
                        option={userList}
                        onChange={handleInputChange}
                        value={candidateFormObject.demoBy}
                        errorMessage={simpleValidator.current.message(
                          'Demo Taken',
                          candidateFormObject.demoBy,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalSelect
                        label="Demo Status"
                        name="demoStatus"
                        option={DEMO_STATUS_LIST}
                        onChange={handleInputChange}
                        value={candidateFormObject.demoStatus}
                        errorMessage={simpleValidator.current.message(
                          'Demo Status',
                          candidateFormObject.demoStatus,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalSelect
                        label="Class Mode"
                        name="classMode"
                        option={CLASS_MODE_LIST}
                        onChange={handleInputChange}
                        value={candidateFormObject.classMode}
                        errorMessage={simpleValidator.current.message(
                          'Class Mode',
                          candidateFormObject.classMode,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalSelect
                        label="Class Status"
                        name="classStatus"
                        option={CANDIDATE_CLASS_STATUS_LIST}
                        onChange={handleInputChange}
                        value={candidateFormObject.classStatus}
                        errorMessage={simpleValidator.current.message(
                          'Class Status',
                          candidateFormObject.classStatus,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalInput
                        label="Class Start"
                        type="date"
                        onChange={handleInputChange}
                        value={candidateFormObject.classStart}
                        name="classStart"
                        errorMessage={simpleValidator.current.message(
                          'Class Start',
                          candidateFormObject.classStart,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalSelect
                        label="Branch"
                        name="branch"
                        option={BRANCH_LIST}
                        onChange={handleInputChange}
                        value={candidateFormObject.branch}
                        errorMessage={simpleValidator.current.message(
                          'Branch',
                          candidateFormObject.branch,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalSelect
                        label="Batch Id"
                        name="batchId"
                        option={batchList}
                        onChange={handleInputChange}
                        value={candidateFormObject.batchId}
                        errorMessage={simpleValidator.current.message(
                          'Batch Id',
                          candidateFormObject.batchId,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalInput
                        label="Total Fees"
                        type="number"
                        onChange={handleInputChange}
                        value={candidateFormObject.totfees}
                        name="totfees"
                        errorMessage={simpleValidator.current.message(
                          'Total Fees',
                          candidateFormObject.totfees,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalInput
                        label="Payed Fees"
                        type="number"
                        onChange={handleInputChange}
                        value={candidateFormObject.payedfees}
                        name="payedfees"
                        errorMessage={simpleValidator.current.message(
                          'Pending Fees',
                          candidateFormObject.payedfees,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalInput
                        label="Pending Fees"
                        type="number"
                        // onChange={handleInputChange}
                        disabled
                        value={handleGetPendingFees(
                          candidateFormObject.totfees,
                          candidateFormObject.payedfees
                        )}
                        name="payedfees"
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalInput
                        label="Fees due date"
                        type="date"
                        onChange={handleInputChange}
                        value={candidateFormObject.feesDueDate}
                        name="feesDueDate"
                        errorMessage={simpleValidator.current.message(
                          'Fees due date',
                          candidateFormObject.feesDueDate,
                          'required'
                        )}
                      />
                    </div>
                    <div className="col-md-3">
                      <NormalSelect
                        label="Project Status"
                        name="projectStatus"
                        option={YES_NO_LIST}
                        onChange={handleInputChange}
                        value={candidateFormObject.projectStatus}
                        errorMessage={simpleValidator.current.message(
                          'Project Status',
                          candidateFormObject.projectStatus,
                          'required'
                        )}
                      />
                    </div>
                    {candidateFormObject.projectStatus ===
                      YES_NO_STATUS.YES && (
                      <div className="col-md-3">
                        <NormalInput
                          label="Projects Link"
                          maxRows={2}
                          multiline
                          onChange={handleInputChange}
                          value={candidateFormObject.projectLink}
                          name="projectLink"
                          errorMessage={simpleValidator.current.message(
                            'Projects Link',
                            candidateFormObject.projectLink,
                            'required'
                          )}
                        />
                      </div>
                    )}

                    <div className="col-md-3">
                      <NormalSelect
                        label="Git Account"
                        name="gitAccount"
                        option={YES_NO_LIST}
                        onChange={handleInputChange}
                        value={candidateFormObject.gitAccount}
                        errorMessage={simpleValidator.current.message(
                          'Git Account',
                          candidateFormObject.gitAccount,
                          'required'
                        )}
                      />
                    </div>
                    {candidateFormObject.gitAccount === YES_NO_STATUS.YES && (
                      <div className="col-md-3">
                        <NormalInput
                          label="Git Account Id"
                          maxRows={2}
                          multiline
                          onChange={handleInputChange}
                          value={candidateFormObject.gitAccountId}
                          name="gitAccountId"
                          errorMessage={simpleValidator.current.message(
                            'Git Account Id',
                            candidateFormObject.gitAccountId,
                            'required|url'
                          )}
                        />
                      </div>
                    )}
                    <div className="col-md-3">
                      <NormalSelect
                        label="Resume Status"
                        name="resumeStatus"
                        option={YES_NO_LIST}
                        onChange={handleInputChange}
                        value={candidateFormObject.resumeStatus}
                        errorMessage={simpleValidator.current.message(
                          'Resume Status',
                          candidateFormObject.resumeStatus,
                          'required'
                        )}
                      />
                    </div>
                    {candidateFormObject.resumeStatus === YES_NO_STATUS.YES && (
                      <div className="col-md-3">
                        <NormalInput
                          label="Resume Link"
                          maxRows={2}
                          // multiline
                          onChange={handleInputChange}
                          value={candidateFormObject.resumeLink}
                          name="resumeLink"
                          errorMessage={simpleValidator.current.message(
                            'Resume Link',
                            candidateFormObject.resumeLink,
                            'required|url'
                          )}
                        />
                      </div>
                    )}

                    <div className="col-md-12">
                      <NormalButton
                        className="me-2 btn-danger"
                        disabled={isLoadingFrom}
                        label="Cancel"
                        color="primary"
                        onClick={() => navigate('/candidate')}
                      />
                      <NormalButton
                        className="me-2 btn-primary"
                        //   isLoader={isLoadingFrom}
                        onClick={handleleadSubmit}
                        label={`${
                          candidateId !== 'new' ? 'Update' : 'Save'
                        } Changes`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};
