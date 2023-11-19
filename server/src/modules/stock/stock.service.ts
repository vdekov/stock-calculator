import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetStockHistoryDto } from './dto';
import { Stock } from './entities/stock.entity';
import { calculateMostProfit } from '../../utils';
import { GetStockHistoryResponse } from './types';
import { ERROR_MESSAGES } from './constants';

@Injectable()
export class StockService {
  constructor(@InjectRepository(Stock) private stockRepository: Repository<Stock>) {}

  async getStockHistory(getStockHistoryDto: GetStockHistoryDto): Promise<GetStockHistoryResponse> {
    const { from, to } = getStockHistoryDto;

    // Validate input parameters for the following cases:
    // - from must be before the current date
    // - to must be before the current date
    // - from must be before to date
    const now = new Date().toISOString();
    if (from > now) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_START_DATE);
    }

    if (to > now) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_END_DATE);
    }

    if (from >= to) {
      throw new BadRequestException(ERROR_MESSAGES.INVALID_DATE_RANGE);
    }

    let sqlResult: Stock[];
    try {
      sqlResult = await this.stockRepository
        .createQueryBuilder('stock')
        .select(['stock.price', 'stock.timestamp'])
        .where('stock.timestamp >= UNIX_TIMESTAMP(:from)', { from })
        .andWhere('stock.timestamp <= UNIX_TIMESTAMP(:to)', { to })
        .orderBy('stock.timestamp', 'ASC')
        .getMany();
    } catch (e) {
      throw new ServiceUnavailableException(ERROR_MESSAGES.SQL_ERROR);
    }

    // Validation in case either there are no results found to the search criteria in the database
    // or the list contains less than two records.
    if (sqlResult.length < 2) {
      throw new NotFoundException(ERROR_MESSAGES.NO_RESULTS_FOUND);
    }

    const profit = calculateMostProfit(sqlResult);

    return {
      minDateTime: new Date(profit.minTimestamp * 1000).toISOString(),
      minPrice: profit.minPrice,
      maxDateTime: new Date(profit.maxTimestamp * 1000).toISOString(),
      maxPrice: profit.maxPrice,
    };
  }
}
