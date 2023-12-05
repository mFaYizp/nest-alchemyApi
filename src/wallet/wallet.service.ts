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
  async getTransferTransaction() {
    try {
      const response = await this.alchemy.core.getAssetTransfers({
        fromBlock: 'latest',
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
        maxCount: 15,
      });

      return response;
    } catch (error) {
      console.error('Error fetching latest block number:', error);
      throw error;
    }
  }
}
