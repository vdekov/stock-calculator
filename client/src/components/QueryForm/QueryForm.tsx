import './styles.css';

import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { GetStockHistoryParams, GetStockHistoryResponse } from '@/typings';
import { formatDate, isValidDate } from '@/utils/date';
import { InputDateTime } from '@/components/InputDateTime';
import { ProfitCalculator } from '@/components/ProfitCalculator';
import { axiosErrorHandler } from '@/utils/axios-error-handler';

const todayDate = formatDate(new Date());
const twoMonthsAgoDate = formatDate(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));

export const QueryForm = () => {
  const [fromDateTime, setFromDateTime] = useState<Date>(new Date(Date.now() - 28 * 60 * 60 * 1000));
  const [toDateTime, setToDateTime] = useState<Date>(new Date());
  const [fromDateError, setFromDateError] = useState(false);
  const [toDateError, setToDateError] = useState(false);
  const [queryFormError, setQueryFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stockHistory, setStockHistory] = useState<GetStockHistoryResponse | null>(null);

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
    setStockHistory(null);
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
    setStockHistory(null);
  };

  const validateQueryForm = (fromDateTime: Date, toDateTime: Date) => {
    const now = new Date();
    if (fromDateTime > now) {
      return 'Start date must be no later than now.';
    }

    if (toDateTime > now) {
      return 'End date must be no later than now.';
    }

    if (fromDateTime >= toDateTime) {
      return 'Start date must precede end date.';
    }
  };

  const onCheckButtonClick = async () => {
    console.log('>>> send XHR', { fromDateTime, toDateTime });
    setIsLoading(true);
    try {
      const { data } = await axios.post<
        GetStockHistoryResponse,
        AxiosResponse<GetStockHistoryResponse>,
        GetStockHistoryParams
      >('http://localhost:3000/api/stock/history', {
        from: fromDateTime,
        to: toDateTime,
      });
      setStockHistory(data);
    } catch (e) {
      const { message, error } = axiosErrorHandler(e);
      setQueryFormError(message);

      // Log the specific error in the dev console
      if (error) {
        console.warn(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="query-form">
      <div className={`wrapper-query-form ${isLoading && 'loading'}`}>
        <div>
          <span className="label-input-date-time">From</span>
          <InputDateTime
            defaultValue={fromDateTime}
            minDate={twoMonthsAgoDate}
            maxDate={todayDate}
            isValid={!fromDateError}
            onChange={onFromDateTimeChange}
          />
        </div>
        <div>
          <span className="label-input-date-time">To</span>
          <InputDateTime
            defaultValue={toDateTime}
            minDate={twoMonthsAgoDate}
            maxDate={todayDate}
            isValid={!toDateError}
            onChange={onToDateTimeChange}
          />
        </div>
      </div>
      <div className="invalid-query-form">{queryFormError && `🚨 ${queryFormError}`}</div>
      <ProfitCalculator stockHistory={stockHistory} />
      <button
        className="btn-submit-query-form"
        disabled={isLoading || !!queryFormError}
        onClick={onCheckButtonClick}
        data-testid="btn-submit"
      >
        Check
      </button>
    </div>
  );
};
