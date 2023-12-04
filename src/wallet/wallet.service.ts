import { Injectable } from '@nestjs/common';
import {
  Alchemy,
  AssetTransfersCategory,
  Network,
  SortingOrder,
} from 'alchemy-sdk';

@Injectable()
export class WalletService {
  private readonly alchemy: Alchemy;

  constructor() {
    const configAlchemy = {
      apiKey: process.env.ALCHEMY_API,
      network: Network.ETH_MAINNET,
    };

    this.alchemy = new Alchemy(configAlchemy);
  }
  async getTransferTransaction({ fromAddress, toAddress }) {
    try {
      console.log(fromAddress, toAddress);

      const latestBlock = await this.alchemy.core.getAssetTransfers({
        toAddress: toAddress,
        fromAddress: fromAddress,
        excludeZeroValue: true,
        category: [
          AssetTransfersCategory.ERC721,
          AssetTransfersCategory.ERC1155,
          AssetTransfersCategory.ERC20,
          AssetTransfersCategory.EXTERNAL,
          AssetTransfersCategory.INTERNAL,
          AssetTransfersCategory.SPECIALNFT,
        ],
        order: SortingOrder.DESCENDING,
        withMetadata: true,
      });
      console.log(latestBlock);
      return latestBlock;
    } catch (error) {
      console.error('Error fetching latest block number:', error);
      throw error;
    }
  }
}
