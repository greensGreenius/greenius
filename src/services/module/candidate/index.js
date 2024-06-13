import { YES_NO_STATUS, CLASS_MODE } from 'services/constants';
import { leadSchemaModule } from '../lead';

export const candidateSchemaModule = {
  ...leadSchemaModule,
  payedfees: 0,
  jobStatus: YES_NO_STATUS.YES,
  projectStatus: YES_NO_STATUS.NO,
  classMode: CLASS_MODE.OFFLINE,
  gitAccountId: '',
  gitAccount: YES_NO_STATUS.NO,
  projectLink: '',
  batchIds: [],
  classStatus: 0,
  classStart: ''
};
