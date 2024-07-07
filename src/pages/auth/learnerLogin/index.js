/* eslint-disable jsx-a11y/label-has-associated-control */

// import { useNavigate } from 'react-router-dom';
import { NormalInput } from 'components/common';
import { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { candidateLogin } from 'api/auth';
import { Toast } from 'services/toast';
import { OTpForm } from '../learnerOtp';

export const LearnerLoginPage = () => {
  //   const navigate = useNavigate();
  const [loginFormObj, setLoginFormObj] = useState({
    email: '',
    password: ''
  });
  const [, forceUpdate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isShowOtp, setIsShowOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [candidateData, setCandidateData] = useState(null);
  const validator = useRef(new SimpleReactValidator());
  // {validator}

  const handleChangeInput = (event) => {
    const {
      target: { value, name }
    } = event;
    console.log(name);

    setLoginFormObj({
      ...loginFormObj,
      [name]: value
    });
  };

  const handleLogin = async () => {
    try {
      const isValid = validator.current.allValid();

      if (isValid) {
        setIsLoading(true);
        const userLoginRes = await candidateLogin(loginFormObj);
        console.log('userLoginRes----------', JSON.stringify(userLoginRes));
        setIsLoading(false);
        if (userLoginRes?.isError) {
          setErrorMessage(userLoginRes?.message);
          setIsShowOtp(false);
          Toast({
            type: 'success',
            message: 'You have been sucessfully login',
            title: 'Success!'
          });
          //   navigate('/home');
        } else {
          setCandidateData(userLoginRes);
          setIsShowOtp(true);
        }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  const EmailLoginFormContent = () => {
    return (
      <div className="row">
        <div className="col-md-12">
          <NormalInput
            label="Email address"
            value={loginFormObj.email}
            name="email"
            onChange={handleChangeInput}
            placeholder="Enter Email"
            errorMessage={
              validator.current.message(
                'Email',
                loginFormObj.email,
                'required|email'
              ) || errorMessage
            }
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          onClick={handleLogin}
          className="btn btn-greenius"
        >
          {isLoading && (
            <span className="spinner-border spinner-border-sm me-2" />
          )}
          {/* <span className="visually-hidden">Loading...</span> */}
          {!isLoading ? 'Get OTP' : 'Loading...'}
        </button>
      </div>
    );
  };

  return isShowOtp ? (
    <OTpForm candidateData={candidateData} />
  ) : (
    <EmailLoginFormContent />
  );
};
