import { GetStockHistoryResponse } from '../../typings';
import { dateAsString } from '../../utils/date';

type Props = {
  investmentAmount: number;
  stockHistory: GetStockHistoryResponse | null;
};

export const ProfitTable: React.FC<Props> = ({ investmentAmount, stockHistory }) => {
  if (!stockHistory) {
    return null;
  }

  const { minDateTime, minPrice, maxDateTime, maxPrice } = stockHistory;
  const sharesAmount = investmentAmount / minPrice;
  const profit = sharesAmount * maxPrice - investmentAmount;

  return (
    <table className="table-summary">
      <tbody>
        <tr>
          <td>Buy at: </td>
          <td>{dateAsString(minDateTime)}</td>
        </tr>
        <tr>
          <td>Sell at: </td>
          <td>{dateAsString(maxDateTime)}</td>
        </tr>
        {!!investmentAmount && (
          <>
            <tr>
              <td>Shares: </td>
              <td>{sharesAmount.toFixed(2)}</td>
            </tr>
            <tr>
              <td>Profit: </td>
              <td>{profit.toFixed(2)}</td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
};
