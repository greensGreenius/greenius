import {
  COURSE_ENQUIRY_STATUS,
  LEAD_TYPE,
  USER_TYPE
} from 'services/constants';

export const setStorage = (name = '', data = '') => {
  localStorage.setItem(name, data);
};

export const getStorage = (name = '') => {
  return localStorage.getItem(name);
};

export const removeStorage = (name = '') => {
  if (name) {
    localStorage.removeItem(name);
  } else {
    localStorage.clear();
  }
};

// export const getUserType = (userType) => {
//   switch (userType) {
//     case USER_TYPE.SUPPER_ADMIN:
//       return 'Supper Admin';
//     case USER_TYPE.ADMIN:
//       return 'Admin';
//     case USER_TYPE.CANDIDATE:
//       return 'Candidate';
//     case USER_TYPE.TRAINER:
//       return 'Trainer';
//     default:
//       return 'No User';
//   }
// };

export const getJoinAndLeadStatus = (status) => {
  switch (status) {
    case COURSE_ENQUIRY_STATUS.REQUESTED:
      return 'Requested';
    case COURSE_ENQUIRY_STATUS.NOT_RESPONDING:
      return 'Not Responding';
    case COURSE_ENQUIRY_STATUS.PROCESSING:
      return 'Processing';
    case COURSE_ENQUIRY_STATUS.INTERESTED:
      return 'Interested';
    case COURSE_ENQUIRY_STATUS.NOT_INTERESTED:
      return 'Not Interested';
    case COURSE_ENQUIRY_STATUS.JOINED:
      return 'Joined';
    default:
      return 'No Status';
  }
};

export const getYesNotStatus = (status) => {
  switch (status) {
    case 0:
      return 'No';
    case 1:
      return 'Yes';
    default:
      return 'No Status';
  }
};

export const getLeadType = (type) => {
  switch (type) {
    case LEAD_TYPE.ADMIN:
      return 'Admin';
    case LEAD_TYPE.BRANCH:
      return 'Branch';
    case LEAD_TYPE.TRAINER:
      return 'Trainer';
    case LEAD_TYPE.INSTAGRAM:
      return 'Instagram';
    default:
      return 'No lead type found';
  }
};

export const getIdByLabel = (list = [], id) => {
  try {
    if (list?.length > 0) {
      const res = list?.find(({ value }) => value === id);
      return res.label ? res.label : 'No User';
    }
    return 'No User List';
  } catch (e) {
    return 'some error occurred ';
  }
};

export const getCoursebyIdLabel = (list = [], id = []) => {
  console.log('-----id', id, list);
  try {
    if (list?.length > 0) {
      const res = list.filter(({ value }) => id.includes(value), id);
      console.log(res);
      return res || [];
    }
    return [];
  } catch (e) {
    return [];
  }
};

export const isEmptyObj = (obj = {}) => {
  console.log('obj-----------?', obj);
  return Object?.keys(obj).length === 0;
};

export const convertStringToHTML = (htmlString) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');

  return html.body.toString();
};

export const multySearchObjects = (array = [], searchCriteria) => {
  // eslint-disable-next-line no-debugger
  // debugger;
  try {
    const criteriaKeys = Object.keys(searchCriteria).filter(
      (key) => searchCriteria[key] !== ''
    );

    return array.filter((item) => {
      return criteriaKeys.every((key) => {
        const value = searchCriteria[key];
        if (typeof value === 'string') {
          return item[key]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        return item[key] === value;
      });
    });
  } catch (e) {
    console.log('-------', e);
    return array;
  }
};

export const userGetByRole = (userList, role) => {
  return userList
    .map((data) => {
      if (Array.isArray(role) && role?.includes(data?.userType)) {
        return data;
      }
      if ([role, USER_TYPE.SUPPER_ADMIN]?.includes(data?.userType)) {
        return data;
      }
      return null;
    })
    .filter(Boolean);
};
