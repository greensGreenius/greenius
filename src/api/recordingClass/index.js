/* eslint-disable camelcase */
/* eslint-disable no-async-promise-executor */
import {
  //   setDoc,
  doc,
  addDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  deleteDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { isAuthenticated, jwtDecodeDetails } from 'services/utilities';
import { DB_NAME } from 'services/constants';
import { Toast } from 'services/toast';

export const createRecordingClass = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        const {
          user_id,
          userObj: { fname, lname }
        } = jwtDecodeDetails();
        const userReq = {
          ...body,
          createdBy: {
            name: `${fname} ${lname}`,
            userId: user_id,
            date: new Date().toISOString()
          }
        };

        //   let {
        //     user_id,
        //     userObj: { first_name, last_name }
        //   } = jwtDecodeDetails();
        const docRef = await addDoc(
          collection(getFirestore(), DB_NAME?.RECORDING_CLASSES),
          userReq
        );
        resolve(docRef);
        Toast({ message: 'Recording class Add successfully' });
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

export const getAllRecordingClasses = () => {
  getAuth();
  //   const user = auth.currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      //   if (isAuthenticated()) {
      // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

      const querySnapshot = await getDocs(
        query(collection(getFirestore(), DB_NAME?.RECORDING_CLASSES))
      );
      const data = [];
      querySnapshot.forEach((courseDoc) => {
        // doc.data() is never undefined for query doc snapshots
        data.push({ ...courseDoc.data(), id: courseDoc.id });
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

export const DeleteCourse = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        const docRef = await deleteDoc(
          doc(getFirestore(), DB_NAME?.COURSE, body)
        );
        resolve(docRef);
        Toast({ message: 'Course successfully Deleted' });
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
