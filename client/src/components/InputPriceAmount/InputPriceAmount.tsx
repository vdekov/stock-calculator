import './styles.css';

import { useEffect, useState } from 'react';
import {
  clearInputErrorDelay,
  inputInvestmentPattern,
  inputInvestmentPlaceholder,
  inputMaxInvestment,
} from './constants';
import { formatNumber } from '@/utils';

type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  maxPriceAmount?: number;
  placeholder?: string;
};

export const InputPriceAmount: React.FC<Props> = ({
  label,
  value,
  onChange,
  maxPriceAmount = inputMaxInvestment,
  placeholder = inputInvestmentPlaceholder,
}) => {
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    if (!inputError) {
      return;
    }

    const timeoutId = setTimeout(() => setInputError(''), clearInputErrorDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [inputError]);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    if (inputInvestmentPattern.test(value) || value === '') {
      if (+value > maxPriceAmount) {
        setInputError(`❗️ The maximum amount allowed is ${formatNumber(maxPriceAmount)}`);
        return;
      }

      setInputError('');
      onChange(value);
    }
  };

  return (
    <>
      <label className="label-price-amount">
        {label}
        <input
          type="text"
          pattern="[0-9]*"
          placeholder={placeholder}
          inputMode="decimal"
          value={value}
          onChange={onInputChange}
          data-testid="input-price-amount"
        />
      </label>
      <div className={`notice-price-amount ${inputError ? 'visible' : ''}`}>{inputError}</div>
    </>
  );
};
