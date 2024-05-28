/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-danger */
/* eslint-disable no-undef */
import { NormalTable } from 'components/common';
import { useEffect, useState } from 'react';
import { getAllLead } from 'api/lead';
import { getJoinStatus } from 'services/helperFunctions';
import moment from 'moment';

export const LeadList = () => {
  const [leadList, setLeadList] = useState([]);
  const candidateHeader = [
    {
      lable: 'S.no'
    },
    {
      lable: 'Name'
    },
    {
      lable: 'Phone'
    },
    {
      lable: 'Email'
    },

    {
      lable: 'Status'
    },
    {
      lable: 'Comment'
    },
    {
      lable: 'Next Follow up'
    },
    {
      lable: 'Action'
    }
  ];

  const handleGetCourseList = async () => {
    const leadResList = await getAllLead();
    setLeadList(leadResList);
  };
  useEffect(() => {
    handleGetCourseList();
  }, []);

  return (
    <div className="row mt-2">
      <div className="col-12">
        <NormalTable
          rowData={leadList}
          columnData={candidateHeader}
          renderItem={(data, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{data.name}</td>
              <td>{data.phone}</td>
              <td>{data.email}</td>
              <td>{getJoinStatus(data.status)}</td>
              <td>
                {data.comments.map(({ notes }) => (
                  <span
                    className="notes"
                    dangerouslySetInnerHTML={{ __html: notes }}
                  />
                ))}
              </td>
              <td>{moment(data.nextFollUp).format('DD MMM YYYY')}</td>
              <td />
            </tr>
          )}
        />
      </div>
    </div>
  );
};
