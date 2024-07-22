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
  updateDoc,
  where,
  deleteDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { isAuthenticated, jwtDecodeDetails } from 'services/utilities';
import { DB_NAME, STATUS } from 'services/constants';
import { Toast } from 'services/toast';

export const createBatch = (body) => {
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
        delete userReq.trainerId;

        //   let {
        //     user_id,
        //     userObj: { first_name, last_name }
        //   } = jwtDecodeDetails();
        const docRef = await addDoc(
          collection(getFirestore(), DB_NAME?.BATCH),
          userReq
        );
        resolve(docRef);
        Toast({ message: 'Batch Add successfully' });
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

export const updateBatch = (body, id) => {
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
        const docRef = await updateDoc(
          doc(getFirestore(), DB_NAME?.BATCH, id),
          body
        );
        resolve(docRef);
        Toast({ message: 'Batch Update successfully' });
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

export const getAllBatch = () => {
  getAuth();
  //   const user = auth.currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      //   if (isAuthenticated()) {
      // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

      const querySnapshot = await getDocs(
        query(collection(getFirestore(), DB_NAME?.BATCH))
      );
      const data = [];
      querySnapshot.forEach(async (courseDoc) => {
        console.log('courseDoc.id--------', courseDoc.id);
        // doc.data() is never undefined for query doc snapshots
        const candidateQuerySnapshot = await getDocs(
          query(
            collection(getFirestore(), DB_NAME?.CANDIDATE),
            where('batchId', 'array-contains', courseDoc.id)
          )
        );
        // candidateQuerySnapshot.forEach(async (batch) => {
        //   console.log({ ...batch.data() });
        // });
        console.log(
          candidateQuerySnapshot.size,
          '----candidateQuerySnapshot.size'
        );
        const trainer = courseDoc
          .data()
          .trainerIds.find(({ status }) => status === STATUS.ACTIVE);
        data.push({
          ...courseDoc.data(),
          trainerId: trainer?.trainerId,
          id: courseDoc.id,
          countCandidate: candidateQuerySnapshot?.size
        });
        console.log(querySnapshot.size, data.length, '---------');
        if (querySnapshot.size === data.length) {
          resolve(data);
        }
      });

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

export const DeleteBatch = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        const docRef = await deleteDoc(
          doc(getFirestore(), DB_NAME?.BATCH, body)
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
