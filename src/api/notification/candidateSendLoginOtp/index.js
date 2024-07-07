import { apiCall } from 'services/api';
import { notification } from 'services/apiVariables';

export const candidateSendLoginOtp = (body) => {
  return new Promise((resolve, reject) => {
    apiCall({ ...notification.candidateSendLoginOtp, body })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
