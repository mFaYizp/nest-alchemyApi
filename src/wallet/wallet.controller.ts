import { Controller, Get, Query } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('transfers/address')
  getTransaction(
    @Query('from') fromAddress: string,
    @Query('to') toAddress: string,
  ) {
    this.walletService.getTransferTransaction({ fromAddress, toAddress });
  }
}
