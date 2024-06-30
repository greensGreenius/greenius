/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
/* eslint-disable no-async-promise-executor */
import {
  //   setDoc,
  //   doc,
  //   addDoc,
  getFirestore,
  collection,
  getDocs,
  query
  //   updateDoc,
  //   doc,
  //   where,
  //   getDoc
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { isAuthenticated } from 'services/utilities';
import { DB_NAME, COURSE_ENQUIRY_STATUS } from 'services/constants';
import { Toast } from 'services/toast';
import moment from 'moment';

const handleGetEnrollmentCounr = (candidatePaymentDetails = []) => {
  let weekCount = 0;
  let monthSummary = 0;
  let lastThreeMonthSummary = 0;
  let todayCount = 0;
  const weekStart = moment().startOf('week');
  const today = moment();
  const weekEnd = moment().endOf('week');
  const startOfMonth = moment().startOf('month');
  const endOfMonth = moment().endOf('month');
  const lastThreeStartOfMonth = moment().subtract(2, 'months').startOf('month');
  if (candidatePaymentDetails.length === 0) {
    return { todayCount: 0, weekCount, monthSummary, lastThreeMonthSummary };
  }
  const isTodaySummary = candidatePaymentDetails[0].payDate
    ? moment(candidatePaymentDetails[0].payDate, 'YYYY-MM-DD').isSame(
        today,
        'D'
      )
    : '';

  const isWeekSummary = candidatePaymentDetails[0].payDate
    ? moment(candidatePaymentDetails[0].payDate, 'YYYY-MM-DD').isBetween(
        weekStart,
        weekEnd
      )
    : '';
  const isMonthSummary = candidatePaymentDetails[0].payDate
    ? moment(candidatePaymentDetails[0].payDate, 'YYYY-MM-DD').isBetween(
        startOfMonth,
        endOfMonth
      )
    : '';
  const isLastThreeMonthSummary = candidatePaymentDetails[0].payDate
    ? moment(candidatePaymentDetails[0].payDate, 'YYYY-MM-DD').isBetween(
        lastThreeStartOfMonth,
        endOfMonth
      )
    : '';

  if (isTodaySummary) {
    todayCount++;
  }

  if (isWeekSummary) {
    weekCount++;
  }
  if (isMonthSummary) {
    monthSummary++;
  }
  if (isLastThreeMonthSummary) {
    lastThreeMonthSummary++;
  }
  return { todayCount, weekCount, monthSummary, lastThreeMonthSummary };
};

export const getDashboardCandidateDetails = () => {
  getAuth();
  //   const user = auth.currentUser;
  return new Promise(async (resolve, reject) => {
    try {
      if (isAuthenticated()) {
        // const querySnapshot = getDocs(query(collection(getFirestore(), "user"), where("status", "==", STATUS.DELETED)))

        const querySnapshot = await getDocs(
          query(collection(getFirestore(), DB_NAME?.CANDIDATE))
        );
        const data = [];
        const enrollCounts = {
          weekCount: 0,
          monthSummary: 0,
          lastThreeMonthSummary: 0,
          totalEnrollCount: 0,
          todayCount: 0,
          pendingLeadCount: 0
        };
        console.log(querySnapshot.size);
        querySnapshot.forEach((leadDoc) => {
          // doc.data() is never undefined for query doc snapshots
          const getList = leadDoc?.data()?.billingInfo?.sort((a, b) => {
            // console.log(a, b);
            // return '';
            return new Date(a.payDate) - new Date(b.payDate);
          });

          const resEnrollcounts = handleGetEnrollmentCounr(getList);

          enrollCounts.weekCount += resEnrollcounts.weekCount;
          enrollCounts.todayCount += resEnrollcounts.todayCount;
          enrollCounts.monthSummary += resEnrollcounts.monthSummary;
          enrollCounts.lastThreeMonthSummary +=
            resEnrollcounts.lastThreeMonthSummary;
          if (
            [
              COURSE_ENQUIRY_STATUS.INTERESTED,
              COURSE_ENQUIRY_STATUS.PROCESSING,
              COURSE_ENQUIRY_STATUS.REQUESTED
            ].includes(leadDoc.data().leadstatus)
          ) {
            enrollCounts.pendingLeadCount += 1;
          }

          console.log('getList-----------', leadDoc.data().leadstatus);
          data.push({ ...leadDoc.data(), id: leadDoc.id });
        });
        enrollCounts.totalEnrollCount = querySnapshot.size;
        resolve({ enrollCounts, overAllCandidateList: data });
        //   } else {
      }
    } catch (e) {
      console.log('e-------', e);
      // eslint-disable-next-line no-undef
      const message = error?.message || 'Something went wrong';
      Toast({ message, type: 'error' });
      reject(e);
      console.error('Error adding document: ', e);
    }
  });
};
