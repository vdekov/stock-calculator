import { Controller, Post, Body, Param } from '@nestjs/common';
import { ShareService } from './share.service';
import { GetShareHistoryDto } from './dto/get-share-history.dto';

@Controller('')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post(':id/history')
  getShareHistory(
    @Param('id') id: string,
    @Body() getShareHistoryDto: GetShareHistoryDto,
  ) {
    return this.shareService.getShareHistory(+id, getShareHistoryDto);
  }
}