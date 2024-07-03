import { NormalInput, NormalButton } from 'components/common';
import { useState, useRef } from 'react';
import { recordingClassSchemaModule } from 'services/module';
import SimpleReactValidator from 'simple-react-validator';
import { createRecordingClass } from 'api/recordingClass';
import { useParams } from 'react-router-dom';

export const RecordingClassesFrom = ({ onSucess = () => {} }) => {
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: 'error-message' })
  );
  const { batchId } = useParams();
  const [recordingClassFormObject, setRecordingClassFormObjectFormObject] =
    useState({
      ...recordingClassSchemaModule
    });
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [, forceUpdate] = useState();

  // const [, forceUpdate] = useState();

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name }
    } = event;

    setRecordingClassFormObjectFormObject({
      ...recordingClassFormObject,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleleadSubmit = async () => {
    try {
      const formValid = simpleValidator.current.allValid();
      if (formValid) {
        setIsLoadingFrom(true);
        const reqBody = {
          ...recordingClassFormObject,
          batchId
        };
        const recClassRes = await createRecordingClass(reqBody);
        onSucess(reqBody, recClassRes);
        setIsLoadingFrom(false);
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
      <div className="col-md-12">
        <NormalInput
          label="Enter Topic Name"
          name="topic"
          onChange={handleInputChange}
          value={recordingClassFormObject.topic}
          errorMessage={simpleValidator.current.message(
            'Topic',
            recordingClassFormObject.topic,
            'required'
          )}
        />
      </div>
      <div className="col-md-12">
        <NormalInput
          label="Enter Class section url"
          name="recClassLink"
          onChange={handleInputChange}
          value={recordingClassFormObject.recClassLink}
          errorMessage={simpleValidator.current.message(
            'Class section url',
            recordingClassFormObject.recClassLink,
            'required|url'
          )}
        />
      </div>

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
          label="Save Changes"
        />
      </div>
    </div>
  );
};
