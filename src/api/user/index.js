/* eslint-disable camelcase */
/* eslint-disable no-async-promise-executor */
import {
  setDoc,
  doc,
  getFirestore,
  collection,
  getDocs,
  getDoc,
  query,
  updateDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { isAuthenticated, jwtDecodeDetails } from 'services/utilities';
import { DB_NAME, EXIST_LOCAL_STORAGE } from 'services/constants';
import { Toast } from 'services/toast';

export const createUser = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        const {
          user_id,
          userObj: { fname, lname }
        } = jwtDecodeDetails();
        const userReq = {
          ...body,
          createdBy: { name: `${fname} ${lname}`, user_id }
        };
        console.log(
          'userReq createUser----------',
          userReq,
          jwtDecodeDetails()
        );

        const docRef = await setDoc(
          doc(getFirestore(), DB_NAME?.USER, userReq.userId),
          userReq
        );
        Toast({ message: 'user created successfully' });
        resolve(docRef);
      }
    } catch (e) {
      console.error('Error adding document: ', e);
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

export const updateUser = (body, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        const {
          user_id,
          userObj: { fname, lname }
        } = jwtDecodeDetails();
        const userReq = {
          ...body,
          updatedBy: [
            ...body.updatedBy,
            {
              name: `${fname} ${lname}`,
              userId: user_id,
              date: new Date().toISOString()
            }
          ]
        };
        delete userReq.id;
        const docRef = await updateDoc(doc(getFirestore(), 'user', id), body);
        resolve(docRef);
        Toast({ message: 'User Update successfully' });
      }
    } catch (e) {
      Toast({
        type: 'error',
        message: 'Internal Server Error',
        title: 'Error'
      });
      console.error('Error adding document: ', e);
      reject(e);
    }
  });
};
