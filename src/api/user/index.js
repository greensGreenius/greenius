/* eslint-disable camelcase */
/* eslint-disable no-async-promise-executor */
import {
  setDoc,
  doc,
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { isAuthenticated, jwtDecodeDetails } from 'services/utilities';
import { DB_NAME, EXIST_LOCAL_STORAGE } from 'services/constants';
import { Toast } from 'services/toast';

export const createUser = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        const { userId, fname, lname } = jwtDecodeDetails();
        const userReq = {
          ...body,
          createdBy: { name: `${fname} ${lname}`, userId }
        };
        console.log('userReq createUser----------', userReq);

        const docRef = await setDoc(
          doc(getFirestore(), DB_NAME?.USER, userReq.userId),
          userReq
        );
        Toast({ message: 'user created successfully' });
        resolve(docRef);
      }
    } catch (e) {
      // eslint-disable-next-line no-undef
      const message = error?.message || 'Something went wrong';
      Toast({ message, type: 'error' });
      reject(e);
      console.error('Error adding document: ', e);
    }
  });
};

export const getAllUser = () => {
  getAuth();
  //   const user = auth.currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

        const querySnapshot = await getDocs(
          query(collection(getFirestore(), 'user'))
        );
        const data = [];
        querySnapshot.forEach((userDoc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...userDoc.data(), id: userDoc.id });
        });
        resolve(data);
        //   } else {
      }
    } catch (e) {
      // eslint-disable-next-line no-undef
      const message = error?.message || 'Something went wrong';
      Toast({ message, type: 'error' });
      reject(e);
      console.error('Error adding document: ', e);
    }
  });
};

export const getUserDetail = (body) => {
  getAuth();
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

        const docSnap = await getDoc(doc(getFirestore(), 'user', body));
        if (docSnap.exists()) {
          localStorage.setItem(
            EXIST_LOCAL_STORAGE.CURRENT_USER,
            JSON.stringify({ ...docSnap.data(), id: docSnap.id })
          );
          resolve(docSnap.data());
        } else {
          Toast({
            type: 'error',
            message:
              "This Avatar garments account doesh't exist. Enter a different account",
            title: 'Error'
          });
          reject();
          // doc.data() will be undefined in this case
        }
      }

      // } else {

      // }
    } catch (e) {
      Toast({
        type: 'error',
        message: 'Internal Server Error',
        title: 'Error'
      });
      reject(e);
      console.error('Error adding document: ', e);
    }
  });
};
