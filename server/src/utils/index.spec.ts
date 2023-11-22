import { Stock } from 'src/entities/stock.entity';
import { calculateMostProfit } from '.';

describe('Utilities', () => {
  describe('calculateMostProfit() helper', () => {
    it('should be able to provide the most profitable period of time', () => {
      const mockedStockData: Stock[] = [
        { id: 1, price: 70.13, timestamp: 1699178117 },
        { id: 2, price: 84.65, timestamp: 1699178118 },
        { id: 3, price: 67.7, timestamp: 1699178119 },
        { id: 4, price: 51.29, timestamp: 1699178120 },
        { id: 5, price: 96.25, timestamp: 1699178121 },
        { id: 6, price: 59.99, timestamp: 1699178122 },
      ];

      expect(calculateMostProfit(mockedStockData)).toEqual({
        minTimestamp: 1699178120,
        minPrice: 51.29,
        maxTimestamp: 1699178121,
        maxPrice: 96.25,
      });
    });

    it('should return the shortest and earliest period', () => {
      const mockedStockData: Stock[] = [
        { id: 1, price: 1, timestamp: 1699178117 },
        { id: 2, price: 1, timestamp: 1699178118 },
        { id: 3, price: 2, timestamp: 1699178119 },
        { id: 4, price: 10, timestamp: 1699178120 },
        { id: 5, price: 1, timestamp: 1699178121 },
        { id: 6, price: 10, timestamp: 1699178122 },
      ];

      expect(calculateMostProfit(mockedStockData)).toEqual({
        minTimestamp: 1699178118,
        minPrice: 1,
        maxTimestamp: 1699178120,
        maxPrice: 10,
      });
    });

    it('should exclude price=0 from the calculations', () => {
      const mockedStockData: Stock[] = [
        { id: 1, price: 1, timestamp: 1699178117 },
        { id: 2, price: 0, timestamp: 1699178118 },
        { id: 3, price: 2, timestamp: 1699178119 },
        { id: 4, price: 10, timestamp: 1699178120 },
        { id: 5, price: 10, timestamp: 1699178121 },
        { id: 6, price: 2, timestamp: 1699178122 },
      ];

      expect(calculateMostProfit(mockedStockData)).toEqual({
        minTimestamp: 1699178117,
        minPrice: 1,
        maxTimestamp: 1699178120,
        maxPrice: 10,
      });
    });
  });
});
