import { Injectable } from '@nestjs/common';
import { GetShareHistoryDto } from './dto/get-share-history.dto';

@Injectable()
export class ShareService {
  getShareHistory(id: number, getShareHistoryDto: GetShareHistoryDto) {
    return `This action return share history based on a date range for #${id}. Params: ${getShareHistoryDto}`;
  }
}
