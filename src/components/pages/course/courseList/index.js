import { NormalTable } from 'components/common';
import { useEffect, useState } from 'react';
import { getAllCourse } from 'api/course';

export const CourseList = () => {
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
            </tr>
          )}
        />
      </div>
    </div>
  );
};
