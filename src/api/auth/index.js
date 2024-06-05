/* eslint-disable no-async-promise-executor */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
// import { isAuthenticated } from 'services/utilities';
import { EXIST_LOCAL_STORAGE } from 'services/constants';
import { Toast } from 'services/toast';
import { createUser, getUserDetail } from '../user';

export const createAuthentication = (body) => {
  return new Promise(async (resolve, reject) => {
    const { email, password } = body;
    try {
      const userReq = { ...body };
      const auth = getAuth();
      //   if (isAuthenticated()) {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { user } = userCredential;
      userReq.userId = user.uid;
      console.log('userReq createAuthentication----------', userReq);
      const userRes = await createUser(userReq);
      resolve(userRes);
      //   }
    } catch (error) {
      reject(error);
    }
  });
};

export const userSignin = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user: { accessToken, uid } }) => {
        console.log('uid----------->', uid);
        // Signed in
        localStorage.setItem(EXIST_LOCAL_STORAGE.AUTHTOKEN, accessToken);
        resolve(accessToken);
        getUserDetail(uid)
          .then(() => {
            resolve(accessToken);
          })
          .catch((error) => {
            reject(error);

            // ..
          });

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
          Toast({
            type: 'error',
            message: 'Sorry, your password is incorrect. Please try again',
            title: 'Error'
          });
          reject(errorCode);
        } else if (
          ['auth/user-not-found', 'auth/invalid-email'].includes(errorCode)
        ) {
          Toast({
            type: 'error',
            message: 'Sorry, your email is incorrect. Please try again',
            title: 'Error'
          });
          reject(errorCode);
        } else {
          Toast({
            type: 'error',
            message: 'Internal Server Error',
            title: 'Error'
          });
          reject(error);
        }

        // ..
      });
  });
};
