import { Controller, Get, Param, Res } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Response } from 'express';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('transfers')
  async getTransaction(@Res() res: Response) {
    try {
      const transfers = await this.walletService.getTransferTransaction();
      res.json({ message: 'Success', transfers });
    } catch (error) {
      console.log(error);
    }
  }

  @Get('token/metadata/:addressId')
  async getMetaInfo(@Param('addressId') token: string, @Res() res: Response) {
    try {
      const tokenInfo = await this.walletService.getMetadata(token);
      res.json({ message: 'success', tokenInfo });
    } catch (error) {
      console.log('fetching failed', error);
    }
  }

  @Get('token/balance/:addressId')
  async getTokenBalance(
    @Param('addressId') token: string,
    @Res() res: Response,
  ) {
    try {
      const tokenBalance = await this.walletService.getTokenBalance(token);
      res.json({ message: 'Success', tokenBalance });
    } catch (error) {
      console.log('fetching failed', error);
    }
  }

  @Get('nft/:addressId')
  async getNftAddress(@Param('addressId') token: string, @Res() res: Response) {
    try {
      const nftAddress = await this.walletService.getNtfsAddress(token);

      res.json({ message: 'Success', nftAddress });
    } catch (error) {
      console.log('fetching failed', error);
    }
  }
}
