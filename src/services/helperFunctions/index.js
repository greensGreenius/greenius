/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import {
  COURSE_ENQUIRY_STATUS,
  LEAD_TYPE,
  USER_TYPE,
  EXIST_LOCAL_STORAGE
} from 'services/constants';
import moment from 'moment';

export const setStorage = (name = '', data = '') => {
  localStorage.setItem(name, data);
};

export const getStorage = (name = '') => {
  return localStorage.getItem(name);
};

export function generateOTP() {
  // Generate a random 4-digit number
  return Math.floor(1000 + Math.random() * 9000);
}

export const removeStorage = (name = '') => {
  if (name) {
    localStorage.removeItem(name);
  } else {
    localStorage.clear();
  }
};

export const getUserType = (userType) => {
  switch (userType) {
    case USER_TYPE.SUPPER_ADMIN:
      return 'Supper Admin';
    case USER_TYPE.ADMIN:
      return 'Admin';
    case USER_TYPE.CANDIDATE:
      return 'Candidate';
    case USER_TYPE.TRAINER:
      return 'Trainer';
    case USER_TYPE.BRANCH_ADMIN:
      return 'Branch Admin';
    default:
      return 'No User';
  }
};

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

export const getBatchStatus = (status) => {
  switch (status) {
    case 0:
      return 'Not Yet';
    case 1:
      return 'Processing';
    case 2:
      return 'Complited';
    case 3:
      return 'Hold';
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
      if (Array.isArray(id)) {
        return id.map(
          (iss) =>
            list?.find(({ value }) => value === iss)?.label ?? 'No Batch Found'
        );
      }
      const res = list?.find(({ value }) => value === id);
      return res.label ? res.label : 'No User';
    }
    return 'No User List';
  } catch (e) {
    return 'some error occurred ';
  }
};

export const getCoursebyIdLabel = (list = [], id = []) => {
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
  return Object?.keys(obj).length === 0;
};

export const convertStringToHTML = (htmlString) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, 'text/html');

  return html.body.toString();
};

export const multySearchObjects = (array = [], searchCriteria = {}) => {
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
          if (key === 'userName') {
            const name = `${item?.fname} ${item?.lname}`;
            return name?.toString().toLowerCase().includes(value.toLowerCase());
          }
          return item[key]
            ?.toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        }
        if (typeof value === 'number' && Array.isArray(item[key])) {
          return item[key]?.includes(value);
        }
        return item[key] === value;
      });
    });
  } catch (e) {
    console.log('-------', e);
    return array;
  }
};

export const getRandomThreeDigitNumber = () => {
  return `${new Date().getSeconds()}-${Math.floor(Math.random() * 900) + 100}`;
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

export const candidateComplitePer = (batchList, batchId) => {
  try {
    const batch = batchList?.find(({ value }) => value === batchId);
    if (batch) {
      const current = moment();
      const stDate = moment(batch.stDate, 'YYYY-MM-DD');
      const endDate = moment(batch.endDate, 'YYYY-MM-DD');
      const complitedDays = current.diff(stDate, 'days');
      const overDays = endDate.diff(stDate, 'days');
      console.log('diff-------', complitedDays, overDays);

      return Math.round((complitedDays * 100) / overDays);
    }
  } catch (e) {
    return 0;
  }
};

export const batchComplitePer = (batch) => {
  try {
    if (batch) {
      const current = moment();
      const stDate = moment(batch.stDate, 'YYYY-MM-DD');
      const endDate = moment(batch.endDate, 'YYYY-MM-DD');
      const complitedDays = current.diff(stDate, 'days');
      const overDays = endDate.diff(stDate, 'days');
      console.log('diff-------', complitedDays, overDays);

      return Math.round((complitedDays * 100) / overDays);
    }
  } catch (e) {
    return 0;
  }
};

export const getCurentUserTrainerId = () => {
  let curentUser = getStorage(EXIST_LOCAL_STORAGE.CURRENT_USER);
  if (curentUser) {
    curentUser = JSON.parse(curentUser);

    return [USER_TYPE.TRAINER, USER_TYPE.SUPPER_ADMIN].includes(
      curentUser.userType
    )
      ? curentUser.userId
      : '';
  }
  return '';
};

export const letterAvatar = (name = '', size = 60, useColour = true) => {
  const colours = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#ecf0f1',
    '#95a5a6',
    '#f39c12',
    '#d35400',
    '#c0392b',
    '#bdc3c7',
    '#7f8c8d'
  ];

  const nameSplit = name.toUpperCase().split(' ');
  const initials =
    nameSplit.length === 1
      ? nameSplit[0].charAt(0)
      : nameSplit[0].charAt(0) + nameSplit[1].charAt(0);

  const pixelRatio = window.devicePixelRatio || 1;
  size *= pixelRatio;

  const charIndex = initials === '?' ? 72 : initials.charCodeAt(0);
  const colourIndex = (charIndex - 65) % 20;

  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d');

  context.fillStyle = useColour ? colours[colourIndex] : 'transparent';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.font = `${Math.round(canvas.width / 2.2)}px Arial`;
  context.textAlign = 'center';
  context.fillStyle = useColour ? '#FFF' : '#454545';
  context.fillText(initials, size / 2, size / 1.5);

  const dataURI = canvas.toDataURL();

  return dataURI;
};
