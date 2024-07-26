/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { QUIZ_LIST } from 'services/data';
import { useEffect, useState } from 'react';

export const QuizeTestCard = ({ onQuizeStatusChange = () => {} }) => {
  const [selectedQue, setSelectQue] = useState({});
  const [quizList, setQuizList] = useState(QUIZ_LIST);

  useEffect(() => {
    setSelectQue({ ...QUIZ_LIST[0], setIndex: 0 });
  }, []);

  const handleChangeQus = () => {
    if (
      selectedQue?.setIndex >= 0 &&
      QUIZ_LIST.length !== selectedQue?.setIndex + 1
    ) {
      setSelectQue({
        ...QUIZ_LIST[selectedQue?.setIndex + 1],
        setIndex: selectedQue?.setIndex + 1
      });
    } else {
      let overallCount = 0;
      // eslint-disable-next-line array-callback-return
      quizList.map(({ correct, selAns }) => {
        if (correct === selAns) {
          overallCount += 1;
        }
      });
      console.log('overallCount------------>', overallCount);
      onQuizeStatusChange(2);
    }

    // onQuizeStatusChange(2)
  };

  const handlePrevChangeQus = () => {
    console.log('electedQue?.setIndex -------->', selectedQue?.setIndex);

    if (selectedQue?.setIndex >= 0) {
      setSelectQue({
        ...QUIZ_LIST[selectedQue?.setIndex - 1],
        setIndex: selectedQue?.setIndex - 1
      });
    }

    // onQuizeStatusChange(2)
  };

  const handleChangeAns = (id) => {
    try {
      quizList[selectedQue?.setIndex].selAns = id;
      selectedQue.selAns = id;
      setSelectQue({ ...selectedQue });
      setQuizList([...quizList]);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container mt-5 quize-container">
      <div className="d-flex justify-content-center row">
        <div className="col-md-10 col-lg-10">
          <div className="border">
            <div className="question bg-white p-3 border-bottom">
              <div className="d-flex flex-row justify-content-between align-items-center mcq">
                <h4>MCQ Quiz</h4>
                <span>
                  ({selectedQue?.setIndex + 1} of {QUIZ_LIST?.length})
                </span>
              </div>
            </div>
            {/* {QUIZ_LIST.map((data, i) => */}
            <div className="question bg-white p-3 border-bottom">
              <div className="d-flex flex-row align-items-center question-title">
                <h3 className="text-danger">Q.</h3>
                <h5 className="mt-1 ml-2">{selectedQue.question}</h5>
              </div>
              {selectedQue?.answers?.map(({ ans, id }, i) => (
                <div className="ans ml-2" key={id}>
                  <label
                    className="radio"
                    onClick={() => handleChangeAns(id, i)}
                  >
                    {' '}
                    <input
                      type="checkbox"
                      name="ans"
                      checked={selectedQue.selAns === id}
                    />{' '}
                    <span>{ans}</span>
                  </label>
                </div>
              ))}
            </div>
            {/* )} */}

            <div className="d-flex flex-row justify-content-between align-items-center p-3 bg-white">
              <button
                className="btn btn-primary d-flex align-items-center btn-danger"
                disabled={selectedQue?.setIndex === 0}
                onClick={selectedQue?.setIndex > 0 && handlePrevChangeQus}
                type="button"
              >
                <i className="fa fa-angle-left mt-1 mr-1" />
                &nbsp;previous
              </button>

              <button
                className="btn btn-primary  align-items-center btn-success"
                disabled={!selectedQue.selAns}
                onClick={selectedQue.selAns && handleChangeQus}
                type="button"
              >
                {QUIZ_LIST.length !== selectedQue?.setIndex + 1
                  ? 'Next'
                  : 'Finish'}
                <i className="fa fa-angle-right ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
