import { Injectable } from '@nestjs/common';
import { GetShareHistoryDto } from './dto/get-share-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Share } from './entities/share.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShareService {
  // eslint-disable-next-line prettier/prettier
  constructor(@InjectRepository(Share) private sharesRepository: Repository<Share>) {}

  async getShareHistory(id: number, getShareHistoryDto: GetShareHistoryDto) {
    console.log(await this.sharesRepository.findOneBy({ id: 1 }));
    console.log(getShareHistoryDto);
    return `This action return stock price history based on a date range for #${id}. Params: ${getShareHistoryDto}`;
  }
}
