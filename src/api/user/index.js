/* eslint-disable camelcase */
/* eslint-disable no-async-promise-executor */
import {
  setDoc,
  doc,
  getFirestore,
  collection,
  getDocs,
  query
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// import { isAuthenticated, jwtDecodeDetails } from 'services/utilities';
import { DB_NAME } from 'services/constants';
import { Toast } from 'services/toast';

export const createUser = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      //   if (isAuthenticated()) {
      const userReq = {
        ...body,
        createdBy: { name: `Anvesh babu`, userId: body.userId }
      };
      console.log('userReq createUser----------', userReq);
      //   const { user_id, fname, lname } = jwtDecodeDetails();

      const docRef = await setDoc(
        doc(getFirestore(), DB_NAME?.USER, userReq.userId),
        userReq
      );
      Toast({ message: 'user created successfully' });
      resolve(docRef);
      //   }
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
      //   if (isAuthenticated()) {
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
      //   }
    } catch (e) {
      // eslint-disable-next-line no-undef
      const message = error?.message || 'Something went wrong';
      Toast({ message, type: 'error' });
      reject(e);
      console.error('Error adding document: ', e);
    }
  });
};
