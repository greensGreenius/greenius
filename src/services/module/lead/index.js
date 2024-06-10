import { YES_NO_STATUS, CLASS_MODE } from 'services/constants';

export const leadSchemaModule = {
  name: '',
  phone: '',
  email: '',
  leadstatus: 0,
  leadFrom: '',
  leadType: 0,
  totfees: 0,
  nextFollUp: '',
  demoBy: '',
  demoStatus: '',
  enqDate: '',
  courses: [],
  branch: '',
  payedfees: 0,
  jobStatus: YES_NO_STATUS.YES,
  projectStatus: YES_NO_STATUS.NO,
  classMode: CLASS_MODE.OFFLINE,
  gitAccountId: '',
  gitAccount: YES_NO_STATUS.NO,
  projectLink: '',
  classStatus: 0,
  batchIds: [],
  comments: [
    {
      userId: '',
      notes: '',
      date: new Date()
    }
  ],
  updatedBy: []
};
