import { useState } from 'react';
import axios from 'axios';
import { InputDateTime } from './InputDateTime/InputDateTime';
import { formatDate, isValidDate } from '../utils/date';

const todayDate = formatDate(new Date());
const yesterdayDate = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
const twoMonthsAgoDate = formatDate(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));

export const QueryForm = () => {
  // TODO: Set default date time
  const [fromDateTime, setFromDateTime] = useState<Date>();
  const [toDateTime, setToDateTime] = useState<Date>();
  const [fromDateError, setFromDateError] = useState('');
  const [toDateError, setToDateError] = useState('');

  const onFromDateTimeChange = (date: Date) => {
    console.log({ date, valid: isValidDate(date) });

    if (!isValidDate(date)) {
      setFromDateError('Invalid date');
      return;
    }
    setFromDateTime(date);
    setFromDateError('');
  };
  const onToDateTimeChange = (date: Date) => {
    console.log({ date, valid: isValidDate(date) });

    if (!isValidDate(date)) {
      setToDateError('Invalid date');
      return;
    }
    setToDateTime(date);
    setToDateError('');
  };

  const onCheckButtonClick = () => {
    // TODO: Add client-side validation
    // - from should be before to
    console.log('>>> send XHR', { fromDateTime, toDateTime });
    // if (fromDateTime >= toDateTime) {}

    // TODO: Add server errors validation
    axios
      .post('http://localhost:3000/api/share/1/history', {
        from: fromDateTime,
        to: toDateTime,
      })
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <div>
        <InputDateTime
          initialDate={yesterdayDate}
          minDate={twoMonthsAgoDate}
          maxDate={todayDate}
          initialTime="09:00:00"
          errorMsg={fromDateError}
          onChange={onFromDateTimeChange}
        />
        <InputDateTime
          initialDate={todayDate}
          minDate={twoMonthsAgoDate}
          maxDate={todayDate}
          initialTime="18:00:00"
          errorMsg={toDateError}
          onChange={onToDateTimeChange}
        />
      </div>
      <button disabled={!!fromDateError || !!toDateError} onClick={onCheckButtonClick}>
        Check
      </button>
    </>
  );
};
