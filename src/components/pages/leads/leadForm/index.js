/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { NormalInput, NormalSelect, NormalButton } from 'components/common';
import { useState, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {
  COURSE_ENQUIRY_STATUS_LIST,
  LEAD_TYPE_LIST,
  DEMO_STATUS_LIST,
  BRANCH_LIST,
  LEAD_TYPE
} from 'services/constants';
import SimpleReactValidator from 'simple-react-validator';
import { leadSchemaModule } from 'services/module';
import { userGetByRole } from 'services/helperFunctions';
import { createLead, updateLead } from 'api/lead';

export const LeadForm = ({
  onSucess = () => {},
  leadFromList = [],
  courseList = [],
  editLeadObject = null
}) => {
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: 'error-message' })
  );
  const [leadFormObject, setLeadFormObject] = useState({
    ...leadSchemaModule,
    ...editLeadObject
  });
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [, forceUpdate] = useState();

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name }
    } = event;

    setLeadFormObject({
      ...leadFormObject,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddCommentsForm = (data, i) => {
    const { comments = [] } = leadFormObject;
    const commentsList = comments;
    commentsList[i] = {
      userId: 0,
      notes: data,
      date: new Date()
    };
    setLeadFormObject({
      ...leadFormObject,
      comments: commentsList
    });
  };

  const handleAddComments = () => {
    leadFormObject.comments.push({
      userId: '',
      notes: '',
      date: new Date()
    });
    setLeadFormObject({
      ...leadFormObject
    });
  };

  const handleleadSubmit = async () => {
    try {
      const formValid = simpleValidator.current.allValid();

      if (formValid) {
        setIsLoadingFrom(true);
        const res = (await leadFormObject?.id)
          ? updateLead(leadFormObject, leadFormObject.id)
          : createLead(leadFormObject);
        onSucess(leadFormObject, res);
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {
      setIsLoadingFrom(false);
    }
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <NormalInput
          label="Enter Name"
          onChange={handleInputChange}
          value={leadFormObject.name}
          name="name"
          errorMessage={simpleValidator.current.message(
            'Name',
            leadFormObject.name,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Phone"
          onChange={handleInputChange}
          name="phone"
          value={leadFormObject.phone}
          errorMessage={simpleValidator.current.message(
            'Phone',
            leadFormObject.phone,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Email"
          onChange={handleInputChange}
          name="email"
          value={leadFormObject.email}
          errorMessage={simpleValidator.current.message(
            'Email',
            leadFormObject.email,
            'required|email'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          multiple
          label="Course"
          name="courses"
          option={courseList}
          onChange={handleInputChange}
          value={leadFormObject.courses}
          errorMessage={simpleValidator.current.message(
            'Course',
            leadFormObject.courses,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          label="Lead Type"
          name="leadType"
          option={LEAD_TYPE_LIST}
          onChange={handleInputChange}
          value={leadFormObject.leadType}
          errorMessage={simpleValidator.current.message(
            'Lead Type',
            leadFormObject.leadType,
            'required'
          )}
        />
      </div>
      {leadFormObject.leadType !== LEAD_TYPE.INSTAGRAM &&
        leadFormObject.leadType !== LEAD_TYPE.BRANCH && (
          <div className="col-md-6">
            <NormalSelect
              label="Lead Form"
              name="leadFrom"
              option={userGetByRole(leadFromList, leadFormObject.leadType)}
              onChange={handleInputChange}
              value={leadFormObject.leadFrom}
              errorMessage={simpleValidator.current.message(
                'Lead Form',
                leadFormObject.leadFrom,
                'required'
              )}
            />
          </div>
        )}

      <div className="col-md-6">
        <NormalSelect
          label="Branch"
          name="branch"
          option={BRANCH_LIST}
          onChange={handleInputChange}
          value={leadFormObject.branch}
          errorMessage={simpleValidator.current.message(
            'Branch',
            leadFormObject.branch,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          label="Demo Taken"
          name="demoBy"
          option={leadFromList}
          onChange={handleInputChange}
          value={leadFormObject.demoBy}
          errorMessage={simpleValidator.current.message(
            'Demo Taken',
            leadFormObject.demoBy,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          label="Demo Status"
          name="demoStatus"
          option={DEMO_STATUS_LIST}
          onChange={handleInputChange}
          value={leadFormObject.demoStatus}
          errorMessage={simpleValidator.current.message(
            'Demo Status',
            leadFormObject.demoStatus,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Total Fees"
          type="number"
          onChange={handleInputChange}
          value={leadFormObject.totfees}
          name="totfees"
          errorMessage={simpleValidator.current.message(
            'Total Fees',
            leadFormObject.totfees,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          label="Lead Status"
          name="leadstatus"
          option={COURSE_ENQUIRY_STATUS_LIST}
          onChange={handleInputChange}
          value={leadFormObject.leadstatus}
          errorMessage={simpleValidator.current.message(
            'Lead Status',
            leadFormObject.leadstatus,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Next Follow up"
          type="date"
          onChange={handleInputChange}
          value={leadFormObject.nextFollUp}
          name="nextFollUp"
          errorMessage={simpleValidator.current.message(
            'Next Follow up',
            leadFormObject.nextFollUp,
            'required'
          )}
        />
      </div>
      <div className="col-md-12">
        <label className="form-label fw-medium">Comment</label>
        {leadFormObject.comments.map((comment, i) => (
          <div className="mb-3">
            <CKEditor
              editor={ClassicEditor}
              data={comment.notes}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log('Editor is ready to use!', editor);
              }}
              onChange={(event, editor) => {
                console.log(
                  'event------------>',
                  // webinarObjectFrom,
                  editor.getData()
                );
                const data = editor.getData();
                handleAddCommentsForm(data, i);
              }}
            />
            <div className="form-text text-danger">
              {simpleValidator.current.message(
                'Comment',
                comment.notes,
                'required'
              )}
            </div>
          </div>
        ))}
      </div>
      <a href="#" onClick={handleAddComments}>
        Add Comment
      </a>
      <div className="col-md-12">
        <NormalButton
          className="me-2 btn-danger"
          disabled={isLoadingFrom}
          label="Cancel"
          color="primary"
        />
        <NormalButton
          className="me-2 btn-primary"
          //   isLoader={isLoadingFrom}
          onClick={handleleadSubmit}
          label={`${leadFormObject?.id ? 'Update' : 'Save'} Changes`}
        />
      </div>
    </div>
  );
};
