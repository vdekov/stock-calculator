import './styles.css';

import { useState } from 'react';
import { GetStockHistoryResponse } from '@/typings';
import { ProfitTable } from './ProfitTable';

type Props = {
  stockHistory: GetStockHistoryResponse | null;
};

export const ProfitCalculator: React.FC<Props> = ({ stockHistory }) => {
  const [investmentAmount, setInvestmentAmount] = useState<number>(0);

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = +event.target.value;
    if (typeof value === 'number' && isFinite(value)) {
      setInvestmentAmount(value);
    }
  };

  return (
    <div className="wrapper-profit-calculator">
      <label className="label-profit-calculator">
        💵&nbsp;Investment amount
        <input type="number" onChange={onInputChange} data-testid="input-investment" />
      </label>
      <ProfitTable investmentAmount={investmentAmount} stockHistory={stockHistory} />
    </div>
  );
};