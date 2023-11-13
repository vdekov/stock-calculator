import { useState } from 'react';
import axios from 'axios';
import { InputDateTime } from './InputDateTime/InputDateTime';
import { formatDate } from '../utils/date';

const todayDate = formatDate(new Date());
const yesterdayDate = formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000));
const twoMonthsAgoDate = formatDate(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));

export const QueryForm = () => {
  // TODO: Set default date time
  const [fromDateTime, setFromDateTime] = useState<Date>();
  const [toDateTime, setToDateTime] = useState<Date>();

  const onFromDateTimeChange = (date: Date) => {
    console.log({ date });
    setFromDateTime(date);
  };
  const onToDateTimeChange = (date: Date) => {
    console.log({ date });
    setToDateTime(date);
  };

  const onCheckButtonClick = () => {
    // TODO: Add client-side validation
    console.log('>>> send XHR', { fromDateTime, toDateTime });

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
          onChange={onFromDateTimeChange}
        />
        <InputDateTime
          initialDate={todayDate}
          minDate={twoMonthsAgoDate}
          maxDate={todayDate}
          initialTime="18:00:00"
          onChange={onToDateTimeChange}
        />
      </div>
      <button onClick={onCheckButtonClick}>Check</button>
    </>
  );
};
