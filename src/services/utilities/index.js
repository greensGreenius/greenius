/* eslint-disable consistent-return */
import { jwtDecode } from 'jwt-decode';
import { EXIST_LOCAL_STORAGE, CURRENT_USER } from '../constants';

export const isAuthenticated = () => {
  const accessToken = localStorage.getItem(EXIST_LOCAL_STORAGE.AUTHTOKEN);
  const themeMode = localStorage.getItem(EXIST_LOCAL_STORAGE.THEME_MODE);
  if (accessToken) {
    const jwtDecoded = jwtDecode(accessToken);
    if (new Date() < new Date(jwtDecoded.exp * 1e3)) {
      return true;
    }
    localStorage.clear();
    localStorage.setItem(EXIST_LOCAL_STORAGE.THEME_MODE, themeMode);
    //   Toast({
    //     type: 'danger',
    //     message: 'Your Session has expired',
    //     title: 'Error'
    //   });
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
