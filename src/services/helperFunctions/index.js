import { COURSE_ENQUIRY_STATUS } from 'services/constants';

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

export const getJoinStatus = (status) => {
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
      return 'No User';
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
