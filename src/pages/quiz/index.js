/* eslint-disable no-nested-ternary */
import { Normalbreadcrumb } from 'components/common';
import { QuizeTestCard, QuizeComplite, GetStartQuize } from 'components/pages';
import { useState } from 'react';

export const QuizPage = () => {
  const [quizeStatus, setQuizeStatus] = useState(0);

  return (
    <>
      <Normalbreadcrumb isCount={false} title="Greenius Quiz" />
      <div className="row">
        <div className="col-12">
          {quizeStatus === 0 ? (
            <GetStartQuize onQuizeStatusChange={setQuizeStatus} />
          ) : quizeStatus === 1 ? (
            <QuizeTestCard onQuizeStatusChange={setQuizeStatus} />
          ) : (
            quizeStatus === 2 && <QuizeComplite />
          )}

          {/* <QuizeTestCard /> */}
          {/* <QuizeComplite/> */}
        </div>
      </div>
    </>
  );
};
