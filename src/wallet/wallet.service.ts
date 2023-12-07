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

  //fetching all transfer-based-transactions
  async getTransferTransaction() {
    try {
      //fetching data through the alchemy SDK
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
      console.error('Error fetching transfer transaction details: ', error);
      // throw error;
    }
  }

  //  Token Endpoints

  //metadata information
  async getMetadata(token: string) {
    try {
      const response = await this.alchemy.core.getTokenMetadata(token); //fetching data through the alchemy SDK

      return response;
    } catch (error) {
      console.error('Error fetching in token metadata info: ', error);
      // throw error;
    }
  }

  //token balances
  async getTokenBalance(token: string) {
    try {
      //ERC20 tokens
      const response = await this.alchemy.core.getTokenBalances(token); //fetching data through the alchemy SDK

      //NATIVE tokens
      // const response = await this.alchemy.core.getBalance(token);

      return response;
    } catch (error) {
      console.error('Error fetching in Token balances: ', error);
      // throw error;
    }
  }

  async getNtfsAddress(token: string) {
    try {
      //setting method and headers
      const options = {
        method: 'GET',
        headers: { accept: 'application/json' },
      };
      //fetching the data through NFT API V3
      const response = await fetch(
        `https://eth-mainnet.g.alchemy.com/nft/v3/${process.env.ALCHEMY_API}/getNFTsForOwner?owner=${token}&withMetadata=true`,
        options,
      )
        .then((res) => res.json()) //Making the response into json
        .catch((error) => console.log(error));

      return response;
    } catch (error) {
      console.error('Error fetching nfts: ', error);
      // throw error;
    }
  }
}
