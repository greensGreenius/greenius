/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  NormalInput,
  NormalSelect,
  NormalButton,
  NormalCheckbox
} from 'components/common';
import { useState, useRef } from 'react';
import SimpleReactValidator from 'simple-react-validator';
import { batchSchemaModule } from 'services/module';
import {
  BATCH_STATUS_LIST,
  USER_TYPE,
  STATUS,
  WEEK_LIST
} from 'services/constants';
import { userGetByRole } from 'services/helperFunctions';
import { createBatch, updateBatch } from 'api/batch';

export const BatchForm = ({
  userList = [],
  onSucess = () => {},
  editBatchObject = {}
}) => {
  const simpleValidator = useRef(
    new SimpleReactValidator({ className: 'error-message' })
  );
  const [batchFormObject, setBatchFormObject] = useState({
    ...batchSchemaModule,
    ...editBatchObject
  });
  const [isLoadingFrom, setIsLoadingFrom] = useState(false);
  const [, forceUpdate] = useState();

  const handleInputChange = (event) => {
    const {
      target: { value, checked, type, name }
    } = event;

    setBatchFormObject({
      ...batchFormObject,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleleadSubmit = async () => {
    try {
      const formValid = simpleValidator.current.allValid();

      if (formValid) {
        const body = {
          ...batchFormObject
        };
        const trainerIds = batchFormObject.trainerIds.map((trainer) => ({
          ...trainer,
          status: STATUS.DE_ACTIVE,
          eDate: new Date()
        }));
        body.trainerIds = [
          ...trainerIds,
          {
            trainerId: batchFormObject.trainerId,
            sDate: new Date(),
            status: STATUS.ACTIVE
          }
        ];
        delete body.trainerId;
        console.log('body--------', body);
        setIsLoadingFrom(true);
        const res = batchFormObject?.id
          ? await updateBatch(body, batchFormObject.id)
          : await createBatch(body);
        onSucess(body, res);
      } else {
        simpleValidator.current.showMessages();
        forceUpdate(1);
      }
    } catch (e) {
      console.log('e--------', e);
      setIsLoadingFrom(false);
    }
  };

  const handleChangeDate = (event) => {
    const {
      target: { value }
    } = event;

    const day = Number(value);
    const index = batchFormObject.classDays.findIndex((data) => data === day);
    if (index === -1) {
      batchFormObject.classDays.push(day);
    } else {
      batchFormObject.classDays.splice(index, 1);
    }
    setBatchFormObject({ ...batchFormObject });
  };

  return (
    <div className="row">
      <div className="col-md-6">
        <NormalInput
          label="Enter Name"
          onChange={handleInputChange}
          value={batchFormObject.name}
          name="name"
          errorMessage={simpleValidator.current.message(
            'Name',
            batchFormObject.name,
            'required'
          )}
        />
      </div>

      <div className="col-md-6">
        <NormalSelect
          //   multiple
          label="Trainer"
          name="trainerId"
          option={userGetByRole(userList, USER_TYPE.TRAINER)}
          onChange={handleInputChange}
          value={batchFormObject.trainerId}
          errorMessage={simpleValidator.current.message(
            'Trainer',
            batchFormObject.trainerId,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="date"
          label="Enter Start Date"
          onChange={handleInputChange}
          value={batchFormObject.stDate}
          name="stDate"
          errorMessage={simpleValidator.current.message(
            'Start Date',
            batchFormObject.stDate,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="date"
          label="Enter End Date"
          onChange={handleInputChange}
          value={batchFormObject.endDate}
          name="endDate"
          errorMessage={simpleValidator.current.message(
            'End Date',
            batchFormObject.endDate,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="time"
          label="Enter Batch Start Time"
          onChange={handleInputChange}
          value={batchFormObject.batSTime}
          name="batSTime"
          errorMessage={simpleValidator.current.message(
            'Batch Start Time',
            batchFormObject.batSTime,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalInput
          type="time"
          label="Enter Batch End Time"
          onChange={handleInputChange}
          value={batchFormObject.batETime}
          name="batETime"
          errorMessage={simpleValidator.current.message(
            'Batch End Time',
            batchFormObject.batETime,
            'required'
          )}
        />
      </div>
      <div className="col-md-6">
        <NormalSelect
          //   multiple
          label="Batch Status"
          name="status"
          option={BATCH_STATUS_LIST}
          onChange={handleInputChange}
          value={batchFormObject.status}
          errorMessage={simpleValidator.current.message(
            'Batch Status',
            batchFormObject.status,
            'required'
          )}
        />
      </div>
      <div className="col-md-12">
        <div className="mb-3">
          <label className="form-label d-flex">Class Days</label>
          {WEEK_LIST?.map(({ label, value }, i) => (
            <NormalCheckbox
              label={label}
              value={value}
              name="classDays"
              onChange={(e) => handleChangeDate(e, i)}
              checked={batchFormObject.classDays.includes(value)}
            />
          ))}
        </div>
      </div>

      <div className="col-md-12">
        <NormalButton
          className="me-2 btn-danger"
          disabled={isLoadingFrom}
          label="Cancel"
          color="primary"
        />
        <NormalButton
          className="me-2 btn-primary"
          isLoader={isLoadingFrom}
          onClick={handleleadSubmit}
          // eslint-disable-next-line no-constant-condition
          label={`${batchFormObject?.id ? 'Update' : 'Save'} Changes`}
        />
      </div>
    </div>
  );
};
