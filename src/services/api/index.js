import { axiosInstance } from '../utilities';
import { EXIST_LOCAL_STORAGE } from '../constants';

// local api base url
const getMicroServiceURL = (baseURL = '') => {
  switch (baseURL) {
    case 'normal':
      return 'https://greenius-notification-engine.vercel.app/api/'; // need change dev
    case 'notification':
      return 'https://greenius-notification-engine.vercel.app/api/';
    case 'countrystatecity':
      return 'https://api.countrystatecity.in/v1/';
    case 'normal-post':
      return 'http://13.234.224.23:9500/api';
    default:
      return 'http://13.234.224.23:9500/api';
  }
};

const statusHelper = (status, data) => {
  if (status) {
    return {
      status: data.status,
      ...data.data
    };
  }
  return data?.data ? data?.data : data;
};

export const apiCall = async (payload) => {
  console.log('apiCall-------------', payload);
  const {
    method = 'get',
    api = '',
    prefixUrl,
    body,
    status = false,
    baseURL = 'normal'
  } = payload;

  return await new Promise((resolve, reject) => {
    axiosInstance.defaults.headers.common.Authorization = localStorage.getItem(
      EXIST_LOCAL_STORAGE.AUTHTOKEN
    );
    console.log(
      'apiCall url-------------',
      `${getMicroServiceURL(baseURL) + api + (prefixUrl || '')}`
    );
    axiosInstance[method](
      `${getMicroServiceURL(baseURL) + api + (prefixUrl || '')}`,
      body || ''
    )
      .then((response) => {
        resolve(statusHelper(status, response));
      })
      .catch((error) => {
        try {
          if (error.response) {
            reject(statusHelper(status, error.response));
          } else {
            reject(statusHelper(status, error.response));
          }
        } catch (err) {
          reject(err);
        }
      });
  });
};
