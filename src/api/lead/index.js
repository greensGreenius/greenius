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
  where,
  getDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { isAuthenticated, jwtDecodeDetails } from 'services/utilities';
import { DB_NAME } from 'services/constants';
import { Toast } from 'services/toast';

export const createLead = (body) => {
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
        delete userReq.id;
        console.log('userReq-------', body.phone);

        const isExists = await getDocs(
          query(
            collection(getFirestore(), DB_NAME?.CANDIDATE),
            where('phone', '==', userReq.phone)
          )
        );
        if (!isExists.empty) {
          Toast({
            type: 'warn',
            message: 'candidate is alredy exist',
            title: 'warning'
          });
          resolve('');
          return;
        }
        const docRef = await addDoc(
          collection(getFirestore(), DB_NAME?.CANDIDATE),
          userReq
        );
        resolve(docRef);
        Toast({ message: 'Lead Add successfully' });
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

export const getAllLead = (leadstatus = null) => {
  getAuth();
  //   const user = auth.currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

        const whereIn =
          leadstatus !== -1 ? where('leadstatus', '==', leadstatus) : '';
        console.log('leadstatus.length------>', leadstatus);
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

export const getAllCandidate = (classStatus = null) => {
  getAuth();
  //   const user = auth.currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))
        console.log('classStatus.length------>', classStatus);
        const whereIn =
          classStatus !== -1 ? where('classStatus', '==', classStatus) : '';
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

export const getCandidateById = (id = null) => {
  getAuth();
  //   const user = auth.currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

        const docSnap = await getDoc(
          doc(getFirestore(), DB_NAME?.CANDIDATE, id)
        );
        if (docSnap.exists()) {
          const data = docSnap.data();
          // data.batchId = data.batchIds
          //   ?.filter(({ status }) => status === STATUS.ACTIVE)
          //   .map(({ batchId }) => batchId);
          // console.log('candidate-------', candidate);
          resolve(data);
        } else {
          Toast({ message: 'No such document!', type: 'error' });
          // docSnap.data() will be undefined in this case
          console.log('No such document!');
        }

        //   } else {
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

export const updateLead = (body, id) => {
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
          doc(getFirestore(), DB_NAME.CANDIDATE, id),
          userReq
        );
        resolve(docRef);
        // resolve(docRef);
        Toast({ message: 'Lead Update successfully' });
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

export const updateByCandidateLead = (body, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        const userReq = {
          ...body,
          updatedBy: [
            ...body.updatedBy,
            {
              name: body?.name,
              userId: id,
              date: new Date().toISOString()
            }
          ]
        };
        delete userReq.id;
        console.log('---------', userReq);
        const docRef = await updateDoc(
          doc(getFirestore(), DB_NAME.CANDIDATE, id),
          userReq
        );
        resolve(docRef);
        // resolve(docRef);
        Toast({ message: 'Profile Update successfully' });
      }
    } catch (e) {
      console.log('Error adding document: ', e);
      // eslint-disable-next-line no-undef
      const message = error?.message || 'Something went wrong';
      Toast({ message, type: 'error' });
      reject(e);
      console.error('Error adding document: ', e);
    }
  });
};

export const getBatchIdByCandate = (batchId) => {
  getAuth();
  //   const user = auth.currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      //   if (isAuthenticated()) {
      // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

      const querySnapshot = await getDocs(
        query(
          collection(getFirestore(), DB_NAME?.CANDIDATE),
          where('batchId', 'array-contains', batchId)
        )
      );
      console.log(
        ' candidateQuerySnapshot?.size---------',
        querySnapshot?.size
      );
      const data = [];
      querySnapshot.forEach(async (candidateDoc) => {
        data.push({
          ...candidateDoc.data(),
          id: candidateDoc.id
        });
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
