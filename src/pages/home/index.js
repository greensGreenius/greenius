import { getDashboardCandidateDetails } from 'api/dashboard';
import { useEffect, useState } from 'react';
import { EnrollmentCount, LeadStatusDiscover } from 'components/pages';
import { Normalbreadcrumb } from 'components/common';

export const HomePage = () => {
  const [candidateData, setCandidateDate] = useState({});

  const handleGetDashboardCandidateDetails = async () => {
    const resCandDate = await getDashboardCandidateDetails();
    // resCandDate.map(() => {});
    setCandidateDate(resCandDate);
    console.log('resCandDate--------', JSON.stringify(resCandDate));
  };

  useEffect(() => {
    handleGetDashboardCandidateDetails();
  }, []);

  return (
    <>
      <Normalbreadcrumb isCount={false} title="Home" />
      <div className="row">
        <div className="col-md-6 col-sm-12">
          <EnrollmentCount candidateData={candidateData} />
        </div>
        <div className="col-md-6 col-sm-12">
          <LeadStatusDiscover candidateData={candidateData} />
        </div>
      </div>
    </>
  );
};
