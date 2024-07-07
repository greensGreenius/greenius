/* eslint-disable consistent-return */
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Toast } from 'services/toast';
import { EXIST_LOCAL_STORAGE, CURRENT_USER, USER_TYPE } from '../constants';

export const isAuthenticated = () => {
  const accessToken = localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN);
  const themeMode = localStorage.getItem(EXIST_LOCAL_STORAGE.THEME_MODE);
  let currentUserDetails = localStorage.getItem(
    EXIST_LOCAL_STORAGE.CURRENT_USER
  );
  currentUserDetails = JSON.parse(currentUserDetails);
  if (currentUserDetails?.userType === USER_TYPE.CANDIDATE) {
    return true;
  }
  if (accessToken) {
    const jwtDecoded = jwtDecode(accessToken);
    if (new Date() < new Date(jwtDecoded.exp * 1e3)) {
      return true;
    }
    localStorage.clear();
    localStorage.setItem(EXIST_LOCAL_STORAGE.THEME_MODE, themeMode);
    Toast({
      type: 'error',
      message: 'Your Session has expired',
      title: 'Error'
    });
    console.error('session expired');
    //   history.push('/');
    return false;
  }
  localStorage.clear();
  localStorage.setItem(EXIST_LOCAL_STORAGE.THEME_MODE, themeMode);
  // Toast({
  //   type: 'danger',
  //   message: 'Your Session has expired',
  //   title: 'Error'
  // });
  console.error('session expired');
  // history.push('/');
};

// eslint-disable-next-line consistent-return
export const jwtDecodeDetails = () => {
  const accessToken = localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN);
  if (accessToken) {
    const userObj = JSON.parse(localStorage.getItem(CURRENT_USER));
    return { ...jwtDecode(accessToken), userObj };
  }
  console.error('Jwd null');
};

export const axiosInstance = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': '*'
  }
});
