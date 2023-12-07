import { Controller, Get, Param, Res, UseGuards } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { Response } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get('transfers')
  @UseGuards(AuthGuard()) //Securing the endpoint with jwt token (authorization)
  async getTransaction(@Res() res: Response) {
    try {
      const transfers = await this.walletService.getTransferTransaction();

      res.json({ message: 'Success', transfers });
    } catch (error) {
      console.log(error);
    }
  }

  //address pass as params
  @Get('token/metadata/:address')
  @UseGuards(AuthGuard()) //Securing the endpoint with jwt token (authorization)
  async getMetaInfo(@Param('address') token: string, @Res() res: Response) {
    try {
      const tokenInfo = await this.walletService.getMetadata(token);
      res.json({ message: 'success', tokenInfo });
    } catch (error) {
      console.log('fetching failed', error);
    }
  }

  //address pass as params
  @Get('token/balance/:address')
  @UseGuards(AuthGuard()) //Securing the endpoint with jwt token (authorization)
  async getTokenBalance(@Param('address') token: string, @Res() res: Response) {
    try {
      const tokenBalance = await this.walletService.getTokenBalance(token);
      res.json({ message: 'Success', tokenBalance });
    } catch (error) {
      console.log('fetching failed', error);
    }
  }

  //address pass as params
  @Get('nft/:address')
  @UseGuards(AuthGuard()) //Securing the endpoint with jwt token (authorization)
  async getNftAddress(@Param('address') token: string, @Res() res: Response) {
    try {
      const nftAddress = await this.walletService.getNtfsAddress(token);

      res.json({ message: 'Success', nftAddress });
    } catch (error) {
      console.log('fetching failed', error);
    }
  }
}
