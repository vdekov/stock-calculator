import './styles.css';

import { useState } from 'react';
import axios from 'axios';
import { InputDateTime } from '../InputDateTime';
import { formatDate, isValidDate } from '../../utils/date';
import { axiosErrorHandler } from '../../utils/axios-error-handler';

const todayDate = formatDate(new Date());
const twoMonthsAgoDate = formatDate(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));

// TODO: Add loading spinner
export const QueryForm = () => {
  const [fromDateTime, setFromDateTime] = useState<Date>(new Date(Date.now() - 28 * 60 * 60 * 1000));
  const [toDateTime, setToDateTime] = useState<Date>(new Date());
  const [fromDateError, setFromDateError] = useState(false);
  const [toDateError, setToDateError] = useState(false);
  const [queryFormError, setQueryFormError] = useState('');

  const onFromDateTimeChange = (date: Date) => {
    setFromDateError(false);
    setQueryFormError('');
    console.log({ date, valid: isValidDate(date) });

    if (!isValidDate(date)) {
      setFromDateError(true);
      setQueryFormError('Invalid start date');
      return;
    }

    const validationMessage = validateQueryForm(date, toDateTime);

    if (validationMessage) {
      setQueryFormError(validationMessage);
      return;
    }

    setFromDateTime(date);
  };

  const onToDateTimeChange = (date: Date) => {
    setToDateError(false);
    setQueryFormError('');
    console.log({ date, valid: isValidDate(date) });

    if (!isValidDate(date)) {
      setToDateError(true);
      setQueryFormError('Invalid end date');
      return;
    }

    const validationMessage = validateQueryForm(fromDateTime, date);

    if (validationMessage) {
      setQueryFormError(validationMessage);
      return;
    }

    setToDateTime(date);
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
      const response = await axios.post('http://localhost:3000/api/stock/history', {
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
      <div className="wrapper-query-form">
        <InputDateTime
          defaultValue={fromDateTime}
          minDate={twoMonthsAgoDate}
          maxDate={todayDate}
          isValid={!fromDateError}
          onChange={onFromDateTimeChange}
        />
        <InputDateTime
          defaultValue={toDateTime}
          minDate={twoMonthsAgoDate}
          maxDate={todayDate}
          isValid={!toDateError}
          onChange={onToDateTimeChange}
        />
      </div>
      <div className="invalid-query-form">{queryFormError && `🚨 ${queryFormError}`}</div>
      <button disabled={!!queryFormError} onClick={onCheckButtonClick}>
        Check
      </button>
    </>
  );
};
