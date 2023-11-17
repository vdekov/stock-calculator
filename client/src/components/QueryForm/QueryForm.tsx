import './styles.css';

import { useCallback, useState } from 'react';
import { GetStockHistoryResponse } from '@/typings';
import { formatDate, isValidDate, validateDates } from '@/utils/date';
import { InputDateTime } from '@/components/InputDateTime';
import { ProfitCalculator } from '@/components/ProfitCalculator';
import { ERROR_MESSAGES } from '@/utils/constants';
import { getStockHistory } from '@/api';

export const QueryForm = () => {
  const [fromDateTime, setFromDateTime] = useState<Date>(new Date(Date.now() - 28 * 60 * 60 * 1000));
  const [toDateTime, setToDateTime] = useState<Date>(new Date());
  const [fromDateError, setFromDateError] = useState(false);
  const [toDateError, setToDateError] = useState(false);
  const [queryFormError, setQueryFormError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stockHistory, setStockHistory] = useState<GetStockHistoryResponse | null>(null);

  const todayDate = formatDate(new Date());
  const twoMonthsAgoDate = formatDate(new Date(Date.now() - 60 * 24 * 60 * 60 * 1000));

  const resetForm = useCallback(() => {
    setFromDateError(false);
    setToDateError(false);
    setQueryFormError('');
    setStockHistory(null);
  }, []);

  const onFromDateTimeChange = (date: Date) => {
    resetForm();

    if (!isValidDate(date)) {
      setFromDateError(true);
      setQueryFormError(ERROR_MESSAGES.INVALID_START_DATE);
      return;
    }

    const validationMessage = validateDates(date, toDateTime);

    if (validationMessage) {
      setQueryFormError(validationMessage);
      return;
    }

    setFromDateTime(date);
  };

  const onToDateTimeChange = (date: Date) => {
    resetForm();

    if (!isValidDate(date)) {
      setToDateError(true);
      setQueryFormError(ERROR_MESSAGES.INVALID_END_DATE);
      return;
    }

    const validationMessage = validateDates(fromDateTime, date);

    if (validationMessage) {
      setQueryFormError(validationMessage);
      return;
    }

    setToDateTime(date);
  };

  const onCheckButtonClick = async () => {
    setIsLoading(true);

    try {
      const stockHistory = await getStockHistory(fromDateTime, toDateTime);
      setStockHistory(stockHistory);
    } catch (e) {
      setQueryFormError(e as string);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="query-form">
      <div className={`wrapper-query-form ${isLoading ? 'loading' : ''}`}>
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
