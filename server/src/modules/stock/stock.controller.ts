import { Controller, Post, Body, Param } from '@nestjs/common';
import { StockService } from './stock.service';
import { GetStockHistoryDto } from './dto/get-stock-history.dto';

@Controller('')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post('history')
  getStockHistory(@Body() getStockHistoryDto: GetStockHistoryDto) {
    return this.stockService.getStockHistory(getStockHistoryDto);
  }
}
