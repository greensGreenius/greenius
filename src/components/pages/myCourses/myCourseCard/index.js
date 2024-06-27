/* eslint-disable jsx-a11y/alt-text */
import './myCourseCard.scss';

export const MyCourseCard = () => {
  return (
    <div className="row g-4 my-course-content">
      <div className="col-sm-6 col-lg-4 col-xl-3">
        <div className="card shadow my-course-card h-100">
          <img
            className="card-img-top"
            src="https://www.greenstechnologys.in/_next/image?url=%2Fimages%2Fcourses%2F4by3%2F07.jpg&w=640&q=75"
          />
          <div className="card-body pb-0">
            <div className="d-flex cardTitle">
              <h5 className="card-title fw-normal">Javascript Zero to Hero</h5>
            </div>
            <p className="mb-2  text-gray text-truncate-2 text-dis">
              Build fullstack React.js applications with Node.js, Express.js
              &amp; MongoDB (MERN) with this project-focused course.
            </p>
          </div>
          <div className="card-footer pb-3">
            <div className="d-flex justify-content-between">
              <span className="h6 text-gray fw-light mb-0 icon-course">
                <span className="material-icons me-1 ">schedule</span>
                2Hrs
              </span>
              <span className="h6 text-gray fw-light mb-0 icon-course">
                <span className="material-icons me-1">translate</span>
                Tamil
              </span>
              {/* <span className="h6 fw-light mb-0">
                <i className="far fa-calendar-alt text-orange me-2" />
                90 Days
              </span> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
