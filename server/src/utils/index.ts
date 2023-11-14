export const findMostProfitableRange = (stockData) => {
  if (stockData.length < 2) {
    return null; // Not enough data to calculate profit
  }

  let minPriceIndex = 0;
  let maxProfit = 0;
  let buyTimestamp = 0;
  let buyPrice = 0;
  let sellTimestamp = 0;
  let sellPrice = 0;

  for (let i = 1; i < stockData.length; i++) {
    const currentPrice = stockData[i].price;
    const minPrice = stockData[minPriceIndex].price;

    if (currentPrice - minPrice > maxProfit) {
      maxProfit = currentPrice - minPrice;
      buyTimestamp = stockData[minPriceIndex].timestamp;
      buyPrice = minPrice;
      sellTimestamp = stockData[i].timestamp;
      sellPrice = currentPrice;
    }

    while (i - minPriceIndex >= 1) {
      minPriceIndex++; // Adjust the window size dynamically
    }
  }

  return {
    buyTimestamp,
    buyPrice,
    sellTimestamp,
    sellPrice,
    // maxProfit,
  };
};
