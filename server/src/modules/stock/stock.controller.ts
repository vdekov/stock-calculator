import { Controller, Post, Body, Param } from '@nestjs/common';
import { StockService } from './stock.service';
import { GetStockHistoryDto } from './dto';
import { GetStockHistoryResponse } from './types';

@Controller('')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('history')
  getStockHistory(@Body() getStockHistoryDto: GetStockHistoryDto): Promise<GetStockHistoryResponse> {
    return this.stockService.getStockHistory(getStockHistoryDto);
  }
}
