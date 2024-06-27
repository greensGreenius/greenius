import {
  // GENDER,
  USER_TYPE,
  // CLASS_TYPE,
  SETTLEMENT_TYPE,
  // COURSE_STATUS,
  COURSE_ENQUIRY_STATUS,
  LEAD_TYPE,
  CLASS_MODE,
  CANDIDATE_COURSE_STATUS
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

export const CANDIDATE_CLASS_STATUS_LIST = [
  {
    label: 'yet to start',
    value: CANDIDATE_COURSE_STATUS.YET_TO_START,
    color: 'bg-warning'
  },
  {
    label: 'Processing',
    value: CANDIDATE_COURSE_STATUS.PROCESSING,
    color: 'bg-secondary'
  },
  {
    label: 'Hold',
    value: CANDIDATE_COURSE_STATUS.DELETE,
    color: 'bg-info'
  },
  {
    label: 'Complited',
    value: CANDIDATE_COURSE_STATUS.DELETE,
    color: 'bg-primary'
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
    value: 3
  }
];

export const PAY_BANK_LIST = [
  {
    label: 'Greens',
    value: 1
  },
  {
    label: 'Plotel',
    value: 2
  },
  {
    label: 'Jayashree',
    value: 3
  },
  {
    label: 'Anvesh',
    value: 4
  }
];

export const YES_NO_LIST = [
  {
    label: 'Yes',
    value: 1
  },
  {
    label: 'No',
    value: 0
  }
];

export const BATCH_STATUS_LIST = [
  {
    label: 'Not Yet',
    value: 0
  },
  {
    label: 'Processing',
    value: 1
  },
  {
    label: 'Complited',
    value: 2
  },
  {
    label: 'Hold',
    value: 3
  }
];

export const WEEK_LIST = [
  { value: 0, label: 'Sun' },
  { value: 1, label: 'Mon' },
  { value: 2, label: 'Tue' },
  { value: 3, label: 'Wed' },
  { value: 4, label: 'Thu' },
  { value: 5, label: 'Fri' },
  { value: 6, label: 'Sat' }
];

export const CLASS_MODE_LIST = [
  {
    label: 'Offline',
    value: CLASS_MODE.OFFLINE
  },
  {
    label: 'Online',
    value: CLASS_MODE.ONLINE
  }
];
