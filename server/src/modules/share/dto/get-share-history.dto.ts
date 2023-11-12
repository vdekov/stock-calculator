import { IsDateString } from 'class-validator';

export class GetShareHistoryDto {
  @IsDateString({ strict: true })
  from: string;

  @IsDateString({ strict: true })
  to: string;
}
