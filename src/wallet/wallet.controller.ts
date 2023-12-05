import { Controller, Get, Res } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Response } from 'express';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('transfers/address')
  async getTransaction(@Res() res: Response) {
    try {
      const transfers = await this.walletService.getTransferTransaction();
      res.json({ message: 'Success', transfers });
    } catch (error) {
      console.log(error);
    }
  }
}
