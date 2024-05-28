/* eslint-disable jsx-a11y/label-has-associated-control */

import { useNavigate } from 'react-router-dom';

export const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/lead');
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" className="form-control" />
        </div>
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="email" className="form-control" />
        </div>
      </div>
      <button type="submit" onClick={handleLogin} className="btn btn-primary">
        Submit
      </button>
    </div>
  );
};
