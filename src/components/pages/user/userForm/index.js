/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { NormalInput, NormalSelect, NormalButton } from 'components/common';
import { useState, useRef } from 'react';
import { USER_LIST } from 'services/constants';
import SimpleReactValidator from 'simple-react-validator';
import { userSchemaModule } from 'services/module';
import { createAuthentication } from 'api/auth';

export const UserForm = ({ onSucess = () => {} }) => {
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: 'error-message' })
  );
  const [userFormObject, setUserFormObject] = useState({ ...userSchemaModule });
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [, forceUpdate] = useState();

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name }
    } = event;

    setUserFormObject({
      ...userFormObject,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleleadSubmit = async () => {
    try {
      const formValid = simpleValidator.current.allValid();
      console.log('------', formValid);
      if (formValid) {
        setIsLoadingFrom(true);
        const userRes = await createAuthentication(userFormObject);
        onSucess(userFormObject, userRes);
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
      <div className="col-md-6">
        <NormalInput
          label="Enter First Name"
          name="fname"
          onChange={handleInputChange}
          value={userFormObject.fname}
          errorMessage={simpleValidator.current.message(
            'First Name',
            userFormObject.fname,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Last Name"
          name="lname"
          onChange={handleInputChange}
          value={userFormObject.lname}
          errorMessage={simpleValidator.current.message(
            'Last Name',
            userFormObject.lname,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Phone"
          onChange={handleInputChange}
          name="phone"
          value={userFormObject.phone}
          errorMessage={simpleValidator.current.message(
            'Phone',
            userFormObject.phone,
            'required|phone'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Email"
          onChange={handleInputChange}
          name="email"
          value={userFormObject.email}
          errorMessage={simpleValidator.current.message(
            'Email',
            userFormObject.email,
            'required|email'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          label="Enter Password"
          onChange={handleInputChange}
          name="password"
          type="password"
          value={userFormObject.password}
          errorMessage={simpleValidator.current.message(
            'Password',
            userFormObject.password,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          label="User Type"
          name="userType"
          option={USER_LIST}
          onChange={handleInputChange}
          value={userFormObject.userType}
          errorMessage={simpleValidator.current.message(
            'User Type',
            userFormObject.userType,
            'required'
          )}
        />
      </div>

      {/* <div className="col-md-12">
        <NormalSelect
          label="Status"
          name="status"
          option={USER_LIST}
          onChange={handleInputChange}
          value={leadFormObject.status}
          errorMessage={simpleValidator.current.message(
            'Status',
            leadFormObject.status,
            'required'
          )}
        />
      </div> */}

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
