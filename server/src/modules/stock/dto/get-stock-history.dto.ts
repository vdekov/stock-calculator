import { IsDateString } from 'class-validator';

export class GetStockHistoryDto {
  @IsDateString({ strict: true })
  from: string;

  @IsDateString({ strict: true })
  to: string;
}
