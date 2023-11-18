import { Test, TestingModule } from '@nestjs/testing';
import { StockService } from './stock.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Stock } from './entities/stock.entity';
import { Repository } from 'typeorm';

const mockedSQLResult = [
  { price: 70.13, timestamp: 1699178117 },
  { price: 84.65, timestamp: 1699178118 },
  { price: 67.7, timestamp: 1699178119 },
  { price: 51.29, timestamp: 1699178120 },
  { price: 96.25, timestamp: 1699178121 },
  { price: 59.99, timestamp: 1699178122 },
];

describe('StockService', () => {
  let service: StockService;
  let repository: Repository<Stock>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StockService,
        {
          provide: getRepositoryToken(Stock),
          useFactory: () => ({
            createQueryBuilder: () => ({
              select: jest.fn().mockReturnThis(),
              where: jest.fn().mockReturnThis(),
              andWhere: jest.fn().mockReturnThis(),
              orderBy: jest.fn().mockReturnThis(),
              getMany: () => mockedSQLResult,
            }),
          }),
        },
      ],
    }).compile();

    service = module.get<StockService>(StockService);
    repository = module.get<Repository<Stock>>(getRepositoryToken(Stock));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getStockHistory()', () => {
    it('should successfully provide a history based on a date range', () => {
      const mockedStockHistory = {
        minDateTime: '2023-11-05T09:55:20.000Z',
        minPrice: 51.29,
        maxDateTime: '2023-11-05T09:55:21.000Z',
        maxPrice: 96.25,
      };

      expect(
        service.getStockHistory({
          from: '2023-11-05T09:54:10.000Z',
          to: '2023-11-05T09:56:10.000Z',
        }),
      ).resolves.toEqual(mockedStockHistory);
    });
  });
});
