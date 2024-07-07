import { letterAvatar, getStorage } from 'services/helperFunctions';
import { NormalInput, NormalButton, NormalSelect } from 'components/common';
import { useState, useRef, useEffect } from 'react';
import './candidateProfileForm.scss';
import SimpleReactValidator from 'simple-react-validator';
import { candidateSchemaModule } from 'services/module';
import { getCandidateById, updateByCandidateLead } from 'api/lead';
import {
  EXIST_LOCAL_STORAGE,
  YES_NO_LIST,
  YES_NO_STATUS
} from 'services/constants';

export const CandidateProfileForm = () => {
  const [candidateFormObject, setCandidateFormObject] = useState({
    batchIds: [],
    ...candidateSchemaModule
  });
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: 'error-message' })
  );
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [, forceUpdate] = useState();

  const handleGetCandidateById = async () => {
    try {
      let curentUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
      curentUser = JSON.parse(curentUser);

      setIsLoadingFrom(true);
      const candRes = await getCandidateById(curentUser?.userId);
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

  const handleleadSubmit = async () => {
    try {
      const body = {
        ...candidateFormObject
      };

      // delete body.batchId;

      const formValid = simpleValidator.current.allValid();

      if (formValid) {
        setIsLoadingFrom(true);
        let curentUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
        curentUser = JSON.parse(curentUser);
        console.log('body.batchIds-----', curentUser?.userId);
        const res = await updateByCandidateLead(body, curentUser?.userId);
        console.log('res-----', res);
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
    <div className="container profile-container">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col-md-12 mb-4">
                  <div className="avatar">
                    <img
                      className="profiltImage-header me-3"
                      alt={candidateFormObject?.name}
                      src={letterAvatar(candidateFormObject?.name, 120)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <NormalInput
                    label="Name"
                    onChange={handleInputChange}
                    value={candidateFormObject?.name}
                    name="name"
                    errorMessage={simpleValidator.current.message(
                      'Name',
                      candidateFormObject?.name,
                      'required'
                    )}
                  />
                </div>
                <div className="col-md-4">
                  <NormalInput
                    label="Phone"
                    onChange={handleInputChange}
                    name="phone"
                    value={candidateFormObject?.phone}
                    errorMessage={simpleValidator.current.message(
                      'Phone',
                      candidateFormObject?.phone,
                      'required'
                    )}
                  />
                </div>
                <div className="col-md-4">
                  <NormalInput
                    label="Email"
                    onChange={handleInputChange}
                    name="email"
                    value={candidateFormObject?.email}
                    hintText="This email will be used for login via email in the greenius"
                    errorMessage={simpleValidator.current.message(
                      'Email',
                      candidateFormObject?.email,
                      'required|email'
                    )}
                  />
                </div>
                <div className="col-md-4">
                  <NormalSelect
                    label="Project Status"
                    name="projectStatus"
                    option={YES_NO_LIST}
                    onChange={handleInputChange}
                    value={candidateFormObject?.projectStatus}
                    errorMessage={simpleValidator.current.message(
                      'Project Status',
                      candidateFormObject?.projectStatus,
                      'required'
                    )}
                  />
                </div>
                {candidateFormObject?.projectStatus === YES_NO_STATUS.YES && (
                  <div className="col-md-4">
                    <NormalInput
                      label="Projects Link"
                      maxRows={2}
                      multiline
                      onChange={handleInputChange}
                      value={candidateFormObject?.projectLink}
                      name="projectLink"
                      errorMessage={simpleValidator.current.message(
                        'Projects Link',
                        candidateFormObject?.projectLink,
                        'required'
                      )}
                    />
                  </div>
                )}
                <div className="col-md-4">
                  <NormalSelect
                    label="Git Account"
                    name="gitAccount"
                    option={YES_NO_LIST}
                    onChange={handleInputChange}
                    value={candidateFormObject?.gitAccount}
                    errorMessage={simpleValidator.current.message(
                      'Git Account',
                      candidateFormObject?.gitAccount,
                      'required'
                    )}
                  />
                </div>
                {candidateFormObject?.gitAccount === YES_NO_STATUS.YES && (
                  <div className="col-md-4">
                    <NormalInput
                      label="Git Account Id"
                      maxRows={2}
                      multiline
                      onChange={handleInputChange}
                      value={candidateFormObject?.gitAccountId}
                      name="gitAccountId"
                      errorMessage={simpleValidator.current.message(
                        'Git Account Id',
                        candidateFormObject?.gitAccountId,
                        'required|url'
                      )}
                    />
                  </div>
                )}
                <div className="col-md-4">
                  <NormalSelect
                    label="Resume Status"
                    name="resumeStatus"
                    option={YES_NO_LIST}
                    onChange={handleInputChange}
                    value={candidateFormObject?.resumeStatus}
                    errorMessage={simpleValidator.current.message(
                      'Resume Status',
                      candidateFormObject?.resumeStatus,
                      'required'
                    )}
                  />
                </div>
                {candidateFormObject?.resumeStatus === YES_NO_STATUS.YES && (
                  <div className="col-md-4">
                    <NormalInput
                      label="Resume Link"
                      maxRows={2}
                      // multiline
                      onChange={handleInputChange}
                      value={candidateFormObject?.resumeLink}
                      name="resumeLink"
                      errorMessage={simpleValidator.current.message(
                        'Resume Link',
                        candidateFormObject?.resumeLink,
                        'required|url'
                      )}
                    />
                  </div>
                )}
                <div className="col-md-4">
                  <NormalSelect
                    label="Portfolio Status"
                    name="portfolioStatus"
                    option={YES_NO_LIST}
                    onChange={handleInputChange}
                    value={candidateFormObject?.portfolioStatus}
                    errorMessage={simpleValidator.current.message(
                      'Portfolio Status',
                      candidateFormObject?.portfolioStatus,
                      'required'
                    )}
                  />
                </div>
                {candidateFormObject?.portfolioStatus === YES_NO_STATUS.YES && (
                  <div className="col-md-4">
                    <NormalInput
                      label="Portfolio Link"
                      onChange={handleInputChange}
                      value={candidateFormObject?.portfolioUrl}
                      name="portfolioUrl"
                      errorMessage={simpleValidator.current.message(
                        'Portfolio Link',
                        candidateFormObject?.portfolioUrl,
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
                    // onClick={() => navigate('/candidate')}
                  />
                  <NormalButton
                    className="me-2 btn-primary"
                    //   isLoader={isLoadingFrom}
                    onClick={handleleadSubmit}
                    label="Update"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
