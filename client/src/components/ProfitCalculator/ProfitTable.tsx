import { GetStockHistoryResponse } from '@/typings';
import { formatNumber } from '@/utils';
import { dateAsString } from '@/utils/date';

type Props = {
  investmentAmount: number;
  stockHistory: GetStockHistoryResponse | null;
};

export const ProfitTable: React.FC<Props> = ({ investmentAmount, stockHistory }) => {
  if (!stockHistory) {
    return null;
  }

  const { minDateTime, minPrice, maxDateTime, maxPrice } = stockHistory;

  // Show a notice box when there is no any profit (i.e. max and min prices are equal)
  if (minPrice === maxPrice) {
    return <div>❗️ There is no profit available for the specified criteria.</div>;
  }

  const sharesAmount = investmentAmount / minPrice;
  const profit = sharesAmount * maxPrice - investmentAmount;

  return (
    <table className="table-summary">
      <tbody>
        <tr>
          <td>Buy at:</td>
          <td>{dateAsString(minDateTime)}</td>
        </tr>
        <tr>
          <td>Sell at:</td>
          <td>{dateAsString(maxDateTime)}</td>
        </tr>
        {!!investmentAmount && (
          <>
            <tr>
              <td>Shares:</td>
              <td>{formatNumber(+sharesAmount.toFixed(6))}</td>
            </tr>
            <tr>
              <td>Profit:</td>
              <td>{formatNumber(+profit.toFixed(2))}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};
