import { NormalInput, NormalButton } from 'components/common';
import { useState, useRef } from 'react';
import { courseSchemaModule } from 'services/module';
import SimpleReactValidator from 'simple-react-validator';
import { createCourse } from 'api/course';

export const CourseForm = ({ onSucess = () => {} }) => {
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: 'error-message' })
  );
  const [courseFormObject, setCourseFormObject] = useState({
    ...courseSchemaModule
  });
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [, forceUpdate] = useState();

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name }
    } = event;

    setCourseFormObject({
      ...courseFormObject,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleleadSubmit = async () => {
    try {
      const formValid = simpleValidator.current.allValid();
      if (formValid) {
        setIsLoadingFrom(true);
        const courseRes = await createCourse(courseFormObject);
        onSucess(courseFormObject, courseRes);
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
          label="Enter Course Name"
          name="name"
          onChange={handleInputChange}
          value={courseFormObject.name}
          errorMessage={simpleValidator.current.message(
            'Course Name',
            courseFormObject.name,
            'required'
          )}
        />
      </div>
      <div className="col-md-12">
        <NormalInput
          label="Enter Course Price"
          name="price"
          type="text"
          onChange={handleInputChange}
          value={courseFormObject.price}
          errorMessage={simpleValidator.current.message(
            'Course Price',
            courseFormObject.price,
            'required'
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
