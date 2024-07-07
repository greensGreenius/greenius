import { NormalInput } from 'components/common';
import { useRef, useState } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { candidateLoginOtpVerify } from 'api/auth';
import { useNavigate } from 'react-router-dom';

export const OTpForm = ({ candidateData }) => {
  const navigate = useNavigate();
  const [otpText, setOtpText] = useState('');
  const validator = useRef(new SimpleReactValidator());
  const [, forceUpdate] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChangeInput = (event) => {
    const {
      target: { value, name }
    } = event;
    console.log(name);

    setOtpText(value);
  };

  const handleLogin = async () => {
    try {
      const isValid = validator.current.allValid();

      if (isValid) {
        setIsLoading(true);
        const body = {
          otpCode: otpText,
          candidateId: candidateData?.id
        };
        const userLoginRes = await candidateLoginOtpVerify(body);
        setIsLoading(false);
        if (userLoginRes?.isError) {
          setErrorMessage(userLoginRes?.message);
        } else {
          navigate('/myCourse', { replace: true });
        }
        console.log('userLoginRes----------', JSON.stringify(userLoginRes));

        // if (userLoginRes?.isError) {

        // } else {

        // }
      } else {
        validator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <NormalInput
          label="Enter OTP"
          value={otpText}
          name="email"
          onChange={handleChangeInput}
          placeholder="Enter Email"
          errorMessage={
            validator.current.message('OTP', otpText, 'required') ||
            errorMessage
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
        {!isLoading ? 'Submit' : 'Loading...'}
      </button>
    </div>
  );
};
