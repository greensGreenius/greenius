import { NormalInput, NormalSelect, NormalButton } from 'components/common';
import { useState, useRef, useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import {
  //   COURSE_ENQUIRY_STATUS_LIST,
  LEAD_TYPE_LIST,
  YES_NO_LIST,
  BRANCH_LIST,
  PAY_BANK_LIST,
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
      setCandidateFormObject({ ...candidateSchemaModule, ...candRes });
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

  const handleAddNewBillInfo = () => {
    candidateFormObject.billingInfo.push({
      payFees: 0,
      payDate: '',
      payedAccount: null
    });
    setCandidateFormObject({ ...candidateFormObject });
  };

  const handleDeleteNewBillInfo = (i) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const candObj = { ...candidateFormObject };
        if (candObj.billingInfo.length > 1) {
          candObj.billingInfo.splice(i, 1);
          if (candObj.billingInfo.length > 0) {
            candObj.payedfees = candObj.billingInfo.reduce(
              (preValue, currentValue) =>
                Number(preValue) + Number(currentValue.payFees),
              0
            );
          }
          setCandidateFormObject({ ...candObj });
        }
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
      }
    });
  };

  const handleInputBillingChange = (event, i) => {
    const {
      target: { value, name }
    } = event;

    const candObj = { ...candidateFormObject };

    candObj.billingInfo[i][name] = value;
    if (candObj.billingInfo.length > 0) {
      candObj.payedfees = candObj.billingInfo.reduce(
        (preValue, currentValue) =>
          Number(preValue) + Number(currentValue.payFees),
        0
      );
    }
    setCandidateFormObject({
      ...candObj
    });
    simpleValidator.current.purgeFields();
  };

  // const handleGetPayFees = () => {
  //   const candObj = { ...candidateFormObject };
  //   if (candObj.billingInfo.length > 0) {
  //     candObj.payedfees = candObj.billingInfo.reduce(
  //       (preValue, currentValue) =>
  //         Number(preValue) + Number(currentValue.payFees),
  //       0
  //     );
  //     return candObj.payedfees;
  //   }
  //   return 0;
  // };
  return (
    <div className="row">
      {!isLoadingFrom ? (
        <div className="col-md-12">
          <div className="card mb-4">
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
                        disabled
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
                    {handleGetPendingFees(
                      candidateFormObject.totfees,
                      candidateFormObject.payedfees
                    ) !== 0 && (
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
                    )}

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

                    {/* <div className="col-md-12">
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
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-2">
                  <h5>Billing Info</h5>
                </div>
                {candidateFormObject?.billingInfo?.map((billInfo, i) => (
                  <div className="col-md-12" key={billInfo.payDate}>
                    <div className="row">
                      <div className="col-md-3">
                        <NormalInput
                          label="Pay Fees"
                          onChange={(e) => handleInputBillingChange(e, i)}
                          value={billInfo.payFees}
                          name="payFees"
                          type="number"
                          errorMessage={simpleValidator.current.message(
                            'Pay Fees',
                            billInfo.payFees,
                            'required'
                          )}
                        />
                      </div>
                      <div className="col-md-3">
                        <NormalInput
                          label="Payed Date"
                          onChange={(e) => handleInputBillingChange(e, i)}
                          value={billInfo.payDate}
                          name="payDate"
                          type="date"
                          errorMessage={simpleValidator.current.message(
                            'Payed Date',
                            billInfo.payDate,
                            'required'
                          )}
                        />
                      </div>

                      <div className="col-md-3">
                        <NormalSelect
                          label="Payed Account"
                          name="payedAccount"
                          option={PAY_BANK_LIST}
                          onChange={(e) => handleInputBillingChange(e, i)}
                          value={billInfo.payedAccount}
                          errorMessage={simpleValidator.current.message(
                            'Payed Account',
                            billInfo.payedAccount,
                            'required'
                          )}
                        />
                      </div>
                      <div className="col-md-3">
                        <IconButton
                          color="success"
                          className="mt-4"
                          onClick={handleAddNewBillInfo}
                        >
                          <AddIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          className="mt-4"
                          title={`${
                            candidateFormObject?.billingInfo.length === 1
                              ? 'Min Need 1'
                              : ''
                          }`}
                          disabled={
                            candidateFormObject?.billingInfo.length === 1
                          }
                          onClick={() => handleDeleteNewBillInfo(i)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
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
      ) : (
        <h4>Loading...</h4>
      )}
    </div>
  );
};
