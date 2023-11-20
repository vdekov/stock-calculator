import './styles.css';

import React, { useState } from 'react';
import { GetStockHistoryResponse } from '@/typings';
import { ProfitTable } from './ProfitTable';

type Props = {
  stockHistory: GetStockHistoryResponse | null;
};

export const ProfitCalculator: React.FC<Props> = ({ stockHistory }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;

    if (typeof value === 'number' && isFinite(value) && value >= 0) {
      setInvestmentAmount(value);
    }
  };

  const onInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Do not allow negagitve numbers
    if (event.key === '-') {
      event.preventDefault();
    }
  };

  return (
    <div className="wrapper-profit-calculator">
      <label className="label-profit-calculator">
        💵&nbsp;Investment amount
        <input
          type="number"
          value={investmentAmount ? investmentAmount : ''}
          min="0"
          onChange={onInputChange}
          onKeyDown={onInputKeyDown}
          data-testid="input-investment"
        />
      </label>
      <ProfitTable investmentAmount={investmentAmount} stockHistory={stockHistory} />
    </div>
  );
};
