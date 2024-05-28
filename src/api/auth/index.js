/* eslint-disable no-async-promise-executor */
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
// import { isAuthenticated } from 'services/utilities';
import { createUser } from '../user';

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
