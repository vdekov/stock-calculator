import { useState } from 'react';
import axios from 'axios';
import { InputDateTime } from '../InputDateTime';
import { formatDate, isValidDate } from '../../utils/date';
import { axiosErrorHandler } from '../../utils/axios-error-handler';
import './styles.css';

const todayDate = formatDate(new Date());
const yesterdayDate = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
const twoMonthsAgoDate = formatDate(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));

export const QueryForm = () => {
  const [fromDateTime, setFromDateTime] = useState<Date>(new Date(`${yesterdayDate} 09:00:00`));
  const [toDateTime, setToDateTime] = useState<Date>(new Date());
  const [fromDateError, setFromDateError] = useState('');
  const [toDateError, setToDateError] = useState('');
  const [queryFormError, setQueryFormError] = useState('');

  const onFromDateTimeChange = (date: Date) => {
    console.log({ date, valid: isValidDate(date) });

    if (!isValidDate(date)) {
      setFromDateError('Invalid date');
      return;
    }

    const validationMessage = validateQueryForm(date, toDateTime);

    if (validationMessage) {
      setQueryFormError(validationMessage);
      return;
    }

    setFromDateTime(date);
    setFromDateError('');
    setQueryFormError('');
  };

  const onToDateTimeChange = (date: Date) => {
    console.log({ date, valid: isValidDate(date) });

    if (!isValidDate(date)) {
      setToDateError('Invalid date');
      return;
    }

    const validationMessage = validateQueryForm(fromDateTime, date);

    if (validationMessage) {
      setQueryFormError(validationMessage);
      return;
    }

    setToDateTime(date);
    setToDateError('');
    setQueryFormError('');
  };

  const validateQueryForm = (fromDateTime: Date, toDateTime: Date) => {
    if (fromDateTime >= toDateTime) {
      return 'Start date must precede end date.';
    }

    const now = new Date();
    if (fromDateTime > now) {
      return 'Start date must be no later than now.';
    }

    if (toDateTime > now) {
      return 'End date must be no later than now.';
    }
  };

  const onCheckButtonClick = async () => {
    console.log('>>> send XHR', { fromDateTime, toDateTime });
    try {
      const response = await axios.post('http://localhost:3000/api/share/1/history', {
        from: fromDateTime,
        to: toDateTime,
      });
      console.log(response);
    } catch (e) {
      const { message, error } = axiosErrorHandler(e);
      setQueryFormError(message);

      // Log the specific error in the dev console
      if (error) {
        console.warn(error);
      }
    }
  };

  return (
    <>
      <div>
        <InputDateTime
          defaultValue={fromDateTime}
          minDate={twoMonthsAgoDate}
          maxDate={todayDate}
          errorMsg={fromDateError}
          onChange={onFromDateTimeChange}
        />
        <InputDateTime
          defaultValue={toDateTime}
          minDate={twoMonthsAgoDate}
          maxDate={todayDate}
          errorMsg={toDateError}
          onChange={onToDateTimeChange}
        />
      </div>
      <button disabled={!!fromDateError || !!toDateError || !!queryFormError} onClick={onCheckButtonClick}>
        Check
      </button>
      {!!queryFormError && <div className="invalid-query-form">{queryFormError}</div>}
    </>
  );
};
