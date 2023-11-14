import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetShareHistoryDto } from './dto/get-share-history.dto';
import { Share } from './entities/share.entity';

@Injectable()
export class ShareService {
  constructor(@InjectRepository(Share) private sharesRepository: Repository<Share>) {}

  async getShareHistory(id: number, getShareHistoryDto: GetShareHistoryDto) {
    const { from, to } = getShareHistoryDto;

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

    console.log(await this.sharesRepository.findOneBy({ id: 1 }));
    console.log(getShareHistoryDto);
    return `This action return stock price history based on a date range for #${id}. Params: ${getShareHistoryDto}`;
  }
}
