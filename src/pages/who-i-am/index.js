/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/alt-text */
import { useNavigate } from 'react-router-dom';
import learning from 'assets/img/learning.png';
import trainear from 'assets/img/trainear.png';
import './who-i-am.scss';

export const WhoIam = () => {
  const navigate = useNavigate();

  return (
    <div className="row mb-3  mt-5">
      <div className="col-md-6">
        <div
          className="mr-2  text-center card border"
          onClick={() => navigate('/learner')}
        >
          <div className="text-center card-body">
            <img
              src={learning}
              className="img-fluid"
              style={{ cursor: 'pointer' }}
            />
            <h4 className="title">Learner</h4>
            <p className="mb-0">For Induviduals</p>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div
          className="mr-2  text-center card border"
          onClick={() => navigate('/tenant')}
        >
          <div className="text-center card-body">
            <img
              src={trainear}
              className="img-fluid"
              style={{ cursor: 'pointer' }}
            />
            <h4 className="title">Mentor</h4>
            <p className="mb-0">For Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
};
