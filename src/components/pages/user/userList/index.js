import { NormalTable } from 'components/common';
import { useEffect, useState } from 'react';
import { getAllUser } from 'api/user';

export const UserList = () => {
  const [userList, setUserList] = useState([]);
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
      lable: 'User Type'
    },
    {
      lable: 'Action'
    }
  ];
  const handleGetUserList = async () => {
    const userResList = await getAllUser();
    setUserList(userResList);
    console.log('userResList--------->', userResList);
  };

  useEffect(() => {
    handleGetUserList();
  }, []);

  return (
    <div className="row mt-2">
      <div className="col-12">
        <NormalTable
          rowData={userList}
          columnData={candidateHeader}
          renderItem={(data, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>
                {data.fname} {data.lname}
              </td>
              <td>{data.phone}</td>
              <td>{data.email}</td>
              <td>{data.userType}</td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};
