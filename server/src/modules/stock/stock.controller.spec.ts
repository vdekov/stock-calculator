import { Test, TestingModule } from '@nestjs/testing';
import { StockController } from './stock.controller';
import { StockService } from './stock.service';

const mockedStockHistory = {
  minDateTime: '2023-11-05T09:55:20.000Z',
  minPrice: 51.29,
  maxDateTime: '2023-11-05T09:55:21.000Z',
  maxPrice: 96.25,
};

describe('StockController', () => {
  let controller: StockController;
  let service: StockService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StockController],
      providers: [
        StockService,
        {
          provide: StockService,
          useValue: {
            getStockHistory: jest.fn().mockImplementation(() => Promise.resolve(mockedStockHistory)),
          },
        },
      ],
    }).compile();

    controller = module.get<StockController>(StockController);
    service = module.get<StockService>(StockService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStockHistory()', () => {
    it('should returns a stock history based on a date range', () => {
      const getStockHistoryDto = {
        from: '2023-11-05T09:54:10.000Z',
        to: '2023-11-05T09:56:10.000Z',
      };

      expect(controller.getStockHistory(getStockHistoryDto)).resolves.toEqual(mockedStockHistory);
    });
  });
});
