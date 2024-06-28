/* eslint-disable jsx-a11y/label-has-associated-control */
import './myCourseContent.scss';

export const MyCourseContent = () => {
  return (
    <div className="row courseDetailContiner">
      <div className="col-md-12">
        <div className="card mb-4">
          <div className="card-header">
            <h4 className="titleCourseList">HTML</h4>
            <label className="subtitleCourseList">Count - 1/20</label>
          </div>
          <ul className="list-group list-group-flush">
            <li
              className="list-group-item"
              //   onClick={() => handleSelectTopic(j, i)}
              //   key={j}
            >
              <lable href="#" className="listGroupIteam">
                HTML Intro
              </lable>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
