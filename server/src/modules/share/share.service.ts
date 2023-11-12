import { Injectable } from '@nestjs/common';
import { GetShareHistoryDto } from './dto/get-share-history.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Share } from './entities/share.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ShareService {
  constructor(
    @InjectRepository(Share) private sharesRepository: Repository<Share>,
  ) {}

  async getShareHistory(id: number, getShareHistoryDto: GetShareHistoryDto) {
    console.log(await this.sharesRepository.findOneBy({ id: 1 }));
    return `This action return share history based on a date range for #${id}. Params: ${getShareHistoryDto}`;
  }
}
