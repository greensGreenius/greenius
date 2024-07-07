/* eslint-disable no-async-promise-executor */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
// import { isAuthenticated } from 'services/utilities';
import { EXIST_LOCAL_STORAGE, DB_NAME, USER_TYPE } from 'services/constants';
import { Toast } from 'services/toast';
import {
  getDoc,
  //   doc,
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  doc
} from 'firebase/firestore';
import { generateOTP } from 'services/helperFunctions';
import { candidateSendLoginOtp } from 'api/notification';
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

export const candidateLogin = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExists = await getDocs(
        query(
          collection(getFirestore(), DB_NAME?.CANDIDATE),
          where('email', '==', body.email)
        )
      );
      if (isExists.empty) {
        Toast({
          type: 'warn',
          message: 'Couldn’t find your Greenius Account',
          title: 'warning'
        });
        resolve({
          message: 'Couldn’t find your Greenius Account',
          isError: true
        });
        return;
      }
      let data = {};
      console.log(isExists.size);
      isExists.forEach((leadDoc) => {
        // doc.data() is never undefined for query doc snapshots
        data = { ...leadDoc.data(), id: leadDoc.id, isError: false };
      });

      const otpCode = generateOTP();

      const emialBody = {
        name: data.name,
        subject: 'User Login otp verification',
        email: data?.email,
        otpCode
      };
      await candidateSendLoginOtp(emialBody);
      await updateDoc(doc(getFirestore(), DB_NAME?.CANDIDATE, data.id), {
        isOtpVerified: false,
        otpCode
      });
      resolve(data);
    } catch (e) {
      console.error('Error adding document: ', e);
      // eslint-disable-next-line no-undef
      const message = error?.message || 'Something went wrong';
      Toast({ message, type: 'error' });
      reject(e);
    }
  });
};

export const candidateLoginOtpVerify = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const enquiryDocSnap = await getDoc(
        doc(getFirestore(), DB_NAME?.CANDIDATE, body.candidateId)
      );
      if (enquiryDocSnap.exists()) {
        if (
          enquiryDocSnap.data().otpCode === Number(body.otpCode) &&
          !enquiryDocSnap.data().isOtpVerified
        ) {
          const candidateObj = {
            ...enquiryDocSnap.data(),
            userId: enquiryDocSnap.id,
            userType: USER_TYPE.CANDIDATE
          };
          console.log('enquiryDocSnap.data().id-------', enquiryDocSnap.id);
          candidateObj.isOtpVerified = true;
          delete candidateObj.otpCode;
          await updateDoc(
            doc(getFirestore(), DB_NAME?.CANDIDATE, body.candidateId),
            {
              isOtpVerified: true,
              otpCode: ''
            }
          );

          localStorage.setItem(
            EXIST_LOCAL_STORAGE.CURRENT_USER,
            JSON.stringify(candidateObj)
          );
          resolve(candidateObj);
        } else {
          Toast({
            type: 'warn',
            message: 'Invalid Otp',
            title: 'warning'
          });
          resolve({
            message: 'Invalid Otp',
            isError: true
          });
          // return;
        }
      } else {
        Toast({
          type: 'warn',
          message: 'Couldn’t find your This User id  Account',
          title: 'warning'
        });
        resolve({
          message: 'Couldn’t find your This User id  Account',
          isError: true
        });
      }
    } catch (e) {
      console.error('Error adding document: ', e);
      // eslint-disable-next-line no-undef
      const message = error?.message || 'Something went wrong';
      Toast({ message, type: 'error' });
      reject(e);
    }
  });
};
