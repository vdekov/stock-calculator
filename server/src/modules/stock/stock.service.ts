import { BadRequestException, Injectable, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { GetStockHistoryDto } from './dto';
import { Stock } from './entities/stock.entity';
import { findMostProfitableRange } from '../../utils';
import { GetStockHistoryResponse } from './types';

@Injectable()
export class StockService {
  constructor(@InjectRepository(Stock) private stockRepository: Repository<Stock>) {}

  async getStockHistory(getStockHistoryDto: GetStockHistoryDto): Promise<GetStockHistoryResponse> {
    const { from, to } = getStockHistoryDto;

    // Validate input parameters for the following cases:
    // - from must be before to date
    // - from must be before the current date
    // - to must be before the current date
    if (from >= to) {
      throw new BadRequestException('The `from` parameter must be no later than the `to` parameter.');
    }

    const now = new Date().toISOString();
    if (from > now) {
      throw new BadRequestException('The `from` parameter must be no later than now.');
    }

    if (to > now) {
      throw new BadRequestException('The `to` parameter must be no later than now.');
    }

    //1699178050 -> 1699178170
    const dummyDates = { from: '2023-11-05T09:54:10.000Z', to: '2023-11-05T09:56:10.000Z' };

    let sqlResult: Stock[];
    try {
      sqlResult = await this.stockRepository
        .createQueryBuilder('stock')
        .select(['stock.price', 'stock.timestamp'])
        .where('stock.timestamp >= UNIX_TIMESTAMP(:from)', { from: dummyDates.from })
        .andWhere('stock.timestamp <= UNIX_TIMESTAMP(:to)', { to: dummyDates.to })
        .orderBy('stock.timestamp', 'ASC')
        .getMany();
    } catch (e) {
      throw new ServiceUnavailableException('The server is not ready to handle the request. Try again later.');
    }

    // Validation in case there are no results found to the search criteria in the database
    if (!sqlResult.length) {
      throw new NotFoundException('There are no results found matching the search criteria.');
    }

    const profit = findMostProfitableRange(sqlResult);
    // TODO: Validate if profit = null

    return {
      minDateTime: new Date(profit.buyTimestamp * 1000).toISOString(),
      minPrice: profit.buyPrice,
      maxDateTime: new Date(profit.sellTimestamp * 1000).toISOString(),
      maxPrice: profit.sellPrice,
    };
  }
}