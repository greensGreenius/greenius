import { NormalTable } from 'components/common';
import { getUserType, multySearchObjects } from 'services/helperFunctions';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';

export const UserList = ({
  userList = [],
  isUserLoading = false,
  filterObject = '',
  onEdit = () => {}
}) => {
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

  return (
    <div className="row mt-2">
      <div className="col-12">
        <NormalTable
          rowData={multySearchObjects(userList, filterObject)}
          isLoader={isUserLoading}
          columnData={candidateHeader}
          renderItem={(data, i) => (
            <tr>
              <td>{i + 1}</td>
              <td>
                {data.fname} {data.lname}
              </td>
              <td>{data.phone}</td>
              <td>{data.email}</td>
              <td>{getUserType(data.userType)}</td>
              <td>
                <IconButton color="success" onClick={() => onEdit(data)}>
                  <EditIcon />
                </IconButton>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};
