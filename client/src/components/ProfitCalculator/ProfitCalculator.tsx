import './styles.css';

import React, { useState } from 'react';
import { GetStockHistoryResponse } from '@/typings';
import { ProfitTable } from './ProfitTable';
import { InputPriceAmount } from '@/components/InputPriceAmount';

type Props = {
  stockHistory: GetStockHistoryResponse | null;
};

export const ProfitCalculator: React.FC<Props> = ({ stockHistory }) => {
  const [investmentAmount, setInvestmentAmount] = useState<string>('');

  const onInputPriceAmountChange = (value: string) => {
    setInvestmentAmount(value);
  };

  return (
    <div className="wrapper-profit-calculator">
      <InputPriceAmount
        label="💵&nbsp;Investment amount"
        value={investmentAmount}
        onChange={onInputPriceAmountChange}
      />
      <ProfitTable investmentAmount={+investmentAmount} stockHistory={stockHistory} />
    </div>
  );
};
