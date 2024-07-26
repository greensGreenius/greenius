import { NormalButton } from 'components/common';
import cong from 'assets/img/cong.png';
import './quizeComplite.scss';

export const QuizeComplite = () => {
  return (
    <div className="container text-center mt-5 quizeCompliteContiner">
      <div className="row">
        <div className="col-md-12 mb-5">
          <h4 className="quizeTitle">Result</h4>
          <h4 className="mb-5">70/100</h4>
          <NormalButton
            className="btn-lg btn-primary"
            onClick={() => {}}
            label="Go to Home Page"
          />
        </div>
        <div className="col-md-12">
          <img className="img-fluid" alt="cong" src={cong} />
        </div>
      </div>
    </div>
  );
};
