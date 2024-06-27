import { NormalTable } from 'components/common';
import { useEffect, useState } from 'react';
import { getAllCourse, DeleteCourse } from 'api/course';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

export const CourseList = ({ onEdit = () => {} }) => {
  const [courseList, setCourseList] = useState([]);
  const courseHeader = [
    {
      lable: 'S.no'
    },
    {
      lable: 'Course'
    },
    {
      lable: 'Price'
    },
    {
      lable: 'Action'
    }
  ];

  const handleGetCourseList = async () => {
    const courseResList = await getAllCourse();
    setCourseList(courseResList);
    console.log('userResList--------->', courseResList);
  };
  useEffect(() => {
    handleGetCourseList();
  }, []);

  const handleDelete = (data, i) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        await DeleteCourse(data.id);
        courseList.splice(i, 1);
        setCourseList([...courseList]);
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success'
        });
      }
    });
  };

  return (
    <div className="row mt-2">
      <div className="col-12">
        <NormalTable
          rowData={courseList}
          columnData={courseHeader}
          renderItem={(data, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>{data.name}</td>
              <td>{data.price}</td>
              <td>
                <IconButton color="success" onClick={() => onEdit(data)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(data, i)}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          )}
        />
      </div>
    </div>
  );
};
