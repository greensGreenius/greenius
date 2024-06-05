/* eslint-disable camelcase */
/* eslint-disable no-async-promise-executor */
import {
  //   setDoc,
  //   doc,
  addDoc,
  getFirestore,
  collection,
  getDocs,
  query,
  updateDoc,
  doc,
  where
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { isAuthenticated, jwtDecodeDetails } from 'services/utilities';
import { DB_NAME } from 'services/constants';
import { Toast } from 'services/toast';

export const createLead = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        const { userId, fname, lname } = jwtDecodeDetails();
        const userReq = {
          ...body,
          createdBy: { name: `${fname} ${lname}`, userId }
        };
        delete userReq.id;
        const docRef = await addDoc(
          collection(getFirestore(), DB_NAME?.CANDIDATE),
          userReq
        );
        resolve(docRef);
        Toast({ message: 'Lead Add successfully' });
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

export const getAllLead = (leadstatus = null) => {
  getAuth();
  //   const user = auth.currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))
        console.log('leadstatus.length------>', leadstatus);
        const whereIn =
          leadstatus > 0 ? where('leadstatus', '==', leadstatus) : '';
        const querySnapshot = await getDocs(
          query(collection(getFirestore(), DB_NAME?.CANDIDATE), whereIn)
        );
        const data = [];
        console.log(querySnapshot.size);
        querySnapshot.forEach((leadDoc) => {
          // doc.data() is never undefined for query doc snapshots
          data.push({ ...leadDoc.data(), id: leadDoc.id });
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

export const updateLead = (body, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        const userReq = {
          ...body,
          updatedBy: [
            ...body.updatedBy,
            {
              name: `Anvesh babu`,
              userId: '001',
              date: new Date().toISOString()
            }
          ]
        };
        delete userReq.id;

        //   let {
        //     user_id,
        //     userObj: { first_name, last_name }
        //   } = jwtDecodeDetails();
        const docRef = await updateDoc(
          doc(getFirestore(), DB_NAME.CANDIDATE, id),
          userReq
        );
        resolve(docRef);
        resolve(docRef);
        Toast({ message: 'Lead Update successfully' });
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
