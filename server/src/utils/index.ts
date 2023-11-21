import { Stock } from 'src/modules/stock/entities/stock.entity';

export const calculateMostProfit = (stockData: Stock[]) => {
  let minPrice = stockData[0].price;
  let maxProfit = 0;
  let minPriceIdx = 0;
  let lastMinPriceIdx = 0;
  let maxPriceIdx = 1;

  for (let idx = 1; idx < stockData.length; idx++) {
    if (stockData[idx].price < minPrice) {
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
