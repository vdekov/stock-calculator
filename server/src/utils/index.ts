import { Stock } from 'src/entities/stock.entity';

export const calculateMostProfit = (stockData: Stock[]) => {
  let minPrice = Number.MAX_VALUE;
  let maxProfit = 0;
  let minPriceIdx = 0;
  let lastMinPriceIdx = 0;
  let maxPriceIdx = 1;

  for (let idx = 0; idx < stockData.length; idx++) {
    // Intentinally skip the records with price=0 since they can be considered as a invalid price data.
    if (stockData[idx].price == 0) {
      continue;
    }

    // Use <= in order to get the latest record with a minimal price
    if (stockData[idx].price <= minPrice) {
      minPrice = stockData[idx].price;
      lastMinPriceIdx = idx;
    } else if (stockData[idx].price - minPrice > maxProfit) {
      maxProfit = stockData[idx].price - minPrice;
      minPriceIdx = lastMinPriceIdx;
      maxPriceIdx = idx;
    }
  }

  return {
    minTimestamp: stockData[minPriceIdx].timestamp,
    minPrice: stockData[minPriceIdx].price,
    maxTimestamp: stockData[maxPriceIdx].timestamp,
    maxPrice: stockData[maxPriceIdx].price,
  };
};
