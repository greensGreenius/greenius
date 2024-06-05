import {
  // GENDER,
  USER_TYPE,
  // CLASS_TYPE,
  SETTLEMENT_TYPE,
  // COURSE_STATUS,
  COURSE_ENQUIRY_STATUS,
  LEAD_TYPE
} from '../flags';

export const COURSE_ENQUIRY_STATUS_LIST = [
  {
    label: 'Requested',
    value: COURSE_ENQUIRY_STATUS.REQUESTED,
    color: 'bg-warning'
  },
  {
    label: 'Not Responding',
    value: COURSE_ENQUIRY_STATUS.NOT_RESPONDING,
    color: 'bg-secondary'
  },
  {
    label: 'Processing',
    value: COURSE_ENQUIRY_STATUS.PROCESSING,
    color: 'bg-info'
  },
  {
    label: 'Interested',
    value: COURSE_ENQUIRY_STATUS.INTERESTED,
    color: 'bg-primary'
  },
  {
    label: 'Not Interested',
    value: COURSE_ENQUIRY_STATUS.NOT_INTERESTED,
    color: 'bg-danger'
  },
  {
    label: 'Joined',
    value: COURSE_ENQUIRY_STATUS.JOINED,
    color: 'bg-success'
  }
];

export const USER_LIST = [
  {
    label: 'Candidate',
    value: USER_TYPE.CANDIDATE
  },
  {
    label: 'Trainer',
    value: USER_TYPE.TRAINER
  },
  {
    label: 'Branch Admin',
    value: USER_TYPE.BRANCH_ADMIN
  },
  {
    label: 'Admin',
    value: USER_TYPE.ADMIN
  },
  {
    label: 'Supper Admin',
    value: USER_TYPE.SUPPER_ADMIN
  }
];

export const LEAD_TYPE_LIST = [
  {
    label: 'Branch',
    value: LEAD_TYPE.BRANCH
  },
  {
    label: 'Trainer',
    value: LEAD_TYPE.TRAINER
  },
  {
    label: 'Branch Admin',
    value: LEAD_TYPE.BRANCH_ADMIN
  },
  {
    label: 'Instagram',
    value: LEAD_TYPE.INSTAGRAM
  }
];

export const DEMO_STATUS_LIST = [
  {
    label: 'YES',
    value: SETTLEMENT_TYPE.YES
  },
  {
    label: 'NO',
    value: SETTLEMENT_TYPE.NO
  }
];

export const BRANCH_LIST = [
  {
    label: 'T.Nagar',
    value: 1
  },
  {
    label: 'Perumbakkam',
    value: 2
  },
  {
    label: 'Avadi',
    value: 2
  }
];
